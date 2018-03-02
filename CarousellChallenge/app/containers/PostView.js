import React, { Component } from 'react';
import { AppRegistry, Text, FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import { addPost } from '../actions';
import NewContentForm from '../components/NewContentForm';
import CommentThreadWrapper from '../containers/CommentThread';
import OptionsRow from '../containers/OptionsRow';
import _ from 'lodash'

class PostView extends Component {
  _keyExtractor(item, index) {
    return item.id;
  }

  render() {
    let post = this.props.posts[this.props.navigation.state.params.postId];
    let childrenObjects = _.map(
      post.children, (id) => { return this.props.comments[id] }
    );
    return (
      <View style={styles.container}>
        <View style={styles.post}>
          <Icon
            name="close"
            size={20}
            onPress={() => this.props.dispatchNavigateBackToPostListView()}>
          </Icon>

          <Text style={styles.title}> {post.title} </Text>
          <Text> {post.content} </Text>

          <OptionsRow currentComment={post} postId={post.id}/>
        </View>

        { childrenObjects.length !== 0 &&
          <FlatList
            data={childrenObjects}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) =>
              <View style={styles.comment}>
                <CommentThreadWrapper comment={item} postId={post.id}/>
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
  title: {
    fontSize: 25,
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
    dispatchNavigateBackToPostListView: () =>
      dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'PostListView' })],
      }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)
