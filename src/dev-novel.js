/* @flow */

import get from 'lodash/get';
import isString from 'lodash/isString';

import React from 'react';
import { render } from 'react-dom';
import { action, observable } from 'mobx';

import type { ObservableArray } from 'mobx';

import DevNovelUI, { baseStyles } from './ui/index';
import { updateURL, loadFromURL } from './url-helper';

const escapeName = name => name.replace(/\./g, '-');

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

      // remove `.` from keys or `_.get` wont work as expected
      const safeParentName = escapeName(parentName);
      const safeStoryName = escapeName(storyName);

      Object.assign(this.stories, {
        [safeParentName]: { ...(this.stories[safeParentName] || {}), [safeStoryName]: fn },
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
    updateURL(this.selectedStory);
  }

  @action
  initSelectedStory() {
    const selectedStoryFromURL = loadFromURL();
    if (selectedStoryFromURL && get(this.stories, selectedStoryFromURL)) {
      this.selectedStory = selectedStoryFromURL;
    } else {
      const firstParent = Object.keys(this.stories)[0];
      this.selectedStory = `${firstParent}.${Object.keys(this.stories[firstParent])[0]}`;
    }
  }

  @action
  selectParent(parentName: string) {
    // update selected story
    const safeParentName = escapeName(parentName);
    const [firstStoryOfParent] = Object.keys(this.stories[safeParentName]);
    this.selectedStory = `${safeParentName}.${firstStoryOfParent}`;
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
