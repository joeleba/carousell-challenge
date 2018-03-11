import _ from 'lodash';
import { ADD_POST, ADD_COMMENT, UPVOTE, DOWNVOTE } from '../actions';
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

function updateComments(state, parentId, text) {
  return state.comments[parentId]
    ? _.assign({}, state.comments, {
        ...state.comments,
        [state.currentId]: { // Add new comment
          id: state.currentId,
          content: text,
          upvoteCount: 0,
          downvoteCount: 0,
          children: [],
        },
        // Update parent comment
        [parentId]: {
          ...state.comments[parentId],
          children: [
            ...state.comments[parentId].children,
            state.currentId,
          ],
        }
      })
    : _.assign({}, state.comments, {
        ...state.comments,
        [state.currentId]: { // Add new comment
          id: state.currentId,
          content: text,
          upvoteCount: 0,
          downvoteCount: 0,
          children: [],
        }
      });
}

export default function contentReducers(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return _.assign({}, state, {
        ...state,
        currentId: state.currentId + 1,
        posts: {
          ...state.posts,
          [state.currentId]: {
            id: state.currentId,
            content: action.text,
            title: action.title,
            upvoteCount: 0,
            downvoteCount: 0,
            children: [],
          },
        },
      });

    case ADD_COMMENT:
      return _.assign({}, state, {
        ...state,
        currentId: state.currentId + 1,
        posts: state.posts[action.parentId] // Update parent post (if applicable)
          ? {
            ...state.posts,
            [action.parentId]: {
              ...state.posts[action.parentId],
              children: [
                ...state.posts[action.parentId].children,
                state.currentId,
              ],
            },
          }
          : state.posts,
        comments: updateComments(state, action.parentId, action.text),
      });

    case UPVOTE:
      return state.posts[action.id]
        ? changeVotePost(state, true, action.id)
        : changeVoteComment(state, true, action.id);

    case DOWNVOTE:
      return state.posts[action.id]
        ? changeVotePost(state, false, action.id)
        : changeVoteComment(state, false, action.id);

    default:
      return state;
  }
}
