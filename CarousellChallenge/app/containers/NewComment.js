import React, { Component } from 'react';
import { Text, Button, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import { addComment } from '../actions';
import NewContentForm from '../components/NewContentForm';

class NewComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formState: {
        content: '',
      },
    };
  }

  render() {
    const parentComment = this.props.navigation.state.params.replyingToObject;
    const postId = this.props.navigation.state.params.postId;

    return (
      <View style={styles.container}>
        <Icon
          name="close"
          size={20}
          onPress={() => this.props.dispatchNavigateToPost(postId)}
        />
        <Text style={styles.titleText}>
          Replying To:
        </Text>
        <Text style={styles.parentComment}>
          {parentComment.content}
        </Text>
        <NewContentForm onChange={(formState) => {
          this.setState({ formState });
        }} />

        <Button
          onPress={() => {
            this.props.dispatchAddComment(parentComment.id, this.state.formState.content);
            this.props.dispatchNavigateToPost(postId);
          }}
          title="Submit"
          disabled={this.state.formState.content.length === 0}
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
  parentComment: {
    color: 'gray',
    marginBottom: 20,
    marginTop: 20,
  },
  titleText: {
    marginTop: 20,
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchAddComment: (parentId, text) => dispatch(addComment(parentId, text)),
    dispatchNavigateToPost: postId => dispatch(NavigationActions.back()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComment);
