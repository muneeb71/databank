import * as actionTypes from "./actionTypes";
import APIJSON from '../config/API.json';
import { ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const onLogin = data => {
    return fetch(APIJSON.API + 'login', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((json) => {
        if(json.errors != undefined) {
            ToastAndroid.show(json.errors.msg, ToastAndroid.SHORT);
            return false;
        } else {
            return json;
        }
      })
      .catch((error) => {
          console.log(error);
        // ToastAndroid.show(error, ToastAndroid.SHORT);
      });
};

export const authentication = (login, callback) => async dispatch => {
    //call api and dispatch action case
    const response = await onLogin(login);
    if (response != undefined && response.token) {
        AsyncStorage.setItem('userLoginToken', response.token);
        AsyncStorage.setItem('loggedUser', JSON.stringify(response.user));
        callback({ success: true });
    } else {
        callback({ success: false });
    }
};

const onLoginCheck = async data => {
    const token = await AsyncStorage.getItem('userLoginToken');
    return fetch(APIJSON.API + 'token', {
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
    console.log("login check true");
    if (response != undefined && response.token) {
        callback({ success: true });
    } else {
        callback({ success: false });
    }
};




const onSignup = data => {
    return fetch(APIJSON.API + 'register', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((json) => {
        if(json.errors != undefined) {
            console.log(json.errors.msg);
            if(Array.isArray(json.errors.msg)){
                ToastAndroid.show(json.errors.msg[0].msg, ToastAndroid.SHORT);
            }
            else{
                ToastAndroid.show(json.errors.msg, ToastAndroid.SHORT);
            }
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

export const register = (data, callback) => async dispatch => {
    //call api and dispatch action case
    const response = await onSignup(data);
    if (response != undefined && response.token) {
        AsyncStorage.setItem('userLoginToken', response.token);
        callback({ success: true });
       
    } else {
        callback({ success: false });
    }
};


const onVerify = data => {
    return fetch(APIJSON.API + 'verify', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((json) => {
        if(json.errors != undefined) {
            if(Array.isArray(json.errors.msg)){
                ToastAndroid.show(json.errors.msg[0].msg, ToastAndroid.SHORT);
            }
            else{
                ToastAndroid.show(json.errors.msg, ToastAndroid.SHORT);
            }
            return false;
        } else if (json.verified) {
            return json;
        }
      })
      .catch((error) => {
          console.log(error);
        // ToastAndroid.show(error, ToastAndroid.SHORT);
      });
};

export const _Verify = (data, callback) => async dispatch => {
    //call api and dispatch action case
    const response = await onVerify(data);
    if (response != undefined && response.verified) {
        callback({ success: true });
    } else {
        callback({ success: false });
    }
};

const onForgetPassword = data => {
    return fetch(APIJSON.API + 'forgot', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((json) => {
        if(json.errors != undefined) {
            ToastAndroid.show(json.errors.msg, ToastAndroid.SHORT);
            return false;
        } else if (json.verification) {
            return json;
        }
      })
      .catch((error) => {
          console.log(error);
        // ToastAndroid.show(error, ToastAndroid.SHORT);
      });
};

export const _ForgetPassword = (data, callback) => async dispatch => {
    //call api and dispatch action case
    const response = await onForgetPassword(data);
    if (response != undefined && response.verification) {
        callback({ success: true });
    } else {
        callback({ success: false });
    }
};


const onOTPVerification = data => {
    return fetch(APIJSON.API + 'reset', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((json) => {
        console.log(data);
        // console.log(json);
        if(json.errors != undefined && json.errors.msg) {
            if(Array.isArray(json.errors.msg)){
                ToastAndroid.show(json.errors.msg[0].msg, ToastAndroid.SHORT);
            }
            else{
                ToastAndroid.show(json.errors.msg, ToastAndroid.SHORT);
            }
            return false;
        } else if (json.msg == 'PASSWORD_CHANGED') {
            return json;
        }
      })
      .catch((error) => {
          console.log(error);
        // ToastAndroid.show(error, ToastAndroid.SHORT);
      });
};

export const OTPVerify = (data, callback) => async dispatch => {
    //call api and dispatch action case
    const response = await onOTPVerification(data);
    if (response != undefined && response.msg) {
        callback({ success: true});
    } else {
        callback({ success: false });
    }
};

// 

const onSetNewPassword = data => {
    return fetch(APIJSON.API + 'reset', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((json) => {
        if(json.errors != undefined) {
            ToastAndroid.show(json.errors.msg, ToastAndroid.SHORT);
            return false;
        } else if (json.msg == 'PASSWORD_CHANGED') {
            return json;
        }
      })
      .catch((error) => {
          console.log(error);
        // ToastAndroid.show(error, ToastAndroid.SHORT);
      });
};

export const setNewPassword = (data, callback) => async dispatch => {
    //call api and dispatch action case
    const response = await onSetNewPassword(data);
    if (response.msg != undefined && response.msg == 'PASSWORD_CHANGED') {
        callback({ success: true });
    } else {
        callback({ success: false });
    }
};

const onResendVerificationCode = data => {
    return fetch(APIJSON.API + 'resend_email', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        if(json.response != undefined && json.status_code != 200) {
            ToastAndroid.show(json.response.error, ToastAndroid.SHORT);
            return false;
        } else if (json.status_code == 200) {
            return json.response;
        }
      })
      .catch((error) => {
          console.log(error);
        // ToastAndroid.show(error, ToastAndroid.SHORT);
      });
};

export const resendVerificationCode = (data, callback) => async dispatch => {
    //call api and dispatch action case
    const response = await onResendVerificationCode(data);
    if (response != undefined && response) {
        callback({ success: true });
    } else {
        callback({ success: false });
    }
};