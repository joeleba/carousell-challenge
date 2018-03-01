export const ADD_POST = "ADD_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const UPVOTE = "UPVOTE";
export const DOWNVOTE = "DOWNVOTE";

let nextContentId = 0
export const addPost = (title, text) => ({
  type: ADD_POST,
  id: nextContentId++,
  title: title,
  text
})

export const addComment = (parent_id, text) => ({
  type: ADD_COMMENT,
  id: nextContentId++,
  parent_id: parent_id,
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
