import firebase from 'firebase';
import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    ScrollView,
    CameraRoll,
    Platform,
    Dimensions,
    Image,
    Switch
} from 'react-native';
import { Button, Text, Icon, CheckBox, Container, Content, Body, Radio, Right } from "native-base";
import ImagePicker from 'react-native-image-picker'
import Spinner from '../Components/Spinner'

import RNFetchBlob from 'react-native-fetch-blob'




const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob



import { RNS3 } from 'react-native-aws3';
export default class VehiclePhotoPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vehiclePhoto: '', wantsPhotoUpload: false, photoPool: [],
        }
        this.choosePhoto = this.choosePhoto.bind(this);
        this.handleCheckboxPress = this.handleCheckboxPress.bind(this)
    }

    componentDidUpdate() {
        console.log(this.state)
    }
    choosePhoto() {
        this.setState({ wantsPhotoUpload: true })

        var options = {
            title: 'Select Avatar',
            customButtons: [
                { name: 'fb', title: 'Choose Photo from Facebook' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };


                this.setState({ photoPool: [...this.state.photoPool, source], vehiclePhoto: source, wantsPhotoUpload: false })
                this.props.vehiclePhoto(this.state.photoPool);
            }
        });
    }

    handleCheckboxPress() {
        this.setState({ wantsPhotoUpload: !this.state.wantsPhotoUpload })
    }


    render() {


        return (
            <View>
                <Content>
                    {this.state.wantsPhotoUpload ? <Spinner /> :
                        <Content>

                            <Text>Upload photo of vehicle now?</Text>
                            <Button transparent onPress={this.choosePhoto} >
                                <Icon name="images" />
                                <Text>Yes!</Text>
                            </Button>
                        </Content>
                    }
                </Content>

            </View>

        )
    }
}

