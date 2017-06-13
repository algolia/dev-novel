/* @flow */

import React from 'react';
import styled from 'styled-components';

import Sidebar from './sidebar';
import ActionLogger from './action-logger';

const UIWrapper = styled.div`
  background-color: rgb(247, 247, 247);
  display: flex;
  height: 100vh;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex: 1 1 0%;
  padding: 10px;
  height: 100vh;
`;

const Body = styled.div`
  height: 100%;
  width: 100%;
`;

const StoryContainer = styled.div`
  background-color: #fff;
  border: solid 1px #E4E4E4;
  border-radius: 5px;
  height: calc(65vh - 20px); /* -20px of inner padding */
  width: 100%;
  overflow: scroll;
`;

const ActionLoggerContainer = StoryContainer.extend`
  margin-top: 10px;
  height: calc(35vh - 10px); /* -10px of bottom padding */
  overflow: hidden;
  width: 100%;
`;

const DevNovelUI = ({ devNovelInstance }: { devNovelInstance: Object }) =>
  <UIWrapper>
    <Sidebar devNovelInstance={devNovelInstance} />
    <BodyWrapper>
      <Body>
        <StoryContainer id="story-container" />
        <ActionLoggerContainer>
          <ActionLogger devNovelInstance={devNovelInstance} />
        </ActionLoggerContainer>
      </Body>
    </BodyWrapper>
  </UIWrapper>;

export default DevNovelUI;
