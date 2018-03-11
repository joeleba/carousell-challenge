export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';
export const POST_TYPE = 'POST';
export const COMMENT_TYPE = 'COMMENT'

export const addPost = (title, text) => ({
  type: ADD_POST,
  title,
  text,
});

export const addComment = (parentId, parentType, text) => ({
  type: ADD_COMMENT,
  parentId,
  parentType,
  text,
});

export const upvote = (id, contentType) => ({
  type: UPVOTE,
  contentType,
  id,
});

export const downvote = (id, contentType) => ({
  type: DOWNVOTE,
  contentType,
  id,
});
