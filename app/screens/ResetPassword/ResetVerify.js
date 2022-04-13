import { Button, Header, Icon, SafeAreaView, TextInput } from "@components";
import { BaseColor, BaseStyle, useTheme, Images } from "@config";
import React, { useState } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity, ToastAndroid } from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AuthActions } from "@actions";
import { parseHexTransparency } from "@utils";

const successInit = {
  code: true,
  email: true,
  password: true,
  confirmPassword: true,

};
const { _Verify, OTPVerify, setNewPassword, resendVerificationCode } = AuthActions;

const ResetVerify = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [resetDone, setDone] = useState(false);
  const [email, setEmail] = useState(props.route.params.email);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(successInit);
  const [loading, setLoading] = useState(false);

  const onVerify = () => {
    if (code == "" || password == "") {
      setSuccess({
        ...success,
        code: code != "" ? true : false,
        password: password != "" ? true : false,
      });
      ToastAndroid.show('Invalid request submission', ToastAndroid.SHORT);
    } else {
      setLoading(true);
      dispatch(
        OTPVerify({ password, id: code }, (response) => {
          setLoading(false);
          if (response.success) {
            setTimeout(() => {
              setLoading(false);
              ToastAndroid.show('Password Reset Successful', ToastAndroid.SHORT);
             navigation.navigate('SignIn')
            }, 500);
          }
        })
      );

    }
  };


  const onSetNewPassword = () => {
    if (password == "" || confirmPassword == "") {
      setSuccess({
        ...success,
        password: password != "" ? true : false,
        confirmPassword: confirmPassword != "" ? true : false,
      });
      ToastAndroid.show('Invalid request submission', ToastAndroid.SHORT);
    } else {
      console.log({ email, password, confrim_password: confirmPassword, token });
      setLoading(true);
      dispatch(
        setNewPassword({ email, password, confirm_password: confirmPassword, token }, (response) => {
          setLoading(false);
          if (response.success) {
            setTimeout(() => {
              setDone(true);
              setLoading(false);
              setVerified(true);
            }, 500);
          }
        })
      );

    }
  };

  

  const onResendVerificationCode = () => {
    if (email == "") {
      setSuccess({
        ...success,
        email: email != "" ? true : false,
      });
      ToastAndroid.show('Invalid request submission', ToastAndroid.SHORT);
    } else {
      setLoading(true);
      dispatch(
        resendVerificationCode({ email }, (response) => {
          setLoading(false);
          if (response.success) {
            setTimeout(() => {
              ToastAndroid.show('Verification code sent', ToastAndroid.SHORT);
              setLoading(false);
              setVerified(false);
            }, 500);
          }
        })
      );

    }
  };



  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t("sign_up")}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView style={{ marginTop: '24%', padding: 20 }}>
        <View style={styles.contain}>
          <View style={{ paddingHorizontal: 10, width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <View>
              <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>Change password</Text>
              <Text style={{ color: 'white' }}>Verification will be required</Text>
            </View>
            <Image source={Images.logo} style={{ height: 130, width: 130, marginLeft:10 }} />
          </View>
         
            <View style={styles.contain}>
              <TextInput
                style={[BaseStyle.textInput, { marginTop: 65 }]}
                onChangeText={(text) => setCode(text)}
                autoCorrect={false}
                placeholder={t("Verification") + ' ' + t("code")}
                placeholderTextColor={
                  success.code ? BaseColor.grayColor : colors.primary
                }
                value={code}
              />
              <TextInput
                style={[BaseStyle.textInput, { marginTop: 25 }]}
                onChangeText={(text) => setPassword(text)}
                autoCorrect={false}
                placeholder={t("New") + ' ' + t("Password")}
                placeholderTextColor={
                  success.code ? BaseColor.grayColor : colors.primary
                }
                value={password}
              />
               <TextInput
                    style={[BaseStyle.textInput, { marginTop: 20 }]}
                    onChangeText={(text) => setConfirmPassword(text)}
                    autoCorrect={false}
                    placeholder={t("Confirm") + ' ' + t("password") }
                    placeholderTextColor={
                      success.setConfirmPassword ? BaseColor.grayColor : colors.primary
                    }
                    value={confirmPassword}
                  />
              <View style={{ width: "100%" }}>
                
                <Button
                  full
                  style={{ marginTop: 20 }}
                  loading={loading}
                  onPress={() => {
                    if(password == confirmPassword){
                      onVerify()
                    }
                    else{
                      ToastAndroid.show('Password Does Not Match', ToastAndroid.SHORT);
                       }
                   }
                    }
                >
                  {t("verify")}
                </Button>
              </View>
            </View>
             
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetVerify;
