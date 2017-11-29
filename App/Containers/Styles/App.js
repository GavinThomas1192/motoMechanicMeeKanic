import '../../Config'
import DebugConfig from '../../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from '../RootContainer'
import createStore from '../../Redux'
import firebase from 'firebase';

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */


class App extends Component {
  state = { loggedIn: null };
  

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBl19lQkKFQiGh9V4ZTFLSRVftqGLZw-Y8',
      authDomain: 'motomechanic-dd66a.firebaseapp.com',
      databaseURL: 'https://motomechanic-dd66a.firebaseio.com',
      storageBucket: 'motomechanic-dd66a.appspot.com',
      messagingSenderId: '833429505896'
    });
  
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
  
 
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
