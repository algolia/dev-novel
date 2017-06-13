/* @flow */

import { action } from 'mobx';

import DevNovel from './dev-novel';

const devNovel = new DevNovel();

type StartOptions = {
  openAllStories?: boolean,
};

export function storiesOf(parentName: string) {
  return devNovel._bindedInstance({ parentName });
}

export function registerDisposer(disposer: Function) {
  devNovel.disposers.push(disposer);
}

export function registerInitializer(initializer: Function) {
  devNovel.initializers.push(initializer);
}

export const start = action((opts: StartOptions = {}) => {
  devNovel.applyOpts(opts);

  // select first story in the list
  devNovel.selectedStory = (() => {
    const firstParent = Object.keys(devNovel.stories)[0];
    return `${firstParent}.${Object.keys(devNovel.stories[firstParent])[0]}`;
  })();

  // append UI to the page
  devNovel.injectUI();

  // load selectedStory
  devNovel.loadSelectedStory();
});
