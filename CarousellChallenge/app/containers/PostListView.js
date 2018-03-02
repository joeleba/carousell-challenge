import React, { Component } from 'react'
import { AppRegistry, Text, FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import { addPost } from '../actions'
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
              <Text
                style={styles.item}
                onPress={() => this.props.dispatchNavigateToPost(item.id)}>
                {item.title}
              </Text>
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  floatingNewPostButton: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 35,
    right: 35
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
      dispatch(NavigationActions.navigate({ routeName: 'NewPost' }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListView)
