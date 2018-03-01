import { ADD_POST, ADD_COMMENT, UPVOTE, DOWNVOTE } from '../actions';
// TODO: Refactor this

const initialState = {
	current_id: 0,
	posts: [],
	replies: {}
}

export default function contentReducers(state = initialState, action) {
	switch (action.type) {
		case ADD_POST:
			return Object.assign({}, state, {
				current_id: state.current_id + 1,
				posts: [
					...state.posts,
					{
						id: state.current_id,
						content: action.text,
						title: action.title,
						upvoteCount: 0,
						downvoteCount: 0,
						children: []
					}
				]
			})
		case ADD_COMMENT:
			return Object.assign({}, state, {
				current_id: state.current_id + 1,
				posts: state.posts.map(post =>
						post.id === action.parent_id
							? {
								...post,
								children: [
									...post.children,
									state.current_id
								]
							}
							: post
					),
				replies: _.merge(
					_.transform(
						state.replies,
						function(result, reply, id) {
							result[id] = id === action.parent_id
								? {
									id: id,
									content: reply.content,
									upvoteCount: reply.upvoteCount,
									downvoteCount: reply.downvoteCount,
									children: [...reply.children, state.current_id]
								}
								: reply;
						},
						{}),
					{
						id: state.current_id,
						content: action.text,
						upvoteCount: 0,
						downvoteCount: 0,
						children: []
					})
			})
		default:
			return state;
	}
}
