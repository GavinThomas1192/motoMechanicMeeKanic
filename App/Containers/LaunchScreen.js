import React, { Component } from 'react'
import firebase from 'firebase'
import { ScrollView, Text, Image, View, TextInput } from 'react-native'
import { Container, Header, Content, Form, Item, Input,Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Images } from '../Themes'
import Spinner from '../Components/Spinner'
import RootContainer from './RootContainer'
import App from './Styles/App'
import { connect } from 'react-redux'

import {loginRequest } from '../Actions/auth-actions'

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {

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

    onLogoutPress(){

      firebase.auth().signOut().then(function() {
        console.log('Signed User out')
      }).catch(function(error) {
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
        error: ''
      });
      alert('You got signed in yolo!')
    }
  
    renderButton() {
      if (this.state.loading) {
        return <Spinner size="small" />;
      }
  
      return (
        // <FullButton text='Log In' onPress={this.onButtonPress.bind(this)}>
          
        // </FullButton>
        <Button block onPress={this.onButtonPress.bind(this)}>
        <Text>Log In</Text>
      </Button>
      );
    }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
          <Text style={styles.catchPhrase}>
            Catchy looking logo here
            </Text>
          <Text style={styles.catchPhrase}>
          MeeKanic, 
          A car guys right hand man. 
          </Text>
      </View>
        
    <Container>
      <Content>
          <Form style={styles.textInput}>
            <Item>
              <Input placeholder="Email" 
              value={this.state.email}
              onChangeText={email => this.setState({ email })}/>
            </Item>
            <Item last>
              <Input 
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              placeholder="Password" />
            </Item>
          </Form>
          
      {this.renderButton()}
      <Button block onPress={this.onLogoutPress.bind(this)}>
        <Text>Sign Out</Text>
      </Button>
        </Content>
      </Container>
      
      <Text style={styles.errorTextStyle}>
        {this.state.error}
      </Text>
        </ScrollView>
      </View>
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
    loginRequest: (user) => dispatch(loginRequest(user))
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
