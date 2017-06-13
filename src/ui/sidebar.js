/* @flow */

import map from 'lodash/map';
import reduce from 'lodash/reduce';

import React, { Component } from 'react';
import styled from 'styled-components';

import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

const SidebarContainer = styled.div`
  flex: 0 0 auto;
  padding: 10px;
  width: 250px;
`;

const FilterContainer = styled.div`
  border-bottom: 1px solid rgb(238, 238, 238);
  margin-bottom: 10px;
  padding-bottom: 10px;
`;

const FilterInput = styled.input`
  color: rgb(130, 130, 130);
  font-size: .85em;
  padding: 5px;
  width: 100%;
`;

const StoriesList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ParentContainer = styled.li`
  border-bottom: 1px solid rgb(238, 238, 238);
`;

const SelectParent = styled.span`
  cursor: pointer;
  display: block;
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
  padding: ${props => (props.selected ? '7px 0 0 0' : '7px 0px')};
`;

const StoryContainer = SelectParent.extend`
  border-bottom: none;
  font-size: .85em;
  padding: 7px 0px 0px 7px;

  &:last-child {
    padding-bottom: 7px;
  }
`;

@observer
class Sidebar extends Component {
  props: {
    anyStorybook: {
      selectedStory: string,
      selectParent: Function,
      selectStory: Function,
      stories: { [string]: { [string]: Function } },
    },
  };

  @observable filterValue: string = '';

  @computed
  get stories(): { [string]: { [string]: Function } } {
    const { anyStorybook: { stories } } = this.props;
    const filterValue = this.filterValue.toLowerCase();

    if (filterValue && filterValue.trim() && filterValue.trim().length >= 3) {
      return reduce(
        stories,
        (result, parentStories, parentName) => {
          const isParentNameMatch = parentName.toLowerCase().includes(filterValue);
          const isChildrenStoryMatch = Object.keys(parentStories).some(storyName =>
            storyName.toLowerCase().includes(filterValue)
          );
          return isParentNameMatch || isChildrenStoryMatch
            ? { ...result, [parentName]: parentStories }
            : result;
        },
        {}
      );
    }

    return stories;
  }

  renderFilter() {
    return (
      <FilterInput
        type="text"
        placeholder="Filter"
        value={this.filterValue}
        onChange={({ target: { value } }) => {
          this.filterValue = value;
        }}
      />
    );
  }

  renderStories() {
    const { anyStorybook } = this.props;

    return map(this.stories, (parentStories, parentName) => {
      const isSelected = anyStorybook.selectedStory.split('.')[0] === parentName;
      return (
        <ParentContainer key={parentName}>
          <SelectParent selected={isSelected} onClick={() => anyStorybook.selectParent(parentName)}>
            {parentName}
          </SelectParent>

          {anyStorybook.openAllStories || isSelected
            ? map(parentStories, (storyFn, storyName) =>
                <StoryContainer
                  key={`${parentName}.${storyName}`}
                  selected={anyStorybook.selectedStory === `${parentName}.${storyName}`}
                  onClick={() => anyStorybook.selectStory(`${parentName}.${storyName}`)}
                >
                  {storyName}
                </StoryContainer>
              )
            : null}
        </ParentContainer>
      );
    });
  }

  render() {
    return (
      <SidebarContainer>
        <FilterContainer>
          {this.renderFilter()}
        </FilterContainer>

        <StoriesList>
          {this.renderStories()}
        </StoriesList>
      </SidebarContainer>
    );
  }
}

export default Sidebar;
