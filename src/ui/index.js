/* @flow */

import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import styledNormalized from 'styled-normalize';
import SplitPane from 'react-split-pane';

import Sidebar from './sidebar';
import ActionLogger from './action-logger';

// global css to load on devNovel.injectUI()
export const baseStyles = () => injectGlobal`
  body {
    color: rgb(68, 68, 68);
    font-family: -apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  .Resizer {
    background: transparent;

    &:after {
      background: transparent;
      content: ' ';
      display: block;
      position: absolute;
    }

    &.horizontal {
      cursor: row-resize;
      padding-top: 3px;
      height: 10px;

      &:after {
        border-top: 1px solid rgba(0, 0, 0, .2);
        border-bottom: 1px solid rgba(0, 0, 0, .2);
        left: calc(50% - 20px);
        height: 2px;
        width: 20px;
      }
    }

    &.vertical {
      cursor: col-resize;
      padding-left: 3px;
      width: 10px;

      &:after {
        border-left: 1px solid rgba(0, 0, 0, .2);
        border-right: 1px solid rgba(0, 0, 0, .2);
        top: calc(50% - 20px);
        height: 20px;
        width: 2px;
      }
    }

    &.disabled {
      cursor: not-allowed;

      &:hover {
        border-color: transparent;
      }
    }
  }

  ${styledNormalized}
`;

const UIWrapper = styled.div`
  background-color: rgb(247, 247, 247);
  display: flex;
  height: 100vh;
`;

const StoryContainer = styled.div`
  background-color: #fff;
  border: solid 1px #E4E4E4;
  border-radius: 5px;
  margin: 10px 10px 0 0;
  height: calc(100% - 10px);
  overflow: scroll;
`;

const paneStyle = {
  overflow: 'scroll',
};

const DevNovelUI = ({ devNovelInstance }: { devNovelInstance: Object }) =>
  <UIWrapper>
    <SplitPane split="vertical" minSize={250}>
      <Sidebar devNovelInstance={devNovelInstance} />
      <SplitPane split="horizontal" defaultSize={200} primary="second" paneStyle={paneStyle}>
        <StoryContainer id="story-container" />
        <ActionLogger devNovelInstance={devNovelInstance} />
      </SplitPane>
    </SplitPane>
  </UIWrapper>;

export default DevNovelUI;
