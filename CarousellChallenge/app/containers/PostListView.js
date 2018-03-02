import React, { Component } from 'react'
import { AppRegistry, Text, FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import { addPost, upvote, downvote } from '../actions'
import NewContentForm from '../components/NewContentForm'

class PostListView extends Component {
  _keyExtractor(item, index) {
    return item.id;
  }

  render() {
    let posts = _.values(this.props.postsObject);
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            data={posts}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) =>
              <View style={styles.item}>
                <Text style={styles.vote}>
                  <Icon
                    name="arrow-up"
                    onPress={() => this.props.dispatchUpvoteAction(item.id)}></Icon>
                  {`  ${(item.upvoteCount - item.downvoteCount)}  `}
                  <Icon
                    name="arrow-down"
                    onPress={() => this.props.dispatchDownvoteAction(item.id)}></Icon>
                </Text>
                <Text
                  style={styles.title}
                  onPress={() => this.props.dispatchNavigateToPost(item.id)}>
                  {item.title}
                </Text>
              </View>
            }
          />
        </ScrollView>

        <View style={styles.floatingNewPostButton}>
          <Icon
            name="plus"
            backgroundColor="#3b5998"
            size={20}
            onPress={() => this.props.dispatchNavigateToNewPost()}>
          </Icon>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  title: {
    fontSize: 18,
    flex: 0.8
  },
  floatingNewPostButton: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 35,
    right: 35
  },
  vote: {
    fontSize: 18,
    flex: 0.2,
    color: 'gray'
  },
  item: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10
  }
})

function mapStateToProps(state) {
  return {
    postsObject: state.contentReducers.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchNavigateToPost: (postId) =>
      dispatch(NavigationActions.navigate({
        routeName: 'PostView',
        params: {
          postId: postId
        }
      })),
    dispatchNavigateToNewPost: () =>
      dispatch(NavigationActions.navigate({ routeName: 'NewPost' })),
    dispatchUpvoteAction: (id) => dispatch(upvote(id)),
    dispatchDownvoteAction: (id) => dispatch(downvote(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListView)
