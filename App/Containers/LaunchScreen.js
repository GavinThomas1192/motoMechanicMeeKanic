import React, { Component } from 'react'
import firebase from 'firebase'
import { ScrollView, Text, Image, View, TextInput } from 'react-native'
import { Container, Header, Content, Form, Item, Input,Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Images } from '../Themes'
import Spinner from '../Components/Spinner'
import FacebookLogin from '../Components/FacebookLogin'
import RootContainer from './RootContainer'
import App from './App'
import { connect } from 'react-redux'
import Login from '../Components/FacebookLogin'
import {loginRequest, signupRequest } from '../Actions/auth-actions'

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  constructor(props){
    super(props)
    this.goHomeIfUser = this.goHomeIfUser.bind(this);
  }
  componentDidUpdate(){
    console.log('LAUNCH SCREEN DID UPDATE ', this.props)
  }
  
  componentWillReceiveProps(nextProps){
    const { navigate } = this.props.navigation
    console.log('NEXTPROPS', nextProps)
    let user = {}
    if(user.length === 0) {
      user = nextProps.user;
    }
    if(user.length !== 0){
     navigate('HomeScreen')
    }
    
  }
  
  componentDidMount(){
    
    {this.props.user.account ? navigate('HomeScreen') : undefined}
    
  }
    state = {
      loggedIn: false, email: '', username: '', password: '', error: '', loading: false 
    }
    onButtonPress() {
      const { email, password, username } = this.state;
  
      this.setState({ error: '', loading: true });
  
      this.props.signupRequest(email, password, username);
      
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

    goHomeIfUser(){
      const { navigate } = this.props.navigation
  
      {this.props.user.account.uid !== null ? navigate('LoginScreen') : undefined}
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
        <Text style={styles.catchPhrase}>Sign up today!</Text>
          <Form style={styles.textInput}>
          <Item>
              <Input placeholder="Username" 
              value={this.state.username}
              onChangeText={username => this.setState({ username })}/>
            </Item>
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
      {/* <Button block onPress={this.onLogoutPress.bind(this)}>
        <Text>Sign Out</Text>
      </Button> */}
      <Text>Already have an account?</Text>
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
    loginRequest: (user) => dispatch(loginRequest(user)),
    signupRequest: (email, password, username) => dispatch(signupRequest(email, password, username))
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
