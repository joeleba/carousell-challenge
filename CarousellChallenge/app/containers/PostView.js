import React, { Component } from 'react'
import { AppRegistry, Text, FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux'
import { addPost } from '../actions'
import NewContentForm from '../components/NewContentForm'
import _ from 'lodash'

class PostListView extends Component {

  render() {
    let post = _.find(this.props.posts, { id: this.props.navigation.state.params.postId });

    console.log(this.props);
    return (
      <View style={styles.container}>
      <Text>
        {post.title}
        {post.content}
      </Text>

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
    posts: state.contentReducers.posts,
    replies: state.contentReducers.replies
  }
}

export default connect(mapStateToProps)(PostListView)
