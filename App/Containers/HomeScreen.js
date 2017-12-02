import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, StatusBar, Image } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input,Left, Body, Right, Button, Icon, Title } from 'native-base';
import Spinner from '../Components/Spinner'
import firebase from 'firebase'
import {loginRequest, signupRequest } from '../Actions/auth-actions'





import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  constructor(props){
    super(props);
  }
  state = {
    loggedIn: false, email: '', password: '', error: '', loading: false 
  }

  componentDidUpdate(){
    console.log('login screen did update', this.props)
  }
  
  render() {
    return (
    <View>
      <ScrollView>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title><Text>Welcome Home!</Text></Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Right>
      </Header>  
      <Text style={styles.main}>HELLO FROM THE HOME </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
