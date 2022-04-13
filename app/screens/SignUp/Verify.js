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
};
const { _Verify, resendVerificationCode } = AuthActions;

const Verify = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState(props.route.params.email);
  const [success, setSuccess] = useState(successInit);
  const [loading, setLoading] = useState(false);

  const onVerify = () => {
    if (code == "" || email == "") {
      setSuccess({
        ...success,
        code: code != "" ? true : false,
        email: email != "" ? true : false,
      });
      ToastAndroid.show('Invalid request submission', ToastAndroid.SHORT);
    } else {
      setLoading(true);
      dispatch(
        _Verify({ email, verification_code: code }, (response) => {
          setLoading(false);
          if (response.success) {
            setTimeout(() => {
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
      <ScrollView style={{ marginTop: '24%' }}>
        <View style={styles.contain}>
          <View style={{ paddingHorizontal: 10, width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <View>
              <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>Register</Text>
              <Text style={{ color: 'white' }}>sign up will require verification</Text>
            </View>
            <Image source={Images.logo} style={{ height: 130, width: 130 }} />
          </View>
          {(() => {
            if (verified) {
              return (
                <View style={styles.contain}>
                   <View
                        style={{
                            margin: 40,
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: parseHexTransparency(
                                colors.primary,
                                30
                            ),
                        }}
                    >
                        <Icon name="check" size={48} color={colors.primary} />
                    </View>
                  <Text  body2 grayColor style={{ color: 'white' }}>
                    Great! Account registration completed.
                  </Text>
                  <Button
                      full
                      style={{ marginTop: 20 }}
                      loading={loading}
                      onPress={() => navigation.navigate('SignIn')}
                    >
                      {t("sign_in")}
                    </Button>
                </View>
              );
            } else {
              return (
                <View style={styles.contain}>
                  <TextInput
                    style={[BaseStyle.textInput, { marginTop: 65 }]}
                    onChangeText={(text) => setCode(text)}
                    autoCorrect={false}
                    placeholder={t("verification") + ' ' + t("code")}
                    placeholderTextColor={
                      success.code ? BaseColor.grayColor : colors.primary
                    }
                    value={code}
                  />
                  <View style={{ width: "100%" }}>
                    <TouchableOpacity style={{ marginTop: 10, }}
                      onPress={() => onResendVerificationCode()}
                    >
                      <Text body2 grayColor style={{ color: colors.primary }}>
                        {t("Resend verification code ? ")}
                      </Text>
                    </TouchableOpacity>
                    <Button
                      full
                      style={{ marginTop: 20 }}
                      loading={loading}
                      onPress={() => onVerify()}
                    >
                      {t("verify")}
                    </Button>
                  </View>
                </View>
              );
            }
          })()}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Verify;
