import React from 'react';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import NewPost from '../NewPost';
import { addComment } from '../../actions';

const mockStore = configureStore();

const stateNoPostNoComment = {
  contentReducers: {
    currentPostId: 0,
    posts: {},
    comments: {},
  },
};

const navigationProp = {
  state: {
    params: {
      replyingToObject: {
        content: 'abc',
        id: 0
      },
      postId: 0
    }
  }
};

describe('Component: NewPost', () => {
  it('renders with nested comments', () => {
    const store = mockStore(stateNoPostNoComment);
    const wrapper = shallow(
      <NewPost />,
      { context: { store: store } },
    );
    const render = wrapper.dive();
    expect(render).toMatchSnapshot();
    expect(wrapper.prop('currentPostId')).toEqual(0);
  });

  it('dispatches correct actions on submit', () => {
    const store = mockStore(stateNoPostNoComment);
    const wrapper = shallow(
      <NewPost />,
      { context: { store: store } },
    );
    const render = wrapper.dive();
    render.find('Button').first().simulate('press');

    const actions = store.getActions();
    const expectedPayload = [
      { type: 'ADD_POST', title: '', text: '' },
      {"params": {"postId": 0}, "routeName": "PostView", "type": "Navigation/NAVIGATE"}
    ];

    expect(actions).toEqual(expectedPayload);
  });

  it('dispatches correct actions on back', () => {
    const store = mockStore(stateNoPostNoComment);
    const wrapper = shallow(
      <NewPost />,
      { context: { store: store } },
    );
    const render = wrapper.dive();
    render.find('[name="close"]').first().simulate('press');

    const actions = store.getActions();
    const expectedPayload = [
      {
        "actions": [
          {
            "routeName": "PostListView",
            "type": "Navigation/NAVIGATE"
          }
        ],
        "index": 0,
        "key": undefined,
        "type": "Navigation/RESET"
      }
    ];

    expect(actions).toEqual(expectedPayload);
  });
});
