import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import { loginRequest, userSetRequest} from '../Actions/auth-actions';
import firebase from 'firebase'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
    console.log('Rootcontainer DID mount', this.props)
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('User signed in', user)
        this.props.loginRequest(user);
      } else {
        console.log('No user signed in')
      }
    });
    //need to store auth in store to render home if user exists
    let signedInUser = firebase.auth().currentUser;
    
    if (signedInUser) {
      this.props.userSetRequest(signedInUser);
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
    nav: state.nav,
  }
  
}
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  loginRequest: (user) => dispatch(loginRequest(user)),
  userSetRequest: (user) => dispatch(userSetRequest(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
