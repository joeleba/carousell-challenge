import React, { Component } from 'react';
import { Alert, AppRegistry, FlatList, Text, TextInput, Button, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { addPost } from '../actions';
import _ from 'lodash';


class CommentThread extends Component {
  _keyExtractor(item, index) {
    return item.id;
  }

  render() {
    let childrenObjects = _.map(
      this.props.comment.children, (id) => { return this.props.comments[id] }
    );

    return (
      <View style={styles.container}>
        <Text> {this.props.comment.content} </Text>
        <Text> Reply button </Text>

        { childrenObjects.length !== 0 &&
          <FlatList
            data={childrenObjects}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) =>
              <CommentThread comment={item}/>
            }
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: 'powderblue',
    borderBottomWidth: 1,
  },
})

function mapStateToProps(state) {
  return {
    comments: state.contentReducers.comments
  }
}

export default connect(mapStateToProps)(CommentThread)
