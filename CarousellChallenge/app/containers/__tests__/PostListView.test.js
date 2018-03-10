import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import PostListView from '../PostListView';

const mockStore = configureStore();

const stateOnePost = {
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
    comments: {}
  }
};

const stateNoPost = {
  contentReducers: {
    currentId: 0,
    posts: {},
    comments: {}
  }
};

describe('Component: PostListView', () => {
  it('renders with correct postsObject prop', () => {
    const wrapper = shallow(
      <PostListView />,
      { context: { store: mockStore(stateOnePost) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
    expect(wrapper.prop('postsObject')).toEqual({
      0: {
        children: [],
        content: "ccc",
        downvoteCount: 0,
        upvoteCount: 0,
        title: "sad",
        id: 0
      }
    });
  });

  it('renders when there\'s no post', () => {
    const wrapper = shallow(
      <PostListView />,
      { context: { store: mockStore(stateNoPost) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
