import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, StatusBar, Image } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input, Left, Body, Right, Button, Icon, Title } from 'native-base';
import Spinner from '../Components/Spinner'
import firebase from 'firebase'
import { loginRequest, signupRequest, passwordResetRequest } from '../Actions/auth-actions'
import { Images } from '../Themes'





import styles from './Styles/VehicleCreateScreenStyle'

class VehicleCreateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '', make: '', model: '',
        }
    }

    componentDidUpdate() {
        console.log('login screen did update', this.props)
    }
    componentDidMount() {
        console.log('login screen did mount', this.state)
    }
    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
    }

    handleChange(text) {
        console.log(text)
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
                            <Button transparent onPress={() => this.props.navigation.navigate('HomeScreen')}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title><Text></Text></Title>
                        </Body>
                    </Header>
                    <Container style={styles.Container}>

                        <Content>
                            <Form style={styles.textInput}>
                                <Item
                                    success={true}
                                    error={false}>
                                    <Input
                                        placeholder="Vehicle Nickname"
                                        value={this.state.nickname}
                                        onChangeText={(text) => this.handleChange(text)} />
                                    <Icon name='checkmark-circle' />

                                </Item>
                                <Item
                                    success={true}
                                    error={false}>
                                    <Input
                                        placeholder="Make"
                                        value={this.state.make}
                                        onChangeText={(text) => this.handleChange(text)} />
                                    <Icon name='checkmark-circle' />
                                </Item>
                                <Item
                                    success={true}
                                    error={false}>
                                    <Input
                                        placeholder="Model"
                                        value={this.state.model}
                                        onChangeText={(text) => this.handleChange(text)} />
                                    <Icon name='checkmark-circle' />
                                </Item>
                            </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(VehicleCreateScreen)
