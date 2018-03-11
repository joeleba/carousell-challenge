import _ from 'lodash';
import { ADD_POST, ADD_COMMENT, UPVOTE, DOWNVOTE, POST_TYPE } from '../actions';
import { seeds } from './seeds';

const initialState = seeds;

function changeVotePost(state, isUpvote, id) {
  return _.assign({}, state, {
    ...state,
    posts: {
      ...state.posts,
      [id]: {
        ...state.posts[id],
        upvoteCount: state.posts[id].upvoteCount + (isUpvote ? 1 : 0),
        downvoteCount: state.posts[id].downvoteCount + (isUpvote ? 0 : 1),
      },
    },
  });
}

function changeVoteComment(state, isUpvote, id) {
  return _.assign({}, state, {
    ...state,
    comments: {
      ...state.comments,
      [id]: {
        ...state.comments[id],
        upvoteCount: state.comments[id].upvoteCount + (isUpvote ? 1 : 0),
        downvoteCount: state.comments[id].downvoteCount + (isUpvote ? 0 : 1),
      },
    },
  });
}

function addCommentToPost(state, parentId, text) {
  return _.assign({}, state, {
          ...state,
          currentCommentId: state.currentCommentId + 1,
          posts: {
            ...state.posts,
            [parentId]: {
              ...state.posts[parentId],
              children: [
                ...state.posts[parentId].children,
                state.currentCommentId,
              ],
            },
          },
          comments: {
            ...state.comments,
            [state.currentCommentId]: { // Add new comment
              id: state.currentCommentId,
              content: text,
              upvoteCount: 0,
              downvoteCount: 0,
              children: [],
            },
          },
        });
}

function addCommentToComment(state, parentId, text) {
  return _.assign({}, state, {
          ...state,
          currentCommentId: state.currentCommentId + 1,
          comments: {
            ...state.comments,
            [state.currentCommentId]: { // Add new comment
              id: state.currentCommentId,
              content: text,
              upvoteCount: 0,
              downvoteCount: 0,
              children: [],
            },
            [parentId]: {
              ...state.comments[parentId],
              children: [
                ...state.comments[parentId].children,
                state.currentCommentId,
              ],
            },
          },
        });
}

export default function contentReducers(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return _.assign({}, state, {
        ...state,
        currentPostId: state.currentPostId + 1,
        posts: {
          ...state.posts,
          [state.currentPostId]: {
            id: state.currentPostId,
            content: action.text,
            title: action.title,
            upvoteCount: 0,
            downvoteCount: 0,
            children: [],
          },
        },
      });

    case ADD_COMMENT:
      return action.parentType === POST_TYPE
        ? addCommentToPost(state, action.parentId, action.text)
        : addCommentToComment(state, action.parentId, action.text);

    case UPVOTE:
      return action.contentType === POST_TYPE
        ? changeVotePost(state, true, action.id)
        : changeVoteComment(state, true, action.id);

    case DOWNVOTE:
      return action.contentType === POST_TYPE
        ? changeVotePost(state, false, action.id)
        : changeVoteComment(state, false, action.id);

    default:
      return state;
  }
}
