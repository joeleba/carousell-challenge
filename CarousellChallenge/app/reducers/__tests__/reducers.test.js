import reducer from '../contentReducers';
import { addPost, addComment, upvote, downvote } from '../../actions';
import expect from 'expect';

const initialState = {
  currentId: 1,
  posts: {
    0: {
      children: [],
      content: 'text0',
      downvoteCount: 0,
      upvoteCount: 0,
      title: 'title0',
      id: 0
    },
  },
  comments: {},
};

describe('Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it('should handle addPost', () => {
    const addPostAction = addPost('title1', 'text1');
    const expectedState = {
      currentId: 2,
      posts: {
        0: {
          children: [],
          content: 'text0',
          downvoteCount: 0,
          upvoteCount: 0,
          title: 'title0',
          id: 0
        },
        1: {
          children: [],
          content: 'text1',
          downvoteCount: 0,
          upvoteCount: 0,
          title: 'title1',
          id: 1
        },
      },
      comments: {},
    };

    expect(reducer(initialState, addPostAction)).toEqual(expectedState);
  });

  it('should handle addComment', () => {
    const addCommentAction = addComment(0, 'text');
    const expectedState = {
      currentId: 2,
      posts: {
        0: {
          children: [1],
          content: 'text0',
          downvoteCount: 0,
          upvoteCount: 0,
          title: 'title0',
          id: 0
        },
      },
      comments: {
        1: {
          children: [],
          content: 'text',
          downvoteCount: 0,
          upvoteCount: 0,
          id: 1
        },
      },
    };

    expect(reducer(initialState, addCommentAction)).toEqual(expectedState);
  });

  it('should handle upvote', () => {
    const upvoteAction = upvote(0);
    const expectedState = {
      currentId: 1,
      posts: {
        0: {
          children: [],
          content: 'text0',
          downvoteCount: 0,
          upvoteCount: 1,
          title: 'title0',
          id: 0
        },
      },
      comments: {},
    };
    expect(reducer(initialState, upvoteAction)).toEqual(expectedState);
  });

  it('should handle downvote', () => {
    const downvoteAction = downvote(0);
    const expectedState = {
      currentId: 1,
      posts: {
        0: {
          children: [],
          content: 'text0',
          downvoteCount: 1,
          upvoteCount: 0,
          title: 'title0',
          id: 0
        },
      },
      comments: {},
    };
    expect(reducer(initialState, downvoteAction)).toEqual(expectedState);
  });
});
