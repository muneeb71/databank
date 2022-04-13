import {
    CardSlide,
    Header,
    Icon,
    Image,
    NewsList,
    SafeAreaView,
    StarRating,
    Tag,
    Text,
    Button
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { Images } from "@config";
import { HomeListData, HomePopularData } from "@data";
import * as Utils from "@utils";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Animated,
    FlatList,
    I18nManager,
    ScrollView,
    Share,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import styles from "./styles";
import { PlaceholderLine, Placeholder } from "@components";
import {email} from "@screens/SignUp";
import { ParticipantActions } from "@actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";


const facilitiesInit = [
    { id: "1", icon: "wifi", name: "News", checked: true },
    { id: "2", icon: "bath", name: "Impeachment" },
    { id: "3", icon: "paw", name: "West Bank" },
    { id: "4", icon: "bus", name: "Donald Trump" },
    { id: "5", icon: "cart-plus", name: "Corona Virus" },
    { id: "6", icon: "clock", name: "White House" },
];

const { createParticipant, checkParticipant } = ParticipantActions;
const EventDetails = (props) => {
    const { navigation, route } = props;
    const { t } = useTranslation();
    const { colors } = useTheme();
    const item = route?.params?.item || HomeListData[0];
    const [loading, setLoading] = useState(true);
    const [popular, setPopular] = useState(HomePopularData);
    const [list, setList] = useState(HomeListData);
    const [IsParticipated, setIsParticipated] = useState(true);
    const [userEmail, setUserEmail] = useState(email);
    const dispatch = useDispatch();
    const [facilities, setFacilities] = useState(route.params.item.tags);
    const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
    const scrollY = useRef(new Animated.Value(0)).current;
    const { id, image, title, subtitle, date, content } = item;
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if(isActive) {
             _checkParticipant();
          //  setIsActive(false);
            setLoading(false);
        }
    }, []);

    const goEventDetails = (item) => () => {
        navigation.push("EventDetails", { item: item });
    };

    async function _checkParticipant(){
        const token = await AsyncStorage.getItem('userLoginToken');
        if (token) {
            const _loggedUser = await AsyncStorage.getItem('loggedUser');
            const loggedUser = JSON.parse(_loggedUser);
          setLoading(true);
          dispatch(
            checkParticipant({userId: loggedUser._id, eventId: id}, (response) => {
              setLoading(false);
              if (response.success) {
               setIsParticipated(true);
              }
              else{
                setIsParticipated(false);
              }
            })
          );
        }
    }
    async function onParticipate(){
        const token = await AsyncStorage.getItem('userLoginToken');
        if (token) {
            const _loggedUser = await AsyncStorage.getItem('loggedUser');
            const loggedUser = JSON.parse(_loggedUser);
          setLoading(true);
          dispatch(
            createParticipant({userId: loggedUser._id, eventId: id}, (response) => {
              setLoading(false);
              if (response.success) {
                setIsParticipated(true);
                ToastAndroid.show("Participated", ToastAndroid.SHORT);
              }
            })
          );
        }
    }

    //For header background color from transparent to header color
    const headerBackgroundColor = scrollY.interpolate({
        inputRange: [0, 140],
        outputRange: [BaseColor.whiteColor, colors.primary],
        extrapolate: "clamp",
        useNativeDriver: true,
    });

    //For header image opacity
    const headerImageOpacity = scrollY.interpolate({
        inputRange: [0, 250 - heightHeader - 20],
        outputRange: [1, 0],
        extrapolate: "clamp",
        useNativeDriver: true,
    });

    //artist profile image position from top
    const heightViewImg = scrollY.interpolate({
        inputRange: [0, 250 - heightHeader],
        outputRange: [250, heightHeader],
        // extrapolate: "clamp",
        useNativeDriver: true,
    });

    const renderPlaceholder = () => {
        let holders = Array.from(Array(5));

        return (
            <Placeholder>
                <View style={{ padding: 20 }}>
                    {holders.map((item, index) => (
                        <PlaceholderLine key={index} width={100} />
                    ))}
                </View>
            </Placeholder>
        );
    };

    const renderContent = () => {
        return (
            <Fragment>
                <View style={styles.contentDescription}>
                    <Text
                        body2
                        style={{
                            lineHeight: 20,
                            paddingTop: 10,
                            paddingBottom: 20,
                        }}
                        numberOfLines={100}
                    >
                        {content}
                    </Text>
                </View>
            </Fragment>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView
                style={[BaseStyle.safeAreaView]}
                forceInset={{ top: "always", bottom: "always" }}
            >
                <Header title={title} />
                <ScrollView
                    onContentSizeChange={() => {
                        setHeightHeader(Utils.heightHeader());
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    overScrollMode={"never"}
                    style={{ zIndex: 10 }}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: { y: scrollY },
                                },
                            },
                        ],
                        {
                            useNativeDriver: false,
                        }
                    )}
                >
                    <View style={{ height: 230 - heightHeader }} />
                    <View
                        style={{
                            marginVertical: 10,
                            paddingHorizontal: 20,
                        }}
                    >
                        <Text medium caption1 grayColor>
                            {date}
                        </Text>
                        <Text title1 semibold style={{ marginVertical: 10 }}>
                            {title}
                        </Text>
                    </View>
                    {loading ? renderPlaceholder() : renderContent()}
                </ScrollView>
                <View style={{ width: "100%", marginVertical: 16 }}>
                    {(() => {
                        if(!IsParticipated && !loading){
                            return (
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    <Button
                                        full
                                        loading={loading} 
                                        style={{  width: 200, height:50, }}
                                        onPress = {() => {
                                            onParticipate()
                                            }}   
                                        >
                                        {t("Participate")}
                                    </Button>
                                </View>
                            );
                        }
                        else if(!loading) {
                            return(
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    <Button
                                        full
                                        loading={loading} 
                                        disabled={true}
                                        style={{  width: 200, height:50, backgroundColor: 'gray' }}
                                        >
                                        {t("Participated")}
                                    </Button>
                                </View>
                            );
                        }
                    })()}
                </View>
            </SafeAreaView>
            <Animated.View
                style={[
                    styles.headerImageStyle,
                    {
                        opacity: headerImageOpacity,
                        height: heightViewImg,
                    },
                ]}
            >
                <Image
                    source={image}
                    style={{ height: "100%", width: "100%" }}
                />
            </Animated.View>
            <Animated.View
                style={[styles.headerStyle, { position: "absolute" }]}
            >
                <SafeAreaView
                    style={{ width: "100%" }}
                    forceInset={{ top: "always", bottom: "never" }}
                >
                    <Header
                        title=""
                        renderLeft={() => {
                            return (
                                <Animated.Image
                                    resizeMode="contain"
                                    style={[
                                        styles.icon,
                                        {
                                            transform: [
                                                {
                                                    scaleX: I18nManager.isRTL
                                                        ? -1
                                                        : 1,
                                                },
                                            ],
                                            tintColor: headerBackgroundColor,
                                        },
                                    ]}
                                    source={Images.angleLeft}
                                />
                            );
                        }}
                        onPressLeft={() => {
                            navigation.goBack();
                        }}
                    />
                </SafeAreaView>
            </Animated.View>
        </View>
    );
};

export default EventDetails;
