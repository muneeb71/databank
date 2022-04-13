import {
    FilterBar,
    HeaderText,
    Price2Col,
    SafeAreaView,
    StatisticText3Col,
    TextInput,
    Button,
    NotFound,
    Icon
} from "@components";
import { BaseStyle, useTheme, Images } from "@config";
import { FTransactions } from "@data";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, View, RefreshControl, Image, Text } from "react-native";
import HeaderCard from "../FHome/HeaderCard";

export default function FCryptol01({ navigation }) {
    const { colors } = useTheme();
    const { t, i18n } = useTranslation();
    const [keyword, setKeyword] = useState(null);
    const [filter, setFilter] = useState({
        leftValue: false,
        centerValue: false,
        rightValue: true,
    });
    const [refreshing, setRefreshing] = useState(false);

    const route = useRoute();
    const item = route?.params?.item ?? { name: "Bitcoin" };
    const [transactions, setTransactions] = useState(FTransactions);
    useEffect(() => {
        if (route?.params?.item?.id) {
            setTransactions(
                transactions.filter((itemOld) => itemOld.id != item.id)
            );
        }
    }, [route?.params?.item]);

    const onChangeText = (text) => {
        setKeyword(text);
        setTransactions(FTransactions.filter((item) => {
            const name = item?.name?.toLowerCase();
            const code = item?.code?.toLowerCase();
            const textString = text?.toLowerCase?.();
            return name.includes(textString) || code.includes(textString);
        }));
    }

    const onFilterChange = value => {
        if(value.leftValue != filter.leftValue) {
            setTransactions(
                FTransactions.sort((a, b) => {
                    const aValue = parseFloat(a.marketCap.replaceAll(" B", ""));
                    const bValue = parseFloat(b.marketCap.replaceAll(" B", ""))
                    if(value.leftValue) {
                        return bValue - aValue;
                    } else {
                        return aValue - bValue;
                    }
                })
            );
        }
        if(value.centerValue != filter.centerValue) {
            setTransactions(
                FTransactions.sort((a, b) => {
                    const aValue = parseFloat(a.price.replaceAll("$", ""));
                    const bValue = parseFloat(b.price.replaceAll("$", ""))
                    if(value.centerValue) {
                        return bValue - aValue;
                    } else {
                        return aValue - bValue;
                    }
                })
            );
        }
        if(value.rightValue != filter.rightValue) {
            setTransactions(
                FTransactions.sort((a, b) => {
                    const x = a.isUp;
                    const y = b.isUp;
                    if(value.rightValue) {
                        return (x === y)? 0 : x? -1 : 1;
                    } else {
                        return (x === y)? 0 : x? 1 : -1;
                    }
                })
            );
        }
        setFilter(value);
        
    }

    return (
        <SafeAreaView
            style={BaseStyle.safeAreaView}
            edges={["right", "top", "left"]}
        >
            <HeaderText title={t("My Wallet")} />
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        paddingHorizontal: 20,
                        marginBottom: 20,
                        paddingTop: 10,
                    }}
                >
                  <HeaderCard onPress={() => navigation.navigate("FSendMoney")}/>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', padding: 15, borderRadius: 10, backgroundColor: colors.card }}>
                    <Image source={Images.qr} style={{ height: 80, width: 80 }} />
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ fontSize: 22, textWeight: 'bold', color: 'white' }}>Wallet Address</Text>
                        <Text style={{ color: 'white', opacity: 0.7, width: '100%', fontSize: 10 }}>0x1f8428bda682f3a39c077127df0f4d16bbaffbe0</Text>
                        <Button full style={{ height: 40, marginTop: 5 }}><Icon
                            name="clipboard"
                            size={20}
                            color={colors.text}
                            enableRTL={true}
                        /> Copy wallet</Button>
                    </View>
                </View>
                </View>
                <Text style={{ color: 'white', padding: 10, fontSize: 19, textWeight: 'bold', paddingHorizontal: 20, }}>Latest Transactions</Text>
                <FlatList
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            colors={[colors.primary]}
                            tintColor={colors.primary}
                            refreshing={refreshing}
                            onRefresh={() => {}}
                        />
                    }
                    data={transactions}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={<NotFound />}
                    renderItem={({ item, index }) => (
                        <Price2Col
                            key={index}
                            image={item.image}
                            code={item.code}
                            name={item.name}
                            costPrice={item.costPrice}
                            marketCap={item.marketCap}
                            percent={item.percent}
                            price={item.price}
                            isUp={item.isUp}
                            onPress={() =>
                                navigation.navigate("FCryptol02", {
                                    item: item,
                                    screen: "CMarket",
                                })
                            }
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    );
}
