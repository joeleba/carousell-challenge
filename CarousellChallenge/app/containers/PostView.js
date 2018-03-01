import React, { Component } from 'react';
import { AppRegistry, Text, FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { addPost } from '../actions';
import NewContentForm from '../components/NewContentForm';
import CommentThread from '../containers/CommentThread';
import _ from 'lodash'

class PostListView extends Component {
  _keyExtractor(item, index) {
    return item.id;
  }

  render() {
    let post = _.find(
      this.props.posts,
      { id: this.props.navigation.state.params.postId }
    );
    let childrenObjects = _.map(
      post.children, (id) => { return this.props.comments[id] }
    );
    console.log(childrenObjects);
    return (
      <View style={styles.container}>
        <View style={styles.post}>
          <Text> {post.title} </Text>
          <Text> {post.content} </Text>
          <Text
            style={styles.replyButton}
            onPress={() => this.props.dispatchNavigateToNewReply(post.id, post)}>
            Reply
          </Text>
        </View>

        { childrenObjects.length !== 0 &&
          <FlatList
            data={childrenObjects}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) =>
              <View style={styles.comment}>
                <CommentThread comment={item}/>
              </View>
            }
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  post: {
    padding: 10,
    borderColor: 'powderblue',
    borderBottomWidth: 1,
  },
  comment: {
    padding: 10,
  },
  replyButton: {

  }
})

function mapStateToProps(state) {
  return {
    posts: state.contentReducers.posts,
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

export default connect(mapStateToProps, mapDispatchToProps)(PostListView)
