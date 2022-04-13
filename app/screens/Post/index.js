import {
    FilterSort,
    Header,
    Icon,
    Text,
    News169,
    News43,
    NewsGrid,
    NewsList,
    SafeAreaView,
} from "@components";
import { BaseColor, BaseStyle, useTheme, Images } from "@config";
// Load sample data
import { PostListData } from "@data";
import * as Utils from "@utils";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Platform, RefreshControl, View } from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { useNavigation, useRoute } from "@react-navigation/native";
// import { newsActions } from "@actions";
import { useDispatch } from "react-redux";
import { getAllEvents } from "../../actions/events";
import AsyncStorage from "@react-native-async-storage/async-storage";

const currentLocationInit = {
    latitude: null,
    longitude: null,
};

let timeoutChangeMode = null;

export const modes = {
    square: "square",
    bars: "bars",
    thList: "th-list",
    thLarge: "th-large",
};

const Post = ({ mode = modes.square, posts = PostListData }) => {


    const navigation = useNavigation();
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [refreshing, setRefreshing] = useState(false);
    const [modeView, setModeView] = useState(mode);
    const [currentLocation, setCurrentLocation] = useState(currentLocationInit);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollAnim = useRef(new Animated.Value(0)).current;
    const offsetAnim = useRef(new Animated.Value(0)).current;
   // const { getAllNews } = newsActions;
    const dispatch = useDispatch();

    const clampedScroll = useRef(
        Animated.diffClamp(
            Animated.add(
                scrollAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolateLeft: "clamp",
                }),
                offsetAnim
            ),
            0,
            40
        )
    ).current;

    async function _getAllEvents() {
        const token = await AsyncStorage.getItem('userLoginToken');
        if (token) {
          setLoading(true);
          dispatch(
            getAllEvents({token}, (response) => {
              setLoading(false);
              if (response.success) {
                  let eventsData = [];
                  if (response.apiResponse.length) {
                      response.apiResponse.forEach(item => {
                        eventsData.push( {
                            id: item._id,
                            avatar: Images.profile2,
                            image: Images.newsMain,
                            name: item.title,
                            description: "item",
                            title: item.title,
                            subtitle: "Event",
                            date: item.eventsDate,
                            content: item.description,
                        });
                      });
                      setList(eventsData);
                  }
              }
            })
          );
        }
      }
    
    useEffect(() => {
        _getAllEvents();
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const onChangeSort = () => {};

    /**
     * @description Open modal when filterring mode is applied
     * @author Passion UI <passionui.com>
     * @date 2019-09-01
     */
    const onFilter = () => {
        navigation.navigate("Filter");
    };

    /**
     * @description Open modal when view mode is pressed
     * @author Passion UI <passionui.com>
     * @date 2019-09-01
     */
    const onChangeView = () => {
        setLoading(true);
        clearTimeout(timeoutChangeMode);
        timeoutChangeMode = setTimeout(() => {
            setLoading(false);
        }, 1000);
        Utils.enableExperimental();
        let mode = "square";
        switch (modeView) {
            case "square":
                mode = "bars";
                break;
            case "bars":
                mode = "th-list";
                break;
            case "th-list":
                mode = "th-large";
                break;
            case "th-large":
                mode = "square";
                break;

            default:
                break;
        }
        setModeView(mode);
    };

    const getTotalCol = () => {
        switch (modeView) {
            case "square":
                return 1;
            case "bars":
                return 1;
            case "th-list":
                return 1;
            case "th-large":
                return 2;
            default:
                return 1;
        }
    };

    const goPostDetail = (item) => () => {
        navigation.navigate("EventDetails", { item: item });
    };

    const renderItem = ({ item, index }) => {
        switch (modeView) {
            case "square":
                return (
                    <News43
                        avatar={item.avatar}
                        loading={loading}
                        style={[ index+1 == list.length ? { marginBottom: 50 } : {} ,{ marginVertical: 8 }]}
                        name={item.name}
                        description={item.description}
                        title={item.title}
                        image={item.image}
                        onPress={goPostDetail(item)}
                    />
                );
            case "bars":
                return (
                    <News169
                        avatar={item.avatar}
                        loading={loading}
                        style={{ marginVertical: 8 }}
                        name={item.name}
                        description={item.description}
                        title={item.title}
                        image={item.image}
                        onPress={goPostDetail(item)}
                    />
                );

            case "th-list":
                return (
                    <NewsList
                        avatar={item.avatar}
                        loading={loading}
                        style={{ marginVertical: 8 }}
                        description={item.description}
                        title={item.title}
                        subtitle={item.subtitle}
                        date={item.date}
                        image={item.image}
                        onPress={goPostDetail(item)}
                    />
                );
            case "th-large":
                return (
                    <NewsGrid
                        avatar={item.avatar}
                        loading={loading}
                        style={{
                            paddingLeft: index % 2 == 0 ? 0 : 15,
                            paddingBottom: 15,
                        }}
                        image={item.image}
                        description={item.description}
                        title={item.title}
                        onPress={goPostDetail(item)}
                    />
                );
            default:
                break;
        }
    };
    console.log("modeView", modeView);
    const renderList = () => {
        const navbarTranslate = clampedScroll.interpolate({
            inputRange: [0, 40],
            outputRange: [0, -40],
            extrapolate: "clamp",
        });
        const android = Platform.OS == "android";
        return (
            <View style={{ flex: 1}}>
                <Animated.FlatList

                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    contentInset={{ top: 50 }}
                    contentContainerStyle={{
                        marginTop: android ? 10 : 0,
                        paddingHorizontal: 20,
                    }}
                    refreshControl={
                        <RefreshControl
                            colors={[colors.primary]}
                            tintColor={colors.primary}
                            refreshing={refreshing}
                            onRefresh={() => {}}
                        />
                    }
                    scrollEventThrottle={1}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        y: scrollAnim,
                                    },
                                },
                            },
                        ],
                        { useNativeDriver: true }
                    )}
                    data={list}
                    key={getTotalCol()}
                    numColumns={getTotalCol()}
                    keyExtractor={(item, index) => item.id}
                    renderItem={renderItem}
                />
                <Animated.View
                    style={[
                        styles.navbar,
                        { transform: [{ translateY: navbarTranslate }] },
                    ]}
                >
                </Animated.View>
            </View>
        );
    };

    return (
        <SafeAreaView
            style={BaseStyle.safeAreaView}
            edges={["right", "top", "left"]}
        >
             <View style={[{  paddingTop: 20 }]}>
                <View style={{ marginBottom: 16, paddingHorizontal: 20 }}>
                    <Text header bold>
                        {t("Events")}
                    </Text>
                </View>
                </View>
            {renderList()}
        </SafeAreaView>
    );
};

export default Post;
