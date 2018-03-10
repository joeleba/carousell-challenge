import React, { Component } from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import OptionsRow from '../containers/OptionsRow';


class CommentThread extends Component {
  keyExtractor(item, index) {
    return item.id;
  }

  render() {
    const childrenObjects = _.map(
      this.props.comment.children,
      id =>  this.props.comments[id],
    );

    return (
      <View style={styles.container}>
        <Text> {this.props.comment.content} </Text>
        <OptionsRow currentComment={this.props.comment} postId={this.props.postId} />

        { childrenObjects.length !== 0 &&
          <FlatList
            data={childrenObjects}
            keyExtractor={this.keyExtractor}
            renderItem={({ item }) =>
              <CommentThreadWrapper comment={item} postId={this.props.postId} />
            }
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 10,
    borderColor: 'lightgrey',
    borderLeftWidth: 1,
  },
});

function mapStateToProps(state) {
  return {
    comments: state.contentReducers.comments,
  };
}

// To ensure that we're recursively creating the component wrapped with
// Redux's connect function, instead of the local definition (pure React.Component)
const CommentThreadWrapper = connect(mapStateToProps)(CommentThread);
export default CommentThreadWrapper;
