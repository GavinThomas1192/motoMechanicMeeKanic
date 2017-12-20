import firebase from 'firebase'
import { userSet, userCreate, userUpdate, loginRequest } from './auth-actions';


// ************ To be clear, in firebase the userVehicles and User information are ONE object. ************
// ************ I'm only modularizing to keep auth actions cleaner ************
// ************ Notice we are still calling the auth-actions redux actions to update the total user object ************


// export const userSet = user => ({
//     type: 'USER_SET',
//     payload: user,
// });

// export const userCreate = user => ({
//     type: 'USER_CREATE',
//     payload: user,
// });

// export const userUpdate = user => ({
//     type: 'USER_UPDATE',
//     payload: user,
// });


export const userVehicleCreateRequest = (user, vehicle) => dispatch => {
    // let { user } = getState();

    // allVehicles = []
    // allVehicles.push(vehicle);

    // firebase.database().ref('users/' + user.uid).set({
    //     allVehicles

    // }).then(() => {
    //     loginRequest(user)
    // })
    console.log('hit vehicle create')

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
