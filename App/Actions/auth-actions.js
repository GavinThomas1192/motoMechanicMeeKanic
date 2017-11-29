
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


export const loginRequest = user => dispatch => {
    // ******** Here we need to check if user already exists so that we dont overwrite their old data ********
    let name = user.username
    firebase.database().ref('users/' + user.uid).once('value').then(function (snapshot) {
        let username = snapshot.val();
        console.log('LOOOKHERE GAVIN', username);
        {
            // ******** If theres no user already lets set it to the database ********
            username === null ? firebase.database().ref('users/' + user.uid).set({
                account: user
            }).then(function () {
                console.log('SET NEW USER!');
            })

                : dispatch(userSet(username))
        }
    });

    dispatch(userSet(user))
    console.log('INSIDE FIREBASEE DB SET', user)

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

