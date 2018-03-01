import React, { Component } from 'react'
import { AppRegistry, Text, TextInput, Button, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';

import { addPost } from '../actions'
import NewContentForm from '../components/NewContentForm'

let NewPost = ({ dispatch }) => {
  let content;
  let title;
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => title = text}
        style={styles.titleInput}
        placeholder="Title"
      />
      <TextInput
        onChangeText={(text) => content = text}
        style={styles.textInput}
        editable={true}
        maxLength={255}
        multiline={true}
        placeholder="What's on your mind?"
      />
      <Button
          onPress={() => {
            dispatch(addPost(title, content));
            dispatch(NavigationActions.navigate({ routeName: 'PostListView' }))
          }}
          title="Submit"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   margin: 20
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleInput: {
    marginBottom: 20
  },
  textInput: {
    height: 100,
    borderWidth: 1,
    borderColor: 'gray'
  }
})

// function mapStateToProps (state) {
//   return {
//     people: state.people.people
//   }
// }

// function mapDispatchToProps (dispatch) {
//   return {
//     dispatchAddPost: (text) => dispatch(addPost(text)),
//   }
// }

export default connect()(NewPost)
