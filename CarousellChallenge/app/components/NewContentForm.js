import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default class NewContentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
    };
  }

  render() {
    return (
      <TextInput
        onChangeText={(text) => {
          this.setState({ content: text }, () => {
            this.props.onChange(this.state);
          });
        }}
        style={styles.textInput}
        editable={true}
        maxLength={255}
        multiline={true}
        placeholder="What's on your mind?"
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 100,
    borderWidth: 1,
    borderColor: 'gray',
  },
});
