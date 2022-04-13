import * as actionTypes from "./actionTypes";
import APIJSON from '../config/API.json';
import { ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';




const onCheckParticipant = async data => {
    const token = await AsyncStorage.getItem('userLoginToken');
    return fetch(APIJSON.API + 'participants/check', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(data)
})
.then((response) => response.json())
.then((json) => {
    if(json != null && json.errors != undefined) {
        ToastAndroid.show(json.errors.msg, ToastAndroid.SHORT);
        return false;
    } else if (json._id != undefined) {
        return json;
    }
      })
      .catch((error) => {
          console.log(error);
        // ToastAndroid.show(error, ToastAndroid.SHORT);
      });
}
const onCreateParticipant = async data => {
    const token = await AsyncStorage.getItem('userLoginToken');
    return fetch(APIJSON.API + 'participants', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(data)
})
.then((response) => response.json())
.then((json) => {
        if(json.errors != undefined) {
            ToastAndroid.show(json.errors.msg, ToastAndroid.SHORT);
            return false;
        } else if (json) {
            return json;
        }
      })
      .catch((error) => {
          console.log(error);
        // ToastAndroid.show(error, ToastAndroid.SHORT);
      });
};

export const createParticipant = (data, callback) => async dispatch => {
    //call api and dispatch action case
     checkParticipant(data);
    //  if(userExists._id != undefined){
    //      callback({ success: false });
    //  }
    //  else {
         const response = await onCreateParticipant(data);
    if (response._id != undefined) {
        callback({ success: true, apiResponse: response });
    } else {
        callback({ success: false });
     }
// }
};


export const checkParticipant = (data, callback) => async dispatch => {
    //call api and dispatch action case
     const userExists = await onCheckParticipant(data);
     if(userExists){
        callback({ success: true, apiResponse: userExists });
     }
     else {
        callback({ success: false });
    }
};
