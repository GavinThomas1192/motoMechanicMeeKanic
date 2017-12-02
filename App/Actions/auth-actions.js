import firebase from 'firebase'
// import { getDatabase } from './database'

// getDatabase().ref('...') // etc.
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


export const tokenSet = token => ({
    type: 'TOKEN_SET',
    payload: token,
});



export const tokenSetRequest = token => dispatch => {
    return new Promise((resolve, reject) => {
        resolve(dispatch(tokenSet(token)));
    });
};

export const userSetRequest = user => dispatch => {
    return new Promise((resolve, reject) => {
        resolve(dispatch(userSet(user)));
    });
};


export const loginRequest = user => dispatch => {
    // ******** Here we need to check if user already exists so that we dont overwrite their old data ********
    console.log('RECIEVED USER TO LOOKUP', user);
    firebase.database().ref('users/' + user.uid).once('value').then(function (snapshot) {
        let username = snapshot.val();
        console.log(' FOUND THIS USER FROM THE DB', username);
        {
            // ******** If theres no user already lets set it to the database ********
            username === null ? firebase.database().ref('users/' + user.uid).set({
                account: username
            }).then(function () {
                console.log('STORED THIS USER TO FIREBASE DB', username);
            })

                : dispatch(userSet(username))
        }
    })
    .catch((err) => console.log(err));

    dispatch(userSet(user))
    console.log('INSIDE FIREBASEE DB SET', user)

};
export const signupRequest = (email, password, username) => dispatch => {
    // ******** Here we need to check if user already exists so that we dont overwrite their old data ********
    console.log('RECIEVED USER TO SIGNUP', email, password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((authData) => {
        let account = {}
        account.email = email
        account.uid = authData.uid
        account.username = username
        firebase.database().ref('users/' + authData.uid).set({
            account
        }).then(() => {
            firebase.database().ref('users/' + authData.uid).once('value').then(function (snapshot) {
                let username = snapshot.val();
                console.log(' FOUND THIS USER FROM THE DB after signup', username);
            }).then(() => {
                dispatch(userSet(username));
            })
        })
    }).catch((err) => console.log(err));
};

export const bikeCreateRequest = bike => (dispatch, getState) => {
    let { user } = getState();
    console.log('_ROUTING_NEWbike_TO_STORE_', bike)
    console.log('_Attaching to this user_', user)
    user.allBikes = []
    user.allBikes.push(bike);
    console.log('_AFTER COMBINING_', user)

    firebase.database().ref('users/' + user.uid).set({
        account: user

    })
    dispatch(userUpdate(user));
}

export const bikeUpdateRequest = bike => (dispatch, getState) => {
    let { user } = getState();
    console.log('_bike_UPDATE_INCOMING_bike', bike)
    dispatch(bikeUpdate(bike));
}

export const bikeDeleteRequest = bike => (dispatch, getState) => {
    let { user } = getState();
    console.log('_bike_DELETE_INCOMING_bike', bike)
    dispatch(bikeDelete(bike));
}

export const tokenDelete = () => ({ type: 'TOKEN_DELETE', payload: null });

