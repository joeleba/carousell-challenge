import { ADD_POST, ADD_COMMENT, UPVOTE, DOWNVOTE } from '../actions';
import _ from 'lodash';
// TODO: Refactor this

const initialState = {
	currentId: 6,
	posts: {
		0: {
			children: [1, 2],
			content: "ccc",
			downvoteCount: 0,
			upvoteCount: 0,
			title: "sad",
			id: 0
		}
	},
	comments: {
		1: {
			children: [3, 4, 5],
			content: "ccc1",
			downvoteCount: 0,
			upvoteCount: 0,
			id: 1
		},
		2: {
			children: [],
			content: "ccc2",
			downvoteCount: 0,
			upvoteCount: 0,
			id: 2
		},
		3: {
			children: [],
			content: "ccc3",
			downvoteCount: 0,
			upvoteCount: 0,
			id: 3
		},
		4: {
			children: [],
			content: "ccc4",
			downvoteCount: 0,
			upvoteCount: 0,
			id: 4
		},
		5: {
			children: [],
			content: "ccc5",
			downvoteCount: 0,
			upvoteCount: 0,
			id: 5
		},

	}
}

function changeVotePost(state, isUpvote, id) {
	return _.assign({}, state, {
		...state,
		posts: {
			...state.posts,
			[id]: {
				...state.posts[id],
				upvoteCount: state.posts[id].upvoteCount + (isUpvote ? 1 : 0),
				downvoteCount: state.posts[id].downvoteCount + (isUpvote ? 0 : 1),
			}
		}
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
			}
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
						children: []
					}
				}
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
								]
							}
						}
					: state.posts,
				comments: {
					...state.comments,
					[state.currentId]: { // Add new comment
						id: state.currentId,
						content: action.text,
						upvoteCount: 0,
						downvoteCount: 0,
						children: []
					},
					[action.parentId]: state.comments[action.parentId] // Update parent comment (if applicable)
						? {
								...state.comments[action.parentId],
								children: [
									...state.comments[action.parentId].children,
									state.currentId,
								]
							}
						: null,
				}
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
