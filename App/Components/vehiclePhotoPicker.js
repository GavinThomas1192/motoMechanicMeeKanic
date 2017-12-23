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
} from 'react-native';
import { Button, Text, Icon } from "native-base";
import ImagePicker from 'react-native-image-picker'


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
            avatarSource: ''
        }
        this.submitPhoto = this.submitPhoto.bind(this);
        this.choosePhoto = this.choosePhoto.bind(this)
    }

    componentDidUpdate() {
        console.log(this.state)
    }
    choosePhoto() {

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

                this.setState({
                    avatarSource: source
                });
            }
        });
    }

    submitPhoto() {

        return new Promise((resolve, reject) => {
            let mime = 'application/octet-stream'
            const uri = this.state.avatarSource.uri
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
            const sessionId = new Date().getTime()
            let uploadBlob = null
            const imageRef = firebase.storage().ref('vehicleImages/' + `${this.props.user.uid}`).child(`somesortofuniqueidentifyer`)

            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    console.log('First then')
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    console.log('second then', blob)
                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: mime })
                })
                .then(() => {
                    console.log('Third then')
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    console.log('Download URL', url)
                    resolve(url)
                })
                .catch((error) => {
                    reject(error)
                })
        })


    }

    render() {


        return (
            <View>

                <Text>Hello</Text>
                <Button transparent onPress={this.choosePhoto} >
                    <Icon name="build" />
                    <Text>Pick photo</Text>
                </Button>
                <Button transparent onPress={this.submitPhoto} >
                    <Icon name="build" />
                    <Text>Submit photo</Text>
                </Button>
            </View>

        )
    }
}

