import React, { Component } from 'react'
import { AppRegistry, Text, FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';
import { addPost } from '../actions'
import NewContentForm from '../components/NewContentForm'

class PostListView extends Component {
  _keyExtractor(item, index) {
    return item.title;
  }

  render() {
    console.log(this.props.posts);
    return (
      <View style={styles.container}>
      <Text>HELOOOOOO</Text>
        <FlatList
          data={this.props.posts}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) =>
          <Text
            style={styles.item}
            onPress={() => this.props.dispatchNavigateToPost(item.id)}>
            {item.title}
          </Text>
        }
        />
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
})

function mapStateToProps(state) {
  return {
    posts: state.contentReducers.posts
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
      }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListView)
