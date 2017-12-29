import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, StatusBar, Image } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
import Spinner from '../Components/Spinner'
import firebase from 'firebase'
import { loginRequest, signupRequest, passwordResetRequest } from '../Actions/auth-actions'
import { Images } from '../Themes'





import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    loggedIn: false, email: '', password: '', error: '', loading: false, showPasswordReset: false,
  }

  componentDidUpdate() {
  }
  componentDidMount() {
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
    this.props.navigation.navigate('LaunchScreen')
  }

  sendPasswordResetEmail() {
    this.props.passwordReset(this.state.email)
    this.setState({
      showPasswordReset: !this.state.showPasswordReset,
    })
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
          <Header style={{ shadowOpacity: 0, backgroundColor: 'transparent' }} >
            <Left>
              <Button transparent onPress={() => this.props.navigation.navigate('LaunchScreen')}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title><Text></Text></Title>
            </Body>
          </Header>
          <Container style={styles.Container}>

            <Content>
              {!this.state.showPasswordReset ?
                <Form style={styles.textInput}>
                  <Item>
                    <Input placeholder="Email"
                      value={this.state.email}
                      onChangeText={email => this.setState({ email })} />
                  </Item>
                  <Item last>
                    <Input
                      secureTextEntry={true}
                      value={this.state.password}
                      onChangeText={password => this.setState({ password })}
                      placeholder="Password" />
                  </Item>
                  {this.renderButton()}
                </Form>
                :
                <Container>
                  <Content>
                    <Text>Input the email you signed up with, and we will email you directions to reset your password.</Text>
                    <Form style={styles.textInput}>
                      <Item>
                        <Input placeholder="Email"
                          value={this.state.email}
                          onChangeText={email => this.setState({ email })} />
                      </Item>
                    </Form>
                    <Button style={{ backgroundColor: '#757575', margin: 5 }} block onPress={this.sendPasswordResetEmail.bind(this)}><Text>Send Password Reset Email</Text></Button>
                  </Content>
                </Container>}



              <Text>Forgot your password? Reset it <Text style={{ color: 'red', textDecorationLine: "underline", }} onPress={() => this.setState({ showPasswordReset: !this.state.showPasswordReset })}>here</Text></Text>
            </Content>
          </Container>
        </ScrollView>
      </View >

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
    passwordReset: (email) => dispatch(passwordResetRequest(email)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)


