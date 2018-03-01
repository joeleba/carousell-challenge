import _ from 'lodash';
/**
 * We represent the comment thread with a tree-like struture.
 * This class acts as a TreeNode, with values (content, upvoteCount, downvoteCount) and children nodes (replies)
 */
export class VotableComment {
  constructor(content) {
    this.content = content;
    this.timeCreated = Date.now();
    this.upvoteCount = 0;
    this.downvoteCount = 0;
    this.replies = []
  }

  upvote() {
    this.upvoteCount += 1;
  }

  downvote() {
    this.downvoteCount += 1;
  }

  resultantVoteCount() {
    return this.upvoteCount - this.downvoteCount;
  }

  /**
   * Add a new reply to the VotableComment
   */
  addReply(content) {
    let newReply = VotableComment(content);
    this.replies.push(newReply);
  }

  /**
   * Returns replies, sorted by number of upvotes
   */
  get sortedReplies() {
    return _.orderBy(this.replies, (c) => { c.resultantVoteCount() }, 'desc');
  }

}
