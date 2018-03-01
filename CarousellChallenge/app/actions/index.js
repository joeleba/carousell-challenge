export const ADD_POST = "ADD_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const UPVOTE = "UPVOTE";
export const DOWNVOTE = "DOWNVOTE";

export const addPost = (title, text) => ({
  type: ADD_POST,
  title: title,
  text
})

export const addComment = (parentId, text) => ({
  type: ADD_COMMENT,
  parentId: parentId,
  text
})

export const upvote = (id) => ({
  type: UPVOTE,
  id
})

export const downvote = (id) => ({
  type: DOWNVOTE,
  id
})
