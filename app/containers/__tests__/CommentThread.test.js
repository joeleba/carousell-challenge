import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import CommentThreadWrapper from '../CommentThread';

const mockStore = configureStore();

const stateNestedComments = {
  contentReducers: {
    currentPostId: 1,
    currentCommentId: 5,
    posts: {
      0: {
        children: [0, 1],
        content: "ccc",
        downvoteCount: 0,
        upvoteCount: 0,
        title: "sad",
        id: 0
      }
    },
    comments: {
      0: {
        children: [],
        content: "ccc0",
        downvoteCount: 0,
        upvoteCount: 0,
        id: 0
      },
      1: {
        children: [2, 3, 4],
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
      }
    },
  },
};

const commentWithChildren = stateNestedComments.contentReducers.comments[1];
const commentWithoutChildren = stateNestedComments.contentReducers.comments[2];

describe('Component: CommentThread', () => {
  it('renders with nested comments', () => {
    const wrapper = shallow(
      <CommentThreadWrapper comment={commentWithChildren} postId={0}/>,
      { context: { store: mockStore(stateNestedComments) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
    expect(wrapper.prop('comments')).toEqual(stateNestedComments['contentReducers']['comments']);
    expect(wrapper.dive().find('FlatList')).toHaveLength(1);
  });

  it('renders with nested comments', () => {
    const wrapper = shallow(
      <CommentThreadWrapper comment={commentWithoutChildren} postId={0}/>,
      { context: { store: mockStore(stateNestedComments) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
    expect(wrapper.prop('comments')).toEqual(stateNestedComments['contentReducers']['comments']);
    expect(wrapper.dive().find('FlatList')).toHaveLength(0);
  });
});
