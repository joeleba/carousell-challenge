import reducer from '../contentReducers';
import { addPost, addComment, upvote, downvote, POST_TYPE, COMMENT_TYPE } from '../../actions';
import expect from 'expect';

const initialState = {
  currentPostId: 1,
  currentCommentId: 1,
  posts: {
    0: {
      children: [0],
      content: 'text0',
      downvoteCount: 0,
      upvoteCount: 0,
      title: 'title0',
      id: 0
    },
  },
  comments: {
    0: {
      children: [],
      content: 'text',
      downvoteCount: 0,
      upvoteCount: 0,
      id: 0
    }
  },
};

describe('Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it('should handle addPost', () => {
    const addPostAction = addPost('title1', 'text1');
    const expectedState = {
      currentPostId: 2,
      currentCommentId: 1,
      posts: {
        0: {
          children: [0],
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
      comments: {
        0: {
          children: [],
          content: 'text',
          downvoteCount: 0,
          upvoteCount: 0,
          id: 0
        }
      },
    };

    expect(reducer(initialState, addPostAction)).toEqual(expectedState);
  });

  it('should handle addComment to post', () => {
    const addCommentAction = addComment(0, POST_TYPE, 'text1');
    const expectedState = {
      currentPostId: 1,
      currentCommentId: 2,
      posts: {
        0: {
          children: [0, 1],
          content: 'text0',
          downvoteCount: 0,
          upvoteCount: 0,
          title: 'title0',
          id: 0
        },
      },
      comments: {
        0: {
          children: [],
          content: 'text',
          downvoteCount: 0,
          upvoteCount: 0,
          id: 0
        },
        1: {
          children: [],
          content: 'text1',
          downvoteCount: 0,
          upvoteCount: 0,
          id: 1
        },
      },
    };

    expect(reducer(initialState, addCommentAction)).toEqual(expectedState);
  });

  it('should handle addComment to comment', () => {
    const addCommentAction = addComment(0, COMMENT_TYPE, 'text1');
    const expectedState = {
      currentPostId: 1,
      currentCommentId: 2,
      posts: {
        0: {
          children: [0],
          content: 'text0',
          downvoteCount: 0,
          upvoteCount: 0,
          title: 'title0',
          id: 0
        },
      },
      comments: {
        0: {
          children: [1],
          content: 'text',
          downvoteCount: 0,
          upvoteCount: 0,
          id: 0
        },
        1: {
          children: [],
          content: 'text1',
          downvoteCount: 0,
          upvoteCount: 0,
          id: 1
        },
      },
    };

    expect(reducer(initialState, addCommentAction)).toEqual(expectedState);
  });

  it('should handle upvote post', () => {
    const upvoteAction = upvote(0, POST_TYPE);
    const expectedState = {
      currentPostId: 1,
      currentCommentId: 1,
      posts: {
        0: {
          children: [0],
          content: 'text0',
          downvoteCount: 0,
          upvoteCount: 1,
          title: 'title0',
          id: 0
        },
      },
      comments: {
        0: {
          children: [],
          content: 'text',
          downvoteCount: 0,
          upvoteCount: 0,
          id: 0
        },
      },
    };
    expect(reducer(initialState, upvoteAction)).toEqual(expectedState);
  });

  it('should handle upvote comment', () => {
    const upvoteAction = upvote(0, COMMENT_TYPE);
    const expectedState = {
      currentPostId: 1,
      currentCommentId: 1,
      posts: {
        0: {
          children: [0],
          content: 'text0',
          downvoteCount: 0,
          upvoteCount: 0,
          title: 'title0',
          id: 0
        },
      },
      comments: {
        0: {
          children: [],
          content: 'text',
          downvoteCount: 0,
          upvoteCount: 1,
          id: 0
        },
      },
    };
    expect(reducer(initialState, upvoteAction)).toEqual(expectedState);
  });

  it('should handle downvote post', () => {
    const downvoteAction = downvote(0, POST_TYPE);
    const expectedState = {
      currentPostId: 1,
      currentCommentId: 1,
      posts: {
        0: {
          children: [0],
          content: 'text0',
          downvoteCount: 1,
          upvoteCount: 0,
          title: 'title0',
          id: 0
        },
      },
      comments: {
        0: {
          children: [],
          content: 'text',
          downvoteCount: 0,
          upvoteCount: 0,
          id: 0
        },
      },
    };
    expect(reducer(initialState, downvoteAction)).toEqual(expectedState);
  });

  it('should handle downvote comment', () => {
    const downvoteAction = downvote(0, COMMENT_TYPE);
    const expectedState = {
      currentPostId: 1,
      currentCommentId: 1,
      posts: {
        0: {
          children: [0],
          content: 'text0',
          downvoteCount: 0,
          upvoteCount: 0,
          title: 'title0',
          id: 0
        },
      },
      comments: {
        0: {
          children: [],
          content: 'text',
          downvoteCount: 1,
          upvoteCount: 0,
          id: 0
        },
      },
    };
    expect(reducer(initialState, downvoteAction)).toEqual(expectedState);
  });
});
