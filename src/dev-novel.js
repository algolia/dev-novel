/* @flow */

import get from 'lodash/get';
import isString from 'lodash/isString';

import React from 'react';
import { render } from 'react-dom';
import { action, observable } from 'mobx';

import type { ObservableArray } from 'mobx';

import DevNovelUI, { baseStyles } from './ui/index';

class DevNovel {
  // dev-novel.js options
  @observable openAllStories: boolean = false;

  @observable
  project: { name: string, link: string } = {
    name: 'dev novel',
    link: '/',
  };

  // inner state
  initializers: Array<Function> = [];
  disposers: Array<Function> = [];
  stories: { [string]: { [string]: Function } } = {};
  isFirstRun = true;

  @observable selectedStory: ?string = undefined;
  @observable actionLogs: ObservableArray<any> = [];

  get storyContainer(): HTMLDivElement {
    return window.document.getElementById('story-container');
  }

  applyOpts(opts: Object) {
    const { openAllStories = false, projectName = 'devnovel', projectLink = '/' } = opts;
    this.openAllStories = openAllStories;
    this.project.name = projectName;
    this.project.link = projectLink;
  }

  add(parentName: string) {
    return (storyName: string, fn: Function) => {
      if (typeof get(this.stories, `${parentName}.${storyName}`) === 'function') {
        throw new Error(`story: ${storyName} is already defined`);
      }

      if (!isString(storyName) && typeof fn !== 'function') {
        throw new Error('usage: `add(storyName: string, fn: Function)`');
      }

      Object.assign(this.stories, {
        [parentName]: { ...(this.stories[parentName] || {}), [storyName]: fn },
      });

      return this._bindedInstance({ parentName });
    };
  }

  // * empty story container
  // * clear old action logs
  // * load story render fn
  loadSelectedStory() {
    if (this.isFirstRun) {
      this.isFirstRun = false;
    } else {
      this.disposers.forEach(disposer => disposer());
      this.actionLogs.clear();
      this.emptyStoryContainer();
    }

    this.initializers.forEach(initializer => initializer());

    const fn = get(this.stories, this.selectedStory);
    fn(this.storyContainer);
  }

  @action
  selectParent(parentName: string) {
    // update selected story
    const [firstStoryOfParent] = Object.keys(this.stories[parentName]);
    this.selectedStory = `${parentName}.${firstStoryOfParent}`;
    this.loadSelectedStory();
  }

  @action
  selectStory(selectedStory: string) {
    this.selectedStory = selectedStory;
    this.loadSelectedStory();
  }

  emptyStoryContainer() {
    this.storyContainer.innerHTML = '';
  }

  injectUI() {
    baseStyles();

    const container = window.document.createElement('div');
    window.document.body.appendChild(container);
    render(React.createElement(DevNovelUI, { devNovelInstance: this }), container);
  }

  _bindedInstance(opts: { parentName: string }) {
    return {
      add: this.add(opts.parentName),
    };
  }
}

export default DevNovel;
