import React, { Component } from 'react';
import { AppRegistry, Text, FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import { upvote, downvote } from '../actions';
import NewContentForm from '../components/NewContentForm';
import CommentThreadWrapper from '../containers/CommentThread';
import _ from 'lodash'

class OptionsRow extends Component {
  _keyExtractor(item, index) {
    return item.id;
  }

  render() {
    let currentComment = this.props.currentComment;
    let postId = this.props.postId;

    return (
      <View style={styles.optionsRow}>
        <Text
          style={styles.option}
          onPress={() => this.props.dispatchNavigateToNewReply(postId, currentComment)}>
          <Icon name="reply">{" Reply  |  "}</Icon>
        </Text>

        <Text style={styles.option}>
          <Icon
            name="arrow-up"
            onPress={() => this.props.dispatchUpvoteAction(currentComment.id)}></Icon>
          {` ${(currentComment.upvoteCount - currentComment.downvoteCount)} `}
          <Icon
            name="arrow-down"
            onPress={() => this.props.dispatchDownvoteAction(currentComment.id)}></Icon>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  optionsRow: {
    height: 15,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  option: {
    color: 'grey',
    fontSize: 12
  }
})

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchNavigateToNewReply: (postId, replyingToObject) =>
      dispatch(NavigationActions.navigate({
        routeName: 'NewComment',
        params: {
          postId: postId,
          replyingToObject: replyingToObject
        }
      })),
    dispatchUpvoteAction: (id) => dispatch(upvote(id)),
    dispatchDownvoteAction: (id) => dispatch(downvote(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsRow)
