import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import { loginRequest } from '../Actions/auth-actions';
import firebaseApp from '../Config/firebase'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
    console.log('Rootcontainer DID mount', this.props)
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
        console.log('User signed in', user)
        this.props.loginRequest(user);
      } else {
        this.setState({ loggedIn: false });
        console.log('No user signed in')
      }
    });
    let signedInUser = firebaseApp.auth().currentUser;
    
    if (signedInUser) {
      console.log('Signed In User', signedInUser)
    } else {
      console.log('no active user', signedInUser)
    }
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  loginRequest: (user) => dispatch(loginRequest(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
