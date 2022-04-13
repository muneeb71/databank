import React, { Fragment, useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    StatusBar,
    Platform,
} from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import AppIntroSlider from "react-native-app-intro-slider";
import { Image, Text, Icon } from "@components";
import { Images, BaseColor, useTheme } from "@config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        padding: 10,
        justifyContent: "center",
    },
    titleStyle: {
        padding: 10,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
    },
    paragraphStyle: {
        padding: 20,
        textAlign: "center",
        fontSize: 16,
    },
    introImageStyle: {
        width: 200,
        height: 200,
    },
    introTextStyle: {
        fontSize: 18,
        color: "white",
        textAlign: "center",
        paddingVertical: 30,
    },
    introTitleStyle: {
        fontSize: 25,
        color: "white",
        textAlign: "center",
        marginBottom: 16,
        fontWeight: "bold",
    },
    buttonCircle: {
        width: 44,
        height: 44,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
      },
});

const slides = [
    {
        key: "s0",
        text: "Digital Data-Bank Center is Autonomous Digitisation center.",
        title: "Digital Data-Bank Center",
        icon: 'home',
        backgroundColor: BaseColor.orangeColor,
    },
    {
        key: "s1",
        text: "Safe and secure digital payment tools",
        title: "Crypto Wallet",
        icon: "wallet",
        backgroundColor: BaseColor.orangeColor,
    },
    {
        key: "s2",
        title: "Staking",
        text: "Stake your coins and earn good reward",
        icon: "bitcoin",
        backgroundColor: BaseColor.orangeColor,
    },
    {
        key: "s3",
        title: "Buy Coins",
        text: "Buy Coins using Ethereum and many other supported currencies.",
        icon: "cart-plus",
        backgroundColor: BaseColor.orangeColor,
    },
];

const SliderIntro = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();

    useEffect(() => {
        if (Platform.OS == "android") {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor("transparent", true);
        }
    }, []);

    const renderItem = ({ item }) => {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: item.backgroundColor,
                    alignItems: "center",
                    justifyContent: "space-around",
                    paddingBottom: 100,
                    paddingHorizontal: 20
                }}
            >
                <Text whiteColor title1>{item.title}</Text>
                {( ()=> {
                    if(item.title == 'Digital Data-Bank Center') {
                        return (
                            <Image
                            source={Images.RoundLogo}
                            style={{height: 200, width: 200, borderRadius: 100}}
                        />
                        );
                    } else {
                        return (
                            <Icon
                            name={item.icon}
                            color={BaseColor.whiteColor}
                            size={200}
                        />
                        );
                    }
                })()}
             
                {/* <Image style={styles.introImageStyle} source={item.image} /> */}
                <Text whiteColor body1 style={{ textAlign: "center" }}>
                    {item.text}
                </Text>
            </View>
        );
    };

    const onDone = () => {
        AsyncStorage.removeItem('SliderIntroDisplay');
        navigation.dispatch(StackActions.replace("Joining"));
    };

    const onSkip = () => {
        AsyncStorage.removeItem('SliderIntroDisplay');
        navigation.dispatch(StackActions.replace("Joining"));
    };

    const renderButton =
        (label = "") =>
        () => {
            return (
                <View style={styles.buttonCircle}>
                    <Text footnote whiteColor>{label}</Text>
                </View>
            );
        };

    return (
        <Fragment>
            <AppIntroSlider
                data={slides}
                renderItem={renderItem}
                onDone={onDone}
                showSkipButton={true}
                onSkip={onSkip}
                renderDoneButton={renderButton("Done")}
                renderNextButton={renderButton("Next")}
                renderSkipButton={renderButton("Skip")}
            />
        </Fragment>
    );
};

export default SliderIntro;
