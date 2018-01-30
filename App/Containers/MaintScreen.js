import React, { Component } from 'react'
import axios from 'axios'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, StatusBar, Image, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input, Left, Body, Right, Button, Icon, Title, Toast } from 'native-base';
import Spinner from '../Components/Spinner'

import firebase from 'firebase'
import { userVehicleCreateRequest, userVehiclePhotoUploadRequest } from '../Actions/vehicle-actions';
import { Images } from '../Themes'





// import styles from './Styles/VehicleCreateScreenStyle'

class MaintScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    componentDidUpdate() {
    }
    componentDidMount() {
    }



    render() {

        return (
            <Container>
                <Content>
                    <Text>Hi</Text>
                </Content>
            </Container>

        )
    }
}
//Merry Christmas Github
const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaintScreen)

