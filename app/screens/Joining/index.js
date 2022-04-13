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
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Joining = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Hi there, how are you?');

  useEffect(() => {
    if(active) {
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
      onLogin();
    }
  }

  const onLogin = (type) => {
    navigation.navigate('SignUp', { type });
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
        <View style={{ padding: 20, marginTop: 50,}}>
          <View style={{ padding: 10, alignItems: 'center' }}>
            <Image source={Images.logo} style={{ height: 130, width: 130 }}/>
            <View style={{ marginTop: 50, width: '100%' }}>
              <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Join</Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Digital Data-Bank Center</Text>
            </View>

          </View>
          
          <View style={{ marginVertical: 50,  }}>
            <Text style={{ color: colors.text }}>
              Who are you ?
            </Text>
            <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                outline
                loading={loading}
                style={{ marginTop: 20, width: 180 }}
                onPress={() => onLogin(1)}
              >
                {t("INDIVIDUAL")}
              </Button>
              <Button
                full
                loading={loading}
                style={{ marginTop: 20, width: 180 }}
                onPress={() => onLogin(2)}
              >
                {t("GROUP")}
              </Button>
            </View>
          </View>
          
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Joining;
