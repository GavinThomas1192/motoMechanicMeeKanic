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

class SignUpScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstTime: false,
            UsernameinputSuccess: false,
            UsernameinputError: true,
            EmailinputSuccess: false,
            EmailinputError: true,
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

    // state = {
    //     loggedIn: false, email: '', username: '', password: '', error: '', loading: false
    // }
    onButtonPress() {
        const { email, password, username } = this.state;
        this.setState({ error: '', loading: true });
        this.props.signupRequest(email, password, username);
    }

    // onLogoutPress() {

    //     firebase.auth().signOut().then(function () {
    //         console.log('Signed User out')
    //     }).catch(function (error) {
    //         console.log('Something went wrong');
    //     });
    // }

    // handleChange(text) {
    //     this.setState({
    //         [placeholder]: value,
    //         UsernameinputError: name === 'Username' && !value ? true : null,
    //         EmailinputError: name === 'Email' && !value ? true : null,
    //         passwordError: name === 'Password' && !value ? true : null,
    //     });

    //     if (placeholder === 'Username') {
    //         if (this.state.username.length !== 5) {
    //             this.setState({ usernameError: true })
    //         }
    //     }

    // }

    handleUsernameChange(usernameText) {
        this.setState({ username: usernameText })
        if (usernameText.length > 8) {
            this.setState({ usernameError: true })
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
            error: ''
        });
        alert('You got signed in yolo!')
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
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
                                        name="Username"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChangeText={(text) => this.handleUsernameChange(text)} />
                                    <Icon name='checkmark-circle' />

                                </Item>
                                <Item
                                    success={this.state.EmailinputSuccess ? true : false}
                                    error={this.state.EmailinputError ? true : false}>
                                    <Input
                                        name="Email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChangeText={email => this.setState({ email })} />
                                </Item>
                                <Item
                                    success={this.state.PasswordinputSuccess ? true : false}
                                    error={this.state.PasswordinputError ? true : false}
                                    last>
                                    <Input
                                        name="Password"
                                        value={this.state.password}
                                        onChangeText={password => this.setState({ password })}
                                        placeholder="Password" />
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



