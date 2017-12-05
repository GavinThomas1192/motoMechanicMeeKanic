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

import styles from './Styles/SignUpScreenStyles'

class SignUpScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstTime: false,
            UsernameinputSuccess: false,
            UsernameinputError: true,
            EmailinputSuccess: false,
            EmailinputError: true,
            EmailError: '',
            PasswordinputSuccess: false,
            PasswordinputError: true,
            email: '',
            username: '',
            password: '',
            error: '',
            loading: false,
            loggedIn: false,
        }
    }


    // ********* The next many lines handles the Signup.. *********


    onButtonPress() {
        const { email, password, username } = this.state;
        this.setState({ error: '', loading: true });
        console.log(this.state.EmailError)
        if (this.state.EmailError !== null || this.state.EmailError == '') {
            console.log(this.state.EmailError);
            console.log('Whoops error or empty string')
            
        } else {
            console.log('NOW FIRING SIGNUP REQUEST')
            this.setState({ loading: false })
            // this.props.signupRequest(email, password, username);
        }
    }



    handleUsernameChange(usernameText) {
        this.setState({ username: usernameText })
        console.log(usernameText)
        if (usernameText.length > 5) {
            this.setState({ UsernameinputError: false, UsernameinputSuccess: true, })
        } else {
            this.setState({ UsernameinputError: true, UsernameinputSuccess: false, })
        }
    }

    handlePasswordChange(passwordText) {
        this.setState({ password: passwordText })
        console.log(passwordText)
        if (passwordText.length > 5) {
            this.setState({ PasswordinputError: false, PasswordinputSuccess: true, })
        } else {
            this.setState({ PasswordinputError: true, PasswordinputSuccess: false, })
        }
    }

    handleEmailChange(emailText) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.setState({ email: emailText })
        if (re.test(emailText) == true && this.state.email.length > 1) {
            this.setState({ EmailinputError: false, EmailinputSuccess: true, EmailError: null })
        } else {
            this.setState({ EmailinputError: true, EmailinputSuccess: false, EmailError: 'Whoops, that email won\'t work' })
        }
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
            error: '',
            EmailError: '',
        });
        alert('You got signed in yolo!')
    }


    renderButton() {
        // if (this.state.loading) {
        //     return <Spinner size="small" />;
        // }

        return (
            <Button block onPress={this.onButtonPress.bind(this)}>
                <Text>Sign Up</Text>
            </Button>
        );
    }

    //     <Content>
    //     <Item success>
    //         <Input placeholder='Textbox with Success Input' />
    //         <Icon name='checkmark-circle' />
    //     </Item>
    // </Content>

    //     <Content>
    //     <Item error>
    //       <Input placeholder='Textbox with Error Input'/>
    //       <Icon name='close-circle' />
    //     </Item>
    //   </Content>

    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={styles.mainContainer}>
                <Header />
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='cover' />
                <Image source={Images.tools} style={styles.logo} />

                <ScrollView style={styles.container}>
                    <Container style={styles.container} >
                        <Content>
                            <Text style={styles.catchPhrase}>Drop the shop.</Text>

                            <Text>Sign up for your free account today!</Text>

                            <Form style={styles.textInput}>
                                <Item
                                    success={this.state.UsernameinputSuccess ? true : false}
                                    error={this.state.UsernameinputError ? true : false}>
                                    <Input
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChangeText={(text) => this.handleUsernameChange(text)} />
                                    <Icon name='checkmark-circle' />

                                </Item>
                                <Item
                                    success={this.state.EmailinputSuccess ? true : false}
                                    error={this.state.EmailinputError ? true : false}>
                                    <Input
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChangeText={(text) => this.handleEmailChange(text)} />
                                    <Icon name='checkmark-circle' />
                                </Item>
                                <Item
                                    success={this.state.PasswordinputSuccess ? true : false}
                                    error={this.state.PasswordinputError ? true : false}
                                    last>
                                    <Input
                                        value={this.state.password}
                                        onChangeText={(text) => this.handlePasswordChange(text)}
                                        placeholder="Password" />
                                    <Icon name='checkmark-circle' />
                                </Item>
                            </Form>
                            {this.renderButton()}

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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)



