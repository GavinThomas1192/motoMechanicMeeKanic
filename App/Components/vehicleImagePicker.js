// import React from 'react';

// import firebase from 'firebase'
// import RNFetchBlob from 'react-native-fetch-blob'
// import CameraRollPicker from 'react-native-camera-roll-picker'


// export default class VehicleImagePicker extends React.Component {

//     getSelectedImages = (selectedImages, currentImage) => {

//         const image = currentImage.uri

//         const Blob = RNFetchBlob.polyfill.Blob
//         const fs = RNFetchBlob.fs
//         window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
//         window.Blob = Blob


//         let uploadBlob = null
//         const imageRef = firebase.storage().ref('posts').child("test.jpg")
//         let mime = 'image/jpg'
//         fs.readFile(image, 'base64')
//             .then((data) => {
//                 return Blob.build(data, { type: `${mime};BASE64` })
//             })
//             .then((blob) => {
//                 uploadBlob = blob
//                 return imageRef.put(blob, { contentType: mime })
//             })
//             .then(() => {
//                 uploadBlob.close()
//                 return imageRef.getDownloadURL()
//             })
//             .then((url) => {
//                 // URL of the image uploaded on Firebase storage
//                 console.log(url);

//             })
//             .catch((error) => {
//                 console.log(error);

//             })

//     }
//     render() {

//         return (
//             <View style={styles.gallery}>
//                 <CameraRollPicker selected={[]} maximum={1} callback={this.getSelectedImages} />
//                 <Text style={styles.welcome}>
//                     Image Gallery
//         </Text>
//             </View>
//         );
//     }
// }