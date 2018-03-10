import React, { Component } from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import logger from 'redux-logger';

import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import getRootReducer from './app/reducers';

import NewPost from './app/containers/NewPost';
import NewComment from './app/containers/NewComment';
import PostListView from './app/containers/PostListView';
import PostView from './app/containers/PostView';

const AppNavigator = StackNavigator(
  {
    NewPost: { screen: NewPost },
    PostListView: { screen: PostListView },
    PostView: { screen: PostView },
    NewComment: { screen: NewComment },
  },
  {
    initialRouteName: 'PostListView',
    headerMode: 'none',
  },
);

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

const mapStateToProps = state => ({
  nav: state.nav,
});

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

const addListener = createReduxBoundAddListener('root');

class App extends Component {
  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
          addListener,
        })}
      />
    );
  }
}

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(
  getRootReducer(navReducer),
  applyMiddleware(middleware),
);

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
