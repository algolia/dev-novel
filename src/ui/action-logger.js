/* @flow */

import React from 'react';
import styled from 'styled-components';
import { Inspector } from 'react-inspector';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

const Container = styled.div`
  background-color: #fff;
  border: solid 1px #E4E4E4;
  border-radius: 5px;
  margin: 0 10px 10px 0;
  overflow: hidden;
  width: 100%;
`;

const Title = styled.div`
  border-bottom: 1px solid rgb(234, 234, 234);
  display: flex;
  flex-wrap: wrap;
  text-transform: uppercase;
  padding: 5px 10px;
`;

const LogsContainer = styled.pre`
  height: calc(100% - 35px); /* -title height */
  overflow-x: scroll;
`;

const Log = styled.div`
  align-items: center;
  border-bottom: 1px solid rgb(250, 250, 250);
  display: flex;
  padding: 5px 10px;
`;

const ActionLogger = ({ devNovelInstance }: { devNovelInstance: Object }) =>
  <Container>
    <Title>Action logger</Title>
    <LogsContainer>
      {devNovelInstance.actionLogs.peek().reverse().map(({ name, data }, idx) =>
        <Log key={idx}>
          <Inspector name={name} data={toJS(data)} />
        </Log>
      )}
    </LogsContainer>
  </Container>;

export default observer(ActionLogger);
