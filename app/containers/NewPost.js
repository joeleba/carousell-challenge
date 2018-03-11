import React, { Component } from 'react';
import { TextInput, Button, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from '@expo/vector-icons/FontAwesome';

import { addPost } from '../actions';
import NewContentForm from '../components/NewContentForm';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formState: {
        content: '',
      },
      title: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon
          name="close"
          size={20}
          onPress={() => this.props.dispatchNavigateBackToPostListView()}
        />

        <TextInput
          onChangeText={(text) => { this.state.title = text; }}
          style={styles.titleInput}
          placeholder="Title"
        />
        <NewContentForm onChange={(formState) => {
          this.setState({ formState });
        }} />

        <Button
          onPress={() => {
            let newPostId = this.props.currentPostId;
            this.props.dispatchAddPost(this.state.title, this.state.formState.content);
            this.props.dispatchNavigateToPost(newPostId);
          }}
          title="Submit"
          disabled={this.state.formState.content.length === 0 || this.state.title.length === 0}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  titleInput: {
    marginBottom: 20,
    marginTop: 20,
  },
});

function mapStateToProps(state) {
  return {
    currentPostId: state.contentReducers.currentPostId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchNavigateToPost: postId =>
      dispatch(NavigationActions.navigate({
        routeName: 'PostView',
        params: { postId },
      })),
    dispatchNavigateBackToPostListView: () =>
      dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'PostListView' })],
      })),
    dispatchAddPost: (title, content) => dispatch(addPost(title, content)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
