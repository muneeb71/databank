import {
    HeaderText,
    CardReport10,
    SafeAreaView,
} from "@components";
import { BaseStyle, useTheme, Images } from "@config";
import { FTransactions } from "@data";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, View, RefreshControl, Image, Text } from "react-native";
import HeaderCard from "../FHome/HeaderCard";
import { FChartItems } from "@data";

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
                
                </View>
                <Text style={{ color: 'white', padding: 10, fontSize: 19, textWeight: 'bold', paddingHorizontal: 20, }}>Latest Transactions</Text>
                <View style={{ padding: 15 }}>
                    {FChartItems.map((item, index) => (
                        <CardReport10
                            key={index}
                            icon={item.icon}
                            name={item.name}
                            datatime={item.datetime}
                            percent={item.percent}
                            price={item.price}
                            backgroundIcon={item.backgroundIcon}
                            onPress={() => navigation.navigate("StakingTransactionDetails")}
                        />
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}
