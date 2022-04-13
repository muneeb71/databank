import * as actionTypes from "./actionTypes";
import APIJSON from '../config/API.json';
import { ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const onLoginCheck = async data => {
    const token = AsyncStorage.setItem('userLoginToken');
    return fetch(APIJSON.API + 'token', {
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
        } else if (json.token) {
            return json;
        }
      })
      .catch((error) => {
          console.log(error);
        // ToastAndroid.show(error, ToastAndroid.SHORT);
      });
};

export const checkLogin = (login, callback) => async dispatch => {
    //call api and dispatch action case
    const response = await onLoginCheck(login);
    if (response != undefined && response.token) {
        callback({ success: true });
    } else {
        callback({ success: false });
    }
};


