import React, { Component } from 'react';
import { Alert, AppRegistry, FlatList, Text, TextInput, Button, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { addPost } from '../actions';
import _ from 'lodash';


class CommentThread extends Component {
  _keyExtractor(item, index) {
    return item.id;
  }

  render() {
    let childrenObjects = _.map(
      this.props.comment.children, (id) => { return this.props.comments[id] }
    );

    return (
      <View style={styles.container}>
        <Text> {this.props.comment.content} </Text>
        <Text
          style={styles.replyButton}
          onPress={() =>
            this.props.dispatchNavigateToNewReply(this.props.postId, this.props.comment)
          }>
          Reply
        </Text>

        { childrenObjects.length !== 0 &&
          <FlatList
            data={childrenObjects}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) =>
              <CommentThreadWrapper comment={item} postId={this.props.postId}/>
            }
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: 'powderblue',
    borderLeftWidth: 1,
  },
})

function mapStateToProps(state) {
  return {
    comments: state.contentReducers.comments
  }
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
      }))
  }
}

// To ensure that we're recursively creating the component wrapped with
// Redux's connect function, instead of the local definition (pure React.Component)
let CommentThreadWrapper = connect(mapStateToProps, mapDispatchToProps)(CommentThread);
export default CommentThreadWrapper;
