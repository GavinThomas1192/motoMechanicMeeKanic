
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

// const polyfill = RNFetchBlob.polyfill

// window.XMLHttpRequest = polyfill.XMLHttpRequest
// window.Blob = polyfill.Blob
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
        const file = {
            // `uri` can also be a file system path (i.e. file://)
            uri: "/Users/Gavinator/coding/postGrad/motoMechanicMeeKanic/App/Images/dirtyHandsDark.jpg",
            name: "image.png",
            type: "image/png"
        }
        const options = {
            // keyPrefix: "uploads/",
            bucket: "meekanic",
            region: "us-east-1",
            accessKey: "AKIAJ2I7KGRAA2YVAQLA",
            secretKey: "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",
            successActionStatus: 201
        }
        RNS3.put(file, options).then(response => {

            console.log(response.body);
            /**
             * {
             *   postResponse: {
             *     bucket: "your-bucket",
             *     etag : "9f620878e06d28774406017480a59fd4",
             *     key: "uploads/image.png",
             *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
             *   }
             * }
             */
        })
            .catch((error) => { console.log(error) });
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


// More info on all the options is below in the README...just some common use cases shown here


/**
* The first arg is the options object for customization (it can also be null or omitted for default options),
* The second arg is the callback which sends object: response (more info below in README)
*/
// ImagePicker.showImagePicker(options, (response) => {
//     console.log('Response = ', response);

//     if (response.didCancel) {
//         console.log('User cancelled image picker');
//     }
//     else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//     }
//     else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//     }
//     else {
//         let source = { uri: response.uri };

//         // You can also display the image using data:
//         // let source = { uri: 'data:image/jpeg;base64,' + response.data };

//         this.setState({
//             avatarSource: source
//         });
//     }
// });