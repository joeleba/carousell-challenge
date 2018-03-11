# Carousell Coding Challenge

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app). My code is mainly in the `app/` directory.

## Building The Project

Make sure you have `npm` installed on your computer. For this project, I'm using `npm@4.6.1` and `node@v8.9.4`.



1. Install dependencies:

        npm i

2. Start the app on iOS simulator:

        npm run ios

[This issue](https://github.com/react-community/create-react-native-app/issues/62) is present when trying to start the simulator for the first time. If encountered, please re-run the command and it should work correctly.

## Testing

I'm using `jest` & `enzyme` to write the test cases.

To run the tests:

    npm test

## Datastructure design

The data used to generate display components lives in `redux` state. The state has the following structure:

```
{
  contentReducers: {
    currentPostId: int, // monotonically increasing
    currentCommentId: int, // monotonically increasing
    posts: {
      <id>: {
        children: [ids of children],
        content: string,
        downvoteCount: int,
        upvoteCount: int,
        title: string,
        id: int
      },
      ...
    },
    comments: {
      <id>: {
        children: [ids of children],
        content: string,
        downvoteCount: int,
        upvoteCount: int,
        id: int
      },
      ...
    }
  },
  nav: navReducer // managed by react-navigation-redux-helpers package
}

```

Posts/comments are stored in dictionary form instead of array to allow O(1) lookup, given the id.

## References

* https://reactnavigation.org/docs/redux-integration.html
* http://facebook.github.io/react-native/docs/getting-started.html

