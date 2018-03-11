import React, { Component } from 'react';
import { Text, FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from '@expo/vector-icons/FontAwesome';
import _ from 'lodash';

import { upvote, downvote, POST_TYPE } from '../actions';

class PostListView extends Component {
  keyExtractor(item, index) {
    return item.id;
  }

  render() {
    // I'm aware that the problem asked us to sort the topic by "upvotes"
    // I assume that you meant the "overral vote count" i.e. upvote - downvote
    let posts = _.orderBy(
      _.values(this.props.postsObject),
      [(p) => { return p.upvoteCount - p.downvoteCount; }],
      ['desc']
    );

    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            data={posts}
            keyExtractor={this.keyExtractor}
            renderItem={({ item }) =>
              (<View style={styles.item}>
                <Text style={styles.vote}>
                  <Icon
                    name="arrow-up"
                    onPress={() => this.props.dispatchUpvoteAction(item.id)}
                  />
                  {`  ${(item.upvoteCount - item.downvoteCount)}  `}
                  <Icon
                    name="arrow-down"
                    onPress={() => this.props.dispatchDownvoteAction(item.id)}
                  />
                </Text>
                <Text
                  style={styles.title}
                  onPress={() => this.props.dispatchNavigateToPost(item.id)}
                >
                  {item.title}
                </Text>
              </View>)
            }
          />
        </ScrollView>

        <View style={styles.floatingNewPostButton}>
          <Icon
            name="plus"
            backgroundColor="#3b5998"
            size={20}
            onPress={() => this.props.dispatchNavigateToNewPost()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  title: {
    fontSize: 18,
    flex: 0.8,
  },
  floatingNewPostButton: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 35,
    right: 35,
  },
  vote: {
    fontSize: 18,
    flex: 0.2,
    color: 'gray',
  },
  item: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});

function mapStateToProps(state) {
  return {
    postsObject: state.contentReducers.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchNavigateToPost: postId =>
      dispatch(NavigationActions.navigate({
        routeName: 'PostView',
        params: {
          postId,
        },
      })),
    dispatchNavigateToNewPost: () =>
      dispatch(NavigationActions.navigate({ routeName: 'NewPost' })),
    dispatchUpvoteAction: id => dispatch(upvote(id, POST_TYPE)),
    dispatchDownvoteAction: id => dispatch(downvote(id, POST_TYPE)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListView);
