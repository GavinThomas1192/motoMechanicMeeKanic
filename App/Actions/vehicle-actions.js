import firebase from 'firebase'
import { userSet, userCreate, userUpdate, loginRequest } from './auth-actions';


// ************ To be clear, in firebase the userVehicles and User information are ONE object. ************
// ************ I'm only modularizing to keep auth actions cleaner ************
// ************ Notice we are still calling the auth-actions redux actions to update the total user object ************



// export const userCreate = user => ({
//     type: 'USER_CREATE',
//     payload: user,
// });

// export const userUpdate = user => ({
//     type: 'USER_UPDATE',
//     payload: user,
// });


export const userVehicleCreateRequest = (vehicle, user) => dispatch => {
    console.log('This user got passed through', user, vehicle)
    let allVehiclesArray = []
    allVehiclesArray.push(vehicle[0]);

    firebase.database().ref('users/' + user.uid + '/allVehicles').once('value').then(function (snapshot) {
        // ******** This method is straight from their docs ********
        // ******** It returns whatever is found at the path xxxxx/users/user.uid ********
        let username = snapshot.val();
        {
            username === null ? firebase.database().ref('users/' + user.uid + '/allVehicles').set({
                allVehiclesArray
            }).then(() => {
                firebase.database().ref('users/' + user.uid).once('value').then(function (snapshot) {

                    let username = snapshot.val();
                    console.log(' FOUND THIS USER FROM THE DB', username);

                    { !username.account ? console.log('errrrrrrrrr') : dispatch(userSet(username)) }
                })
            }) :

                Promise.all(username.allVehiclesArray.map(ele => {
                    allVehiclesArray.push(ele);
                })).then(() => {

                    firebase.database().ref('users/' + user.uid + '/allVehicles').set({
                        allVehiclesArray
                    }).then(() => {
                        firebase.database().ref('users/' + user.uid).once('value').then(function (snapshot) {

                            let username = snapshot.val();
                            console.log(' FOUND THIS USER FROM THE DB', username);

                            { !username.account ? console.log('errrrrrrrrr') : dispatch(userSet(username)) }
                        })
                    })
                })

        }
        console.log('TESTING BAD ROUTE!', username);
    })




    //     {
    //         username.length < 2 ? firebase.database().ref('users/' + user.uid + '/allVehicles').set({
    //             allVehiclesArray
    //         }).then(() => {
    //             console.log('user didnt have vehicles, so we created allVehicles')
    //             loginRequest(user)
    //         })
    //             :

    //             allVehiclesArray.push(username.allVehicles)

    //         firebase.database().ref('users/' + user.uid + '/allVehicles').set({
    //             allVehiclesArray
    //         }).then(() => {
    //             loginRequest(user)
    //             console.log('user already had vehicles, so we added to allVehicles')
    //         })
    //     }

    // })

};

export const userVehicleUpdateRequest = (user, vehicle) => dispatch => {
    let { user } = getState();
    console.log('_bike_UPDATE_INCOMING_bike', bike)
    dispatch(bikeUpdate(bike));


};

export const userVehicleDeleteRequest = (user, vehicle) => dispatch => {

    let { user } = getState();
    console.log('_bike_DELETE_INCOMING_bike', bike)
    dispatch(bikeDelete(bike));

};
