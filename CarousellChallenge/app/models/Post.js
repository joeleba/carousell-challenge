import VotableComment from 'VotableComment';
/**
 * Represents a post as a wrapper for VotableComment
 * (treating a post as a special comment)
 */
export class Post {
  constructor(content) {
    this.postContent = VotableComment(content);
  }
}
