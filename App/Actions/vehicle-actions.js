import firebase from 'firebase'
import { userSet, userCreate, userUpdate, loginRequest } from './auth-actions';
import { Platform } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'




const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob


// ************ To be clear, in firebase the userVehicles and User information are ONE object. ************
// ************ I'm only modularizing to keep auth actions cleaner ************
// ************ Notice we are still calling the auth-actions redux actions to update the total user object ************



export const userVehicleCreateRequest = (vehicle, user) => dispatch => {
    console.log('This user got passed through', user, vehicle)
    //create array to hold vehicles
    let allVehiclesArray = []
    //Push new vehicle into said array
    allVehiclesArray.push(vehicle[0]);

    //Grab Snapshot at allVehicles to either ADD to or CREATE it on first vehicle. 
    firebase.database().ref('users/' + user.uid + '/allVehicles').once('value').then(function (snapshot) {
        // this will either be null or populated with vehicles. 
        let username = snapshot.val();
        {
            //If null, set array we created earlier with their first car!
            username === null ? firebase.database().ref('users/' + user.uid + '/allVehicles').set({
                allVehiclesArray
            }).then(() => {
                //Then grab new snapshot with this allvehicle array to update our redux store
                firebase.database().ref('users/' + user.uid).once('value').then(function (snapshot) {

                    let username = snapshot.val();

                    //Edge case if database get screwed up, otherwise update redux store
                    { !username.account ? console.log('errrrrrrrrr') : dispatch(userSet(username)) }
                })
            }) :

                //Otherwise username !== null and we need to add old vehicles with new vehicles. 
                //Promise because #javascript
                Promise.all(username.allVehiclesArray.map(ele => {
                    allVehiclesArray.push(ele);
                })).then(() => {

                    //Store newly constructed array with all their vehicles
                    firebase.database().ref('users/' + user.uid + '/allVehicles').set({
                        allVehiclesArray
                    }).then(() => {
                        //Grab snapshot to update redux store with all their vehicles. 
                        firebase.database().ref('users/' + user.uid).once('value').then(function (snapshot) {

                            let username = snapshot.val();


                            //Edge case if database get screwed up, otherwise update redux store
                            { !username.account ? console.log('errrrrrrrrr') : dispatch(userSet(username)) }
                        })
                    })
                })

        }
    })



};

export const userVehiclePhotoUploadRequest = (photos, user, year) => dispatch => {
    console.log('Inside vehiclePhotoUpload Actions', photos, user)

    let referenceToUploadedPhotos = [];

    return new Promise((resolve, reject) => {
        photos.map(ele => {
            let mime = 'application/octet-stream'

            let uri = ele.uri
            let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
            let sessionId = new Date().getTime()
            let uploadBlob = null
            let imageRef = firebase.storage().ref('vehicleImages/' + `${user.account.uid}`).child(`${sessionId}`)

            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: mime })
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    referenceToUploadedPhotos.push(url)
                    console.log('ARRAY OF URLS WHILE PUSHING', referenceToUploadedPhotos)
                    resolve(url)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    })
        .then(() => {
            let vehicles;
            firebase.database().ref('users/' + user.account.uid + `/allVehicles/allVehiclesArray`).limitToFirst(1).once('value').then(function (snapshot) {
                // ******** This method is straight from their docs ********
                // ******** It returns whatever is found at the path xxxxx/users/user.uid ********
                vehicles = snapshot.val();
            }).then(() => {
                console.log('ARRAY OF URLS BEFORE SETTING', referenceToUploadedPhotos)
                // let lastVehicle = vehicles.length - 1;
                firebase.database().ref('users/' + user.account.uid + `/allVehicles/allVehiclesArray/` + `${Object.keys(vehicles)[0]}` + `/photosReference`).set({
                    referenceToUploadedPhotos
                })
            })

        })


};

export const deleteVehicleRequest = (user, vehicle, index) => dispatch => {
    console.log('INSIDE VEHICLE DELETE', user, vehicle)
    console.log('YOLO', index)

    let listOfUrls = [];
    //Here we captures all the photos associated with this vehicle
    firebase.database().ref('users/' + user.account.uid + `/allVehicles/allVehiclesArray/` + index + `/photosReference/referenceToUploadedPhotos`).once('value').then(function (snapshot) {

        listOfUrls = snapshot.val();
        console.log(listOfUrls)
    }).then(() => {
        {
            //if not null then there are photos to delete
            listOfUrls !== null ?
                //Then we delete these photos from STORAGE
                firebase.storage().refFromURL(`${listOfUrls[0]}`).delete().then(() => {
                    //Then we delete the vehicle information from DATABASE
                    firebase.database().ref('users/' + user.account.uid + `/allVehicles/allVehiclesArray/` + index).remove();
                    //Dispatch loginRequest to update our redux store!
                    dispatch(loginRequest(user.account))

                }) :
                //otherwise no photos just delete data from database
                firebase.database().ref('users/' + user.account.uid + `/allVehicles/allVehiclesArray/` + index).remove();
            //Dispatch loginRequest to update our redux store!
            dispatch(loginRequest(user.account))
        }


    })
}


//TODO
// export const userVehicleUpdateRequest = (user, vehicle) => dispatch => {
//     let { user } = getState();
//     console.log('_bike_UPDATE_INCOMING_bike', bike)
//     dispatch(bikeUpdate(bike));


// };d

// export const userVehicleDeleteRequest = (user, vehicle) => dispatch => {

//     let { user } = getState();
//     console.log('_bike_DELETE_INCOMING_bike', bike)
//     dispatch(bikeDelete(bike));

// };

