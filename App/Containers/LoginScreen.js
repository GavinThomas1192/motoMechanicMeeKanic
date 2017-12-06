import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, StatusBar, Image } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input,Left, Body, Right, Button, Icon, Title } from 'native-base';
import Spinner from '../Components/Spinner'
import firebase from 'firebase'
import {loginRequest, signupRequest } from '../Actions/auth-actions'





import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  constructor(props){
    super(props);
  }
  state = {
    loggedIn: false, email: '', password: '', error: '', loading: false 
  }

  componentDidUpdate(){
    console.log('login screen did update', this.props)
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
      <Button style={{ backgroundColor: '#757575', margin: 5 }} block onPress={this.onButtonPress.bind(this)}>
        <Text>Log In</Text>
      </Button>
    );
  }
  render() {
    return (
    <View>
      <ScrollView>
      <Header>
        <Left>
          <Button transparent onPress={() => this.props.navigation.navigate('LaunchScreen')}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title><Text></Text></Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Right>
      </Header>  
      <Container style={styles.Container}>
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
      
        </Content>
      </Container> 
      </ScrollView>
      </View>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (user) => dispatch(loginRequest(user)),
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
