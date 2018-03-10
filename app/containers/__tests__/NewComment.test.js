import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import NewComment from '../NewComment';
import { addComment } from '../../actions';

const mockStore = configureStore();

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
      replyingToObject: {
        content: 'abc',
        id: 0
      },
      postId: 0
    }
  }
};

describe('Component: NewComment', () => {
  it('renders with nested comments', () => {
    const store = mockStore(stateNoComment);
    const wrapper = shallow(
      <NewComment navigation={navigationProp} />,
      { context: { store: store } },
    );
    const render = wrapper.dive();
    expect(render).toMatchSnapshot();
  });

  it('dispatches correct actions on submit', () => {
    const store = mockStore(stateNoComment);
    const wrapper = shallow(
      <NewComment navigation={navigationProp} />,
      { context: { store: store } },
    );
    const render = wrapper.dive();
    render.find('Button').first().simulate('press');

    const actions = store.getActions();
    const expectedPayload = [
      { type: 'ADD_COMMENT', parentId: 0, text: '' },
      { type: 'Navigation/BACK', key: undefined, immediate: undefined }
    ];

    expect(actions).toEqual(expectedPayload);
  });

  it('dispatches correct actions on back', () => {
    const store = mockStore(stateNoComment);
    const wrapper = shallow(
      <NewComment navigation={navigationProp} />,
      { context: { store: store } },
    );
    const render = wrapper.dive();
    render.find('[name="close"]').first().simulate('press');

    const actions = store.getActions();
    const expectedPayload = [{"immediate": undefined, "key": undefined, "type": "Navigation/BACK"}];

    expect(actions).toEqual(expectedPayload);
  });
});
