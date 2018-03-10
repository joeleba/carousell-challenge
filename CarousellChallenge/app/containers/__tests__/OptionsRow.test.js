import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import OptionsRow from '../OptionsRow';
import { upvote, downvote } from '../../actions';

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

const currentComment = {
  children: [],
  content: "ccc",
  downvoteCount: 0,
  upvoteCount: 0,
  title: "sad",
  id: 0
}

describe('Component: OptionsRow', () => {
  it('renders correctly', () => {
    const store = mockStore(stateNoComment);
    const wrapper = shallow(
      <OptionsRow currentComment={currentComment} postId={0} />,
      { context: { store: store } },
    );

    const render = wrapper.dive();
    expect(render).toMatchSnapshot();
  });

  it('dispatches correct actions on upvote/downvote', () => {
    const store = mockStore(stateNoComment);
    const wrapper = shallow(
      <OptionsRow currentComment={currentComment} postId={0} />,
      { context: { store: store } },
    );
    const render = wrapper.dive();

    render.find('[name="arrow-up"]').first().simulate('press');
    render.find('[name="arrow-down"]').first().simulate('press');

    const actions = store.getActions();
    const expectedPayload = [{"id": 0, "type": "UPVOTE"}, {"id": 0, "type": "DOWNVOTE"}];
    expect(actions).toEqual(expectedPayload);
  });
});
