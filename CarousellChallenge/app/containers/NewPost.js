import React, { Component } from 'react'
import { AppRegistry, Text, TextInput, Button, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';

import { addPost } from '../actions'
import NewContentForm from '../components/NewContentForm'

let NewPost = ({ dispatch }) => {
  let form;
  let title;
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => { title = text }}
        style={styles.titleInput}
        placeholder="Title"
      />
      <NewContentForm ref={node => { form = node }}/>
      <Button
          onPress={() => {
            dispatch(addPost(title, form.state.content));
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
  titleInput: {
    marginBottom: 20
  },
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
