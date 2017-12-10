import firebase from 'firebase'

// var storageRef = firebase.storage().ref();

export const profilePictureSet = user => ({
    type: 'PROFILE_PICTURE_SET',
    payload: user,
});


export const profilePictureUpdate = user => ({
    type: 'PROFILE_PICTURE_UPDATE',
    payload: user,
});

// export const profilePictureDelete = user => dispatch => {
//     return new Promise((resolve, reject) => {
//         resolve(dispatch(userSet(user)));
//     });
// };


// Create a reference to 'mountains.jpg'
// var mountainsRef = storageRef.child('mountains.jpg');

// Create a reference to 'images/mountains.jpg'
// var mountainImagesRef = storageRef.child('images/mountains.jpg');

// While the file names are the same, the references point to different files
// mountainsRef.name === mountainImagesRef.name            // true
// mountainsRef.fullPath === mountainImagesRef.fullPath    // false



export const profilePictureUploadRequest = (file) => dispatch => {

    firebase.storage.ref().put(file).then(function (snapshot) {
        console.log('Uploaded a blob or file!');
    });

};
