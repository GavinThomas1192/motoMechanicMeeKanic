import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, StatusBar, Image } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input, Left, Body, Right, Button, Icon, Title, Footer, FooterTab } from 'native-base';
import Spinner from '../Components/Spinner'
import firebase from 'firebase'
import { loginRequest, signupRequest, passwordResetRequest } from '../Actions/auth-actions'
import { Images } from '../Themes'





import styles from './Styles/LoginScreenStyle'

class SettingsScreen extends Component {
    constructor(props) {
        super(props);

    }
    state = {
        loggedIn: false, email: '', password: '', error: '', loading: false, showPasswordReset: false,
    }

    componentDidUpdate() {
        console.log('login screen did update', this.props)
    }
    componentDidMount() {
        console.log('login screen did mount', this.state)
    }

    onHomePress(props) {
        props.navigate('HomeScreen')
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
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <Container style={styles.Container}>
                        <Text>Hello from the settings</Text>
                    </Container>
                </ScrollView>
                <Footer>
                    <FooterTab>
                        <Button vertical>
                            <Icon name="apps" />
                            <Text>Repair</Text>
                        </Button>
                        <Button vertical active={false} onPress={() => this.onHomePress(this.props.navigation)}>
                            <Icon name="camera" />
                            <Text>Home</Text>
                        </Button>
                        <Button vertical>
                            <Icon active name="navigate" />
                            <Text>Logs</Text>
                        </Button>
                        <Button active={true} vertical onPress={() => this.onProfilePress(this.props.navigation)}>
                            <Icon name="person" />
                            <Text>Profile</Text>
                        </Button>
                    </FooterTab>
                </Footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
