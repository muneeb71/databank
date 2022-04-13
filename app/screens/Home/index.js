import {
    News43,
    NewsList,
    SafeAreaView,
    Text,
} from "@components";
import { BaseStyle, Images, useTheme } from "@config";
import {
    HomeChannelData,
    HomeListData,
    HomePopularData,
    HomeTopicData,
    PostListData,
} from "@data";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, RefreshControl, ScrollView, View } from "react-native";
import styles from "./styles";
import { NewsActions } from "@actions";
import { useDispatch } from "react-redux";
import moment from "moment";

const Home = (props) => {
    const { navigation } = props;
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const { getAllNews } = NewsActions;

    const goPost = (item) => () => {
        navigation.navigate("Post", { item: item });
    };

    const goPostDetail = (item) => () => {
        navigation.navigate("PostDetail", { item: item });
    };

    const goToCategory = () => {
        navigation.navigate("Category");
    };
   
    useEffect(() => {
        _getAllNews();
    }, []);

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
                      response.apiResponse.forEach(item => {
                        const agoTime = moment(item.newsDate).fromNow();
                        const tags = item.newsTags.split(',');
                        const _tags = [];
                        tags.forEach((tag, index) => {
                            _tags.push({
                                id: index,
                                icon: 'wifi',
                                name: capitalize(tag)
                            });
                        });
                        newsData.push( {
                            id: item.id,
                            avatar: Images.profile2,
                            image: Images.newsMain,
                            name: item.title,
                            description: agoTime + " ",
                            title: item.title,
                            tags: _tags,
                            subtitle: "News",
                            date: item.createdAt,
                            content: item.description,
                        });
                      });
                      setList(newsData);
                  }
              }
            })
          );
      }
    const renderContent = () => {
        const mainNews = list.length ? list[0] : [];
        return (
            <View>
                <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
                    <Text header bold>
                        {t("today")}
                    </Text>
                    <Text subhead grayColor style={{ marginTop: 5 }}>
                        {t("discover_last_news_today")}
                    </Text>
                </View>
                <ScrollView contentContainerStyle={styles.paddingSrollView} style={{marginBottom:75}}>
                    <News43
                        loading={loading}
                        onPress={goPostDetail(mainNews)}
                        style={{ marginTop: 5 }}
                        image={mainNews.image}
                        name={mainNews.name}
                        description={mainNews.description}
                        title={mainNews.title}
                    />
                    <FlatList
                        scrollEnabled={false}
                        contentContainerStyle={styles.paddingFlatList}
                        data={list}
                        refreshControl={
                            <RefreshControl
                                    colors={[colors.primary]}
                                    tintColor={colors.primary}
                                    refreshing={refreshing}
                                    onRefresh={() => _getAllNews()}
                                />
                        }
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <NewsList
                                loading={loading}
                                image={item.image}
                                title={item.title}
                                subtitle={item.subtitle}
                                date={item.date}
                                style={{
                                    marginBottom:
                                        index == list.length - 1 ? 0 : 15,
                                }}
                                onPress={goPostDetail(item)}
                            />
                        )}
                    />

     
                    
                </ScrollView>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                edges={["right", "top", "left"]}
            >
                {renderContent()}
            </SafeAreaView>
        </View>
    );
};

export default Home;
