

import * as firebase from 'firebase';  // Initialize Firebase
let fireBaseconfig = {
 apiKey: 'AIzaSyBl19lQkKFQiGh9V4ZTFLSRVftqGLZw-Y8',
 authDomain: 'motomechanic-dd66a.firebaseapp.com',
 databaseURL: 'https://motomechanic-dd66a.firebaseio.com',
 storageBucket: 'motomechanic-dd66a.appspot.com',
 messagingSenderId: '833429505896'
};
// firebase.initializeApp(fireBaseconfig);
export default firebaseApp = firebase.initializeApp(fireBaseconfig);

