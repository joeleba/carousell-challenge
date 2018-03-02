import React, { Component } from 'react'
import { AppRegistry, Text, TextInput, Button, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import { addPost } from '../actions'
import NewContentForm from '../components/NewContentForm'

// TODO: Refactor to Component
class NewPost extends Component {
  render() {
    let form;
    let title;
    return (
      <View style={styles.container}>
        <Icon
          name="close"
          size={20}
          onPress={() => this.props.dispatchNavigateBackToPostListView()}>
        </Icon>

        <TextInput
          onChangeText={(text) => { title = text }}
          style={styles.titleInput}
          placeholder="Title"
        />
        <NewContentForm ref={node => { form = node }}/>
        <Button
            onPress={() => {
              let newPostId = this.props.currentId;
              this.props.dispatchAddPost(title, form.state.content);
              this.props.dispatchNavigateToPost(newPostId);
            }}
            title="Submit"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   margin: 20
  },
  titleInput: {
    marginBottom: 20,
    marginTop: 20
  },
})

function mapStateToProps (state) {
  return {
    currentId: state.contentReducers.currentId
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchNavigateToPost: (postId) =>
      dispatch(NavigationActions.navigate({
        routeName: 'PostView',
        params: {
          postId: postId
        }
      })),
    dispatchNavigateBackToPostListView: () =>
      dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'PostListView' })],
      })),
    dispatchAddPost: (title, content) =>
      dispatch(addPost(title, content))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)
