import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, StatusBar, Image } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input,Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Images } from '../Themes'

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
      .catch(this.onLoginFail.bind(this));
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
    <View>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title><Text>Meekanic</Text></Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Right>
      </Header>        
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
