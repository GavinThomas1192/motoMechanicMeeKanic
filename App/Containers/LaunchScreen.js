import React, { Component } from 'react'
import firebase from 'firebase'
import { ScrollView, Text, Image, View, TextInput } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Images } from '../Themes'
import Spinner from '../Components/Spinner'
import RootContainer from './RootContainer'
import App from './App'
import { connect } from 'react-redux'
import Login from '../Components/FacebookLogin'
import { loginRequest, signupRequest } from '../Actions/auth-actions'

import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstTime: false,
    }
    // this.goHomeIfUser = this.goHomeIfUser.bind(this);
  }
  componentDidUpdate() {
    console.log('LAUNCH SCREEN DID UPDATE ', this.props)
  }


  // ********* Here we need to track if someone is logged in from previous user of our application so they don't need to log in every time ********* 
  // *********  We use willRecieveRrops to avoid memory usage and infinite loops that componentDidUpdate() causes ********* 
  // ********* We are doing this because the screen component is rendering BEFORE the firebase login promise is returned *********

  componentWillReceiveProps(nextProps) {
    // ********* Grab navigate to use later  ********* 
    const { navigate } = this.props.navigation
    console.log('NEXTPROPS', nextProps)

    let user = {}
    // ********* If the length is null we can assume no user has been set yet *********
    if (user.length === 0) {
      // ********* Assigned nextProps(which is the returned promise from firebase) to this user object *********
      // ********* Now this is basically recursion, next time this component recieves nextProps the user object.length will not be null *********
      user = nextProps.user;
    }
    // ********* Now we can assume we have logged in a user through the above steps and can automatically render the home screen! *********
    // ********* Trigger the first time so anytime this componentReceivesProps, it doesn't trigger *********
    if (user.length !== 0 && this.state.firstTime === false) {
      this.setState({ firstTime: true })
      navigate('HomeScreen')
    }

  }

  // ********* The next many lines handles the login.. *********
  state = {
    loggedIn: false, email: '', username: '', password: '', error: '', loading: false
  }
  onButtonPress() {
    const { email, password, username } = this.state;

    this.setState({ error: '', loading: true });

    this.props.signupRequest(email, password, username);

  }

  onLogoutPress() {

    firebase.auth().signOut().then(function () {
      console.log('Signed User out')
    }).catch(function (error) {
      console.log('Something went wrong');
    });
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
    alert('Whoops, thats not the correct information!')
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      username: '',
      error: ''
    });
    alert('You got signed in yolo!')
  }



  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button block onPress={this.onButtonPress.bind(this)}>
        <Text>Sign Up</Text>
      </Button>
    );
  }



  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
        <Image source={Images.tools} style={styles.logo} />

        <ScrollView style={styles.container}>
          <Container style={styles.container} >
            <Content>
              <Text style={styles.catchPhrase}>Drop the shop.</Text>


              {this.renderButton()}
              <Text style={styles.centered}> </Text>
              <Button

                block
                onPress={() =>
                  navigate('LoginScreen')
                }
              ><Text>Go Log In</Text></Button>

            </Content>
          </Container>

          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>
        </ScrollView>
      </View >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (user) => dispatch(loginRequest(user)),
    signupRequest: (email, password, username) => dispatch(signupRequest(email, password, username))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
