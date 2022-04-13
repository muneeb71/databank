import * as actionTypes from "./actionTypes";
import APIJSON from '../config/API.json';
import { ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';



const onGetAllEvents = async data => {
    const token = await AsyncStorage.getItem('userLoginToken');
    console.log(token, 123);
    return fetch(APIJSON.API + 'events/all', {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
    },
    body: null
})
.then((response) => response.json())
.then((json) => {
        if(json.errors != undefined) {
            ToastAndroid.show(json.errors.msg, ToastAndroid.SHORT);
            return false;
        } else if (Array.isArray(json)) {
            return json;
        }
      })
      .catch((error) => {
          console.log(error);
        // ToastAndroid.show(error, ToastAndroid.SHORT);
      });
};

export const getAllEvents = (data, callback) => async dispatch => {
    //call api and dispatch action case
    const response = await onGetAllEvents(data);
    if (response.length != undefined) {
        callback({ success: true, apiResponse: response });
    } else {
        callback({ success: false });
    }
};