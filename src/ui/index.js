/* @flow */

import React, { Component } from 'react';
import styled from 'styled-components';

import Sidebar from './sidebar';

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
`;

const StoryContainer = styled.div`
  background-color: #fff;
  border: solid 1px #E4E4E4;
  border-radius: 5px;
  height: calc(65vh - 20px); /* -20px of inner padding */
  overflow-x: scroll;
`;

class DevNovelUI extends Component {
  render() {
    const { anyStorybook } = this.props;

    return (
      <UIWrapper>
        <Sidebar anyStorybook={anyStorybook} />
        <BodyWrapper>
          <Body>
            <StoryContainer id="story-container" />
          </Body>
        </BodyWrapper>
      </UIWrapper>
    );
  }
}

export default DevNovelUI;
