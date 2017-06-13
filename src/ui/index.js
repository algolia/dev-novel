/* @flow */

import React, { Component } from 'react';
import styled from 'styled-components';

import Sidebar from './sidebar';

const Container = styled.div`
  background-color: rgb(247, 247, 247);
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  background-color: #FFF;
  flex: 1 1 0%;
  padding: 10px;
  position: relative;
`;

class DevNovelUI extends Component {
  render() {
    const { anyStorybook } = this.props;

    return (
      <Container>
        <Sidebar anyStorybook={anyStorybook} />
        <Content id="story-container" />
      </Container>
    );
  }
}

export default DevNovelUI;
