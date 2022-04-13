import { AuthActions } from "@actions";
import {
  Button,
  Header,
  Icon,
  SafeAreaView,
  Text,
  TextInput,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { Images } from "@config";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { authentication, checkLogin } = AuthActions;
const successInit = {
  id: true,
  password: true,
};

const SignIn = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [active, setActive] = useState(true);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(successInit);
  const [message, setMessage] = useState('Hi there, how are you?');

  useEffect(() => {
    if(active) {
      //  AsyncStorage.removeItem('userLoginToken');
      setActive(false);
      onCheckLogin();
      console.log('trigger use effect hook');
    }
    setTimeout(() => {
      setMessage("I'm fine, thanks for asking.");
    }, 1000)
  })
  async function onCheckLogin() {
    const token = await AsyncStorage.getItem('userLoginToken');
    if (token) {
      setLoading(true);
      dispatch(
        checkLogin({token}, (response) => {
          setLoading(false);
          if (response.success) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'NewsMenu' }]
         })
          }
        })
      );
    }
  }

  const onLogin = () => {
    if (id == "" || password == "") {
      setSuccess({
        ...success,
        id: false,
        password: false,
      });
    } else {
      setLoading(true);
      dispatch(
        authentication({email: id, password}, (response) => {
          setLoading(false);
          if (response.success) {
            console.log(147852369);
             navigation.navigate("NewsMenu");
            navigation.reset({
              index: 0,
              routes: [{ name: 'NewsMenu' }]
         })
          }
        })
      );
    }
  };

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={offsetKeyboard}
        style={{
          flex: 1,
        }}
      >

        <View style={styles.contain}>
          <View style={{paddingHorizontal: 10, width: '100%', alignItems: 'center', justifyContent: 'space-between', marginBottom: 50, flexDirection: 'row'}}>
            <View>
              <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Login</Text>
              <Text>Login via Email / Phone</Text>
            </View>

            <Image source={Images.logo} style={{ height: 130, width: 130 }}/>
          </View>
          <TextInput
            style={[BaseStyle.textInput]}
            onChangeText={(text) => setId(text)}
            onFocus={() => {
              setSuccess({
                ...success,
                id: true,
              });
            }}
            autoCorrect={false}
            placeholder={t("email") + ' / ' + t('phone')}
            placeholderTextColor={
              success.id ? BaseColor.grayColor : colors.primary
            }
            value={id}
            selectionColor={colors.primary}
          />
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 10 }]}
            onChangeText={(text) => setPassword(text)}
            onFocus={() => {
              setSuccess({
                ...success,
                password: true,
              });
            }}
            autoCorrect={false}
            placeholder={t("Password")}
            secureTextEntry={true}
            placeholderTextColor={
              success.password ? BaseColor.grayColor : colors.primary
            }
            value={password}
            selectionColor={colors.primary}
          />
          <View style={{ width: "100%", marginVertical: 16 }}>
            <Button
              full
              loading={loading}
              style={{ marginTop: 20 }}
              onPress={onLogin}
            >
              {t("Login")}
            </Button>
          </View>
          <View style={styles.contentActionBottom}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ResetPassword")}
            >
              <Text body2 grayColor>
                {t("forgot_your_password")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text body2 primaryColor>
                {t("not_have_account")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
