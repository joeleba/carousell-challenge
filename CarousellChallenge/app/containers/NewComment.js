import React, { Component } from 'react'
import { AppRegistry, Text, TextInput, Button, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';

import { addComment } from '../actions'
import NewContentForm from '../components/NewContentForm'

class NewComment extends Component {
  render() {
    let form;
    let parentComment = this.props.navigation.state.params.replyingToObject;
    let postId = this.props.navigation.state.params.postId;

    return (
      <View style={styles.container}>
        <Text>
          Replying To:
        </Text>
        <Text style={styles.parentComment}>
          {parentComment.content}
        </Text>
        <NewContentForm ref={node => { form = node }}/>
        <Button
            onPress={() => {
              this.props.dispatchAddComment(parentComment.id, form.state.content);
              this.props.dispatchNavigateToPost(postId)
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
   justifyContent: 'center',
   margin: 20
  },
  parentComment: {
    color: 'gray',
    marginBottom: 20
  },
})

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchAddComment: (parentId, text) => dispatch(addComment(parentId, text)),
    dispatchNavigateToPost: (postId) => dispatch(NavigationActions.back())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComment)
