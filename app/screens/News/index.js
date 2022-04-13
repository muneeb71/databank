import {
    Header,
    NewsWishlist,
    SafeAreaView,
    Text,
    ModalFilter,
} from "@components";
import { BaseColor, BaseStyle, useTheme, Images } from "@config";
import { FavouriteData } from "@data";
import React, { Fragment, useEffect, useState} from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { useTranslation } from "react-i18next";
import styles from "./styles";
import { NewsActions } from "@actions";
 import { useDispatch } from "react-redux";
 import moment from "moment";



const sortOptionInit = [
    {
        value: "remove",
        icon: "sort-amount-up",
        text: "remove",
    },
    {
        value: "share_this_article",
        icon: "sort-amount-down",
        text: "share_this_article",
    },
    {
        value: "view_detail",
        icon: "sort-amount-up",
        text: "view_detail",
    },
    {
        value: "reset_all",
        icon: "sort-amount-up",
        text: "reset_all",
    },
];

const Favourite = (props) => {
    const { navigation } = props;
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [refreshing, setRefreshing] = useState(false);
    const [favourite, setFavourite] = useState(FavouriteData);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState(sortOptionInit);
    const [list, setList] = useState([]);
    const dispatch = useDispatch();
    const { getAllNews } = NewsActions;
    
    useEffect(() => {
        _getAllNews();
        console.log("Effect SuccessFull");
    }, []);
    
    const onSelectFilter = (selected) => {
        setSortOption(
            sortOption.map((item) => {
                return {
                    ...item,
                    checked: item.value == selected.value,
                };
            })
            );
        };
        
    function capitalize(s)
    {
        return s[0].toUpperCase() + s.slice(1);
    }
    async function _getAllNews() {
        setLoading(true);
    dispatch(
        getAllNews({}, (response) => {
            setLoading(false);
            if (response.success) {
                let newsData = [];
                if (response.apiResponse.length) {
                    response.apiResponse.forEach(news => {
                        const agoTime = moment(news.newsDate).fromNow();
                        const tags = news.newsTags.split(',');
                        const _tags = [];
                        tags.forEach((tag, index) => {
                            _tags.push({
                                id: index,
                                icon: 'wifi',
                              name: capitalize(tag)
                            });
                        });
                        newsData.push( {
                            id: news.id,
                            avatar: Images.profile2,
                            image: Images.newsMain,
                            name: news.title,
                            description: agoTime + " ",
                            title: news.title,
                            tags: _tags,
                          subtitle: "News",
                          date: news.createdAt,
                          content: news.description,
                        });
                    });
                    setList(newsData);
                    console.log(list);
                }
            }
        })
        );
    }
    const renderContent = () => {
       
        return (
            <View style={[{ flex: 1, paddingTop: 20 }]}>
                <View style={{ marginBottom: 16, paddingHorizontal: 20 }}>
                    <Text header bold>
                        {t("News")}
                    </Text>
                </View>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={list}
                
                    refreshControl={
                        <RefreshControl
                            colors={[colors.primary]}
                            tintColor={colors.primary}
                            refreshing={refreshing}
                            
                            onRefresh={() => _getAllNews()}
                        />
                    }
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) => (
                        <NewsWishlist
                            loading={loading}
                            image={item.image}
                            title={item.title}
                            subtitle={item.subtitle}
                            rate={item.rate}
                            onPress={() =>
                                navigation.navigate("NewsDetails", {
                                    item: item,
                                })
                            }
                        />
                    )}
                />
            </View>
        );
    };

    return (
        <SafeAreaView
            style={BaseStyle.safeAreaView}
            edges={['right', 'top', 'left']}
        >
            {renderContent()}
        </SafeAreaView>
    );
};

export default Favourite;
