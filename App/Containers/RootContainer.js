import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import { loginRequest, userSetRequest } from '../Actions/auth-actions';
import { userVehicleFetchRequest } from '../Actions/vehicle-actions';
import firebase from 'firebase'
import styles from './Styles/RootContainerStyles'


class RootContainer extends Component {

  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }

    // ********* Add a listener from the database to monitor whos logged in. *********
    firebase.auth().onAuthStateChanged((user) => {
      // ********* If a user is logged in firebase will return the user object. THEY ARE NOT LOGGED IN THOUGH *********
      if (user) {
        console.log('onAuthStateChanged', user)
        // ********* Then we call an official Firebase login function through actions *********
        this.props.loginRequest(user);
      } else {
        console.log('No user signed in')
      }
    });

    // ********* After logging in the found user from above we need to set them to redux store *********  
    let signedInUser = firebase.auth().currentUser;

    if (signedInUser) {
      this.props.loginRequest(signedInUser);
      console.log('currentUserSignedIn', signedInUser)
    } else {
      console.log('no active user', signedInUser)
    }

  }


  render() {
    // ********* Now we start rendering screens instead of convential react components ********* 
    // ********* By default, the ./LaunchScreen renders first ********* 
    // ********* Go Look at ../Navigation/AppNavigation to see all the screens, later we will be able to render screens by navigate('screenname')*********  
    return (
      <View style={styles.applicationView}>
        <StatusBar hidden={true} barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    nav: state.nav,
  }

}
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  loginRequest: (user) => dispatch(loginRequest(user)),
  userSetRequest: (user) => dispatch(userSetRequest(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
