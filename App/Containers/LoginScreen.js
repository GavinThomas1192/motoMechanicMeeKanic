import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput } from 'react-native'
import { connect } from 'react-redux'
import Header from '../Components/Header';
import  Spinner  from '../Components/Spinner';
import FullButton from '../Components/FullButton';

import firebase from 'firebase'







// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  state = {
    loggedIn: false, email: '', password: '', error: '', loading: false 
  }
  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
    alert('You got signed in yolo!')
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <FullButton text='Log In' onPress={this.onButtonPress.bind(this)}>
        
      </FullButton>
    );
  }
  render() {
    return (
    <View style={styles.form}>
        <TextInput
          placeholder="user@gmail.com"
          label="Email"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />

        <TextInput
          secureTextEntry
          placeholder="password"
          label="Password"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />


      <Text style={styles.errorTextStyle}>
        {this.state.error}
      </Text>

        {this.renderButton()}
        </View>

    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
