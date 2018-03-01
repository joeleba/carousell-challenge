import { ADD_POST, ADD_COMMENT, UPVOTE, DOWNVOTE } from '../actions';
import _ from 'lodash';
// TODO: Refactor this

const initialState = {
	current_id: 6,
	posts: [
		{
			children: [1, 2],
			content: "ccc",
			downvoteCount: 0,
			upvoteCount: 0,
			title: "sad",
			id: 0
		}
	],
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

export default function contentReducers(state = initialState, action) {
	let setComment = (id, content) => {

	};
	switch (action.type) {
		case ADD_POST:
			return _.assign({}, state, {
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
			let commentsObj = _.transform(
				state.comments,
				function(result, comment, id) {
					result[id] = id === action.parentId
						? {
							id: id,
							content: comment.content,
							upvoteCount: comment.upvoteCount,
							downvoteCount: comment.downvoteCount,
							children: [...comment.children, state.current_id]
						}
						: comment;
				},
				{}
			);
			commentsObj[state.current_id] = {
				id: state.current_id,
				content: action.text,
				upvoteCount: 0,
				downvoteCount: 0,
				children: []
			};

			return _.assign({}, state, {
				current_id: state.current_id + 1,
				posts: state.posts.map(post =>
					post.id === action.parentId
						? {
							...post,
							children: [
								...post.children,
								state.current_id
							]
						}
						: post
				),
				comments: commentsObj
			})
		default:
			return state;
	}
}
