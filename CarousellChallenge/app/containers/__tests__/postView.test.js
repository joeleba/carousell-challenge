import React from 'react';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import PostView from '../PostView';

const mockStore = configureStore();

const stateNestedComments = {
  contentReducers: {
    currentId: 6,
    posts: {
      0: {
        children: [1, 2],
        content: "ccc",
        downvoteCount: 0,
        upvoteCount: 0,
        title: "sad",
        id: 0
      }
    },
    comments: {
      1: {
        children: [3, 4, 5],
        content: "ccc1",
        downvoteCount: 0,
        upvoteCount: 0,
        id: 1
      },
      2: {
        children: [],
        content: "ccc2",
        downvoteCount: 0,
        upvoteCount: 0,
        id: 2
      },
      3: {
        children: [],
        content: "ccc3",
        downvoteCount: 0,
        upvoteCount: 0,
        id: 3
      },
      4: {
        children: [],
        content: "ccc4",
        downvoteCount: 0,
        upvoteCount: 0,
        id: 4
      },
      5: {
        children: [],
        content: "ccc5",
        downvoteCount: 0,
        upvoteCount: 0,
        id: 5
      },
    },
  },
};

const stateNoComment = {
  contentReducers: {
    currentId: 1,
    posts: {
      0: {
        children: [],
        content: "ccc",
        downvoteCount: 0,
        upvoteCount: 0,
        title: "sad",
        id: 0
      }
    },
    comments: {},
  },
};

const navigationProp = {
  state: {
    params: {
      postId: 0
    }
  }
};

describe('Component: PostView', () => {
  it('renders with nested comments', () => {
    const wrapper = shallow(
      <PostView navigation={navigationProp}/>,
      { context: { store: mockStore(stateNestedComments) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
    expect(wrapper.prop('posts')).toEqual(stateNestedComments['contentReducers']['posts']);
    expect(wrapper.prop('comments')).toEqual(stateNestedComments['contentReducers']['comments']);
    expect(wrapper.dive().find(FlatList)).toHaveLength(1);
  });

  it('renders with no comment', () => {
    const wrapper = shallow(
      <PostView navigation={navigationProp}/>,
      { context: { store: mockStore(stateNoComment) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
    expect(wrapper.prop('posts')).toEqual(stateNoComment['contentReducers']['posts']);
    expect(wrapper.prop('comments')).toEqual(stateNoComment['contentReducers']['comments']);
    expect(wrapper.dive().find(FlatList)).toHaveLength(0);
  });
});
