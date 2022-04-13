import { ApplicationActions } from "@actions";
import { AssistiveTouch } from "@components";
import { BaseSetting, useTheme } from "@config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { languageSelect } from "@selectors";
import * as Utils from "@utils";
import i18n from "i18next";
import React, { useEffect, useRef, useState } from "react";
import { initReactI18next } from "react-i18next";
import { Platform, StatusBar, View } from "react-native";
import { DarkModeProvider, useDarkMode } from "react-native-dark-mode";
import SplashScreen from "react-native-splash-screen";
import { useDispatch, useSelector } from "react-redux";
import { AllScreens, ModalScreens } from "./config";
const RootStack = createStackNavigator();
const MainStack = createStackNavigator();
import { StackActions } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainScreens = () => {
    return (
        <MainStack.Navigator
            // initialRouteName="SliderIntro"
            screenOptions={{
                headerShown: false,
               
            }}
        >
            {Object.keys(AllScreens).map((name, index) => {
                const { component, options } = AllScreens[name];
                return (
                    <MainStack.Screen
                        key={name}
                        name={name}
                        component={component}
                        options={options}
                    />
                );
            })}
        </MainStack.Navigator>
    );
};

const Navigator = (props) => {
    const { theme, colors } = useTheme();
    const isDarkMode = useDarkMode();
    const language = useSelector(languageSelect);
    const { navigation } = props;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const navigationRef = useRef(null);
    const [SliderIntroDisplay, setSliderIntroDisplay] = useState(false);
    // AsyncStorage.removeItem('SliderIntroDisplay');
    AsyncStorage.getItem('SliderIntroDisplay').then(flag => {
        if(!flag) {
            AsyncStorage.setItem('SliderIntroDisplay', true);
            flag = true;
        }
        setSliderIntroDisplay(flag);
    });
    useEffect(() => {
        // Config status bar
        if (Platform.OS == "android") {
            StatusBar.setBackgroundColor("black" , true);
        }
        StatusBar.setBarStyle(
            "light-content",
            true
        );
    }, [isDarkMode])

    useEffect(() => {
        // Hide screen loading
        SplashScreen.hide();
        
        const onProcess = async () => {
            // Get current language of device
            const languageCode = language ?? BaseSetting.defaultLanguage;
            dispatch(ApplicationActions.onChangeLanguage(languageCode));
            // Config language for app
            await i18n.use(initReactI18next).init({
                resources: BaseSetting.resourcesLanguage,
                lng: languageCode,
                fallbackLng: languageCode,
            });
            Utils.enableExperimental();
            setLoading(false);
            navigationRef?.current?.dispatch(
                StackActions.replace(SliderIntroDisplay ? "SliderIntro" : "SignIn")
            );
            // navigationRef?.current?.dispatch(
            //     StackActions.replace(intro ? "ProjectMenu" : "MaziHome")
            // );
        };
        onProcess();
    }, []);

    const goToApp = (name) => {
        navigationRef?.current?.navigate(name);
    };

    return (
        <View style={{ flex: 1, position: "relative" }}>
            <DarkModeProvider>
                <NavigationContainer theme={theme} ref={navigationRef}>
                    <RootStack.Navigator
                        
                        screenOptions={{
                            headerShown: false,
                            cardStyle: { backgroundColor: "transparent" },
                            cardOverlayEnabled: true,
                            cardStyleInterpolator: ({
                                current: { progress },
                            }) => ({
                                cardStyle: {
                                    opacity: progress.interpolate({
                                        inputRange: [0, 0.5, 0.9, 1],
                                        outputRange: [0, 0.25, 0.7, 1],
                                    }),
                                },
                                overlayStyle: {
                                    opacity: progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 0.5],
                                        extrapolate: "clamp",
                                    }),
                                },
                            }),
                        }}
                        mode="modal"
                    >
                        <RootStack.Screen
                            name="MainScreens"
                            component={MainScreens}
                            options={{ headerShown: false }}
                        />
                        {Object.keys(ModalScreens).map((name, index) => {
                            const { component, options } = ModalScreens[name];
                            return (
                                <RootStack.Screen
                                    key={name}
                                    name={name}
                                    component={component}
                                    options={options}
                                />
                            );
                        })}
                    </RootStack.Navigator>
                </NavigationContainer>
            </DarkModeProvider>
            {!loading && <AssistiveTouch goToApp={goToApp} />}
        </View>
    );
};

export default Navigator;
