// ******** This is actually referencing the firebaseInitializeApp from the ./Containers/App ********
import firebase from 'firebase'


export const userSet = user => ({
    type: 'USER_SET',
    payload: user,
});

export const userCreate = user => ({
    type: 'USER_CREATE',
    payload: user,
});

export const userUpdate = user => ({
    type: 'USER_UPDATE',
    payload: user,
});

export const userSetRequest = user => dispatch => {
    return new Promise((resolve, reject) => {
        resolve(dispatch(userSet(user)));
    });
};



export const loginRequest = user => dispatch => {
    // ******** This gets called in RootContainer on mount, it will populate redux store with the entire User object from firebase ********
    // ******** FYI - The entire user object also contains their vehicles ********
    // ******** Here we need to check if user already exists in Firebase Database so that we dont overwrite their old data ********
    // ******** WARNING! With Firebase if you set data to a spot that has existing data it will overwrite it! ********
    firebase.database().ref('users/' + user.uid).once('value').then(function (snapshot) {
        // ******** This method is straight from their docs ********
        // ******** It returns whatever is found at the path xxxxx/users/user.uid ********
        let username = snapshot.val();
        // {
        //     // ******** If the username object is empty there wasn't any data at xxxxxx/user/user.uid ********
        //     // ******** It's safe to write data to this spot ********
        //     username === null ? firebase.database().ref('users/' + user.uid).set({
        //         account: username
        //     }).then(function () {
        //         console.log('STORED THIS USER TO FIREBASE DB', username);
        //         dispatch(userSet(username))
        //     })
        //         : undefined
        // }
        // ******** Otherwise, the user already exists and we should update redux store with logged in user ********
        { !username.account ? console.log('errrrrrrrrr') : dispatch(userSet(username)) }
    })
        .catch((err) => console.log(err));


};
export const signupRequest = (email, password, username) => dispatch => {
    // ******** The signup actions only trigger for first time users, no need to check database ********
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((authData) => {
            // ******** Firebase will create a route with whatever KEY is fed to the .set method ********
            // ******** We dont actually want this to avoid deep nesting ********
            // ******** So we package up our user.account object and .set(account) without any key value pairs ********
            let account = {}
            account.email = email.toLowerCase()
            account.uid = authData.uid
            account.username = username
            firebase.database().ref('users/' + authData.uid).set({
                account
            }).then(() => {
                // ******** Now we need to grap a snapshot from the DB to validate account creation and update the redux store locally ********
                firebase.database().ref('users/' + authData.uid).once('value').then(function (snapshot) {
                    let updatedUser = snapshot.val();
                }).then(() => {
                    dispatch(userSet(updatedUser));

                })
            })
        }).catch((err) => console.log(err));
};


export const passwordResetRequest = email => dispatch => {
    var auth = firebase.auth();

    let emailAccount = email.toLowerCase();
    console.log(emailAccount)
    auth.sendPasswordResetEmail(emailAccount).then(function () {
        console.log('Password reset email sent')
    }).catch(function (error) {
        console.log(error);
    });

};


