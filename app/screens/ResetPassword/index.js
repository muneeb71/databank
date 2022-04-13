import { Button, Header, Icon, SafeAreaView, TextInput } from "@components";
import { BaseColor, BaseStyle, useTheme, Images } from "@config";
import React, { useState } from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { AuthActions } from "@actions";
import { useDispatch } from "react-redux";

const successInit = {
  email: true,
};
const { _ForgetPassword } = AuthActions;

const ResetPassword = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(successInit);

  const onReset = () => {
    if (email == "") {
      setSuccess({
        ...success,
        email: false,
      });
    } else {
      setLoading(true);
      dispatch(
        _ForgetPassword({ email }, (response) => {
          setLoading(false);
          if (response.success) {
            setTimeout(() => {
              navigation.navigate("ResetVerify", { email });
            }, 500);
          }
        })
      );
    }
  };

  
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t("reset_password")}
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
       <ScrollView style={{marginTop: '24%'}}>
       <View
          style={{
            alignItems: "center",
            padding: 20,
            width: "100%",
          }}
        >
          <View style={{paddingHorizontal: 10, width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
            <View>
              <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.text }}>Reset Password</Text>
              <Text style={{color: colors.text}}>Reset password via email</Text>
            </View>
            <Image source={Images.logo} style={{ height: 130, width: 130, marginLeft:10 }}/>
          </View>
       
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 65 }]}
            onChangeText={(text) => setEmail(text)}
            onFocus={() => {
              setSuccess({
                ...success,
                email: true,
              });
            }}
            autoCorrect={false}
            placeholder={t("email_address")}
            placeholderTextColor={
              success.email ? BaseColor.grayColor : colors.primary
            }
            value={email}
            selectionColor={colors.primary}
          />
          <View style={{ width: "100%" }}>
            <Button
              full
              style={{ marginTop: 20 }}
              onPress={() => {
                onReset();
              }}
              loading={loading}
            >
              {t("reset_password")}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;
