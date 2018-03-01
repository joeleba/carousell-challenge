import React, { Component } from 'react';
import { Alert, AppRegistry, Text, TextInput, Button, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux'
import { addPost } from '../actions'


export default class NewContentForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          {...this.props}
          style={styles.textInput}
          editable={true}
          maxLength={255}
          multiline={true}
          placeholder="What's on your mind?"
        />
      </View>
    );
  }
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
  textInput: {
    height: 100,
    borderWidth: 1,
    borderColor: 'gray'
  }
})
