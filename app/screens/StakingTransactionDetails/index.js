import { Header, Icon, SafeAreaView, TabSlider } from "@components";
import { BaseStyle, useTheme, BaseColor } from "@config";
import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View, Text, Image } from "react-native";
import LabelUpper2Row from "@components/Label/Upper2Row";
import { Images } from "../../config/images";
import CircularProgress from "@components/Progress/Circle";

export default function StakingTransactionDetails({ navigation }) {
    const route = useRoute();
    const item = route?.params?.item ?? { name: "Staking ", code: "ID232" };
    const { colors } = useTheme();
    const { t, i18n } = useTranslation();
    const CardReport10 = {
        icon: "",
        style: {},
        size: 220,
        borderWidth: 2,
        name: "",
        price: "",
        percent: 35,
        backgroundIcon: "",
    };
    return (
        <SafeAreaView
            style={BaseStyle.safeAreaView}
            edges={["right", "top", "left"]}
        >
            <Header
                title={`${item.name} (${item.code})`}
                renderLeft={() => {
                    return (
                        <Icon
                            name="angle-left"
                            size={20}
                            enableRTL={true}
                            color={colors.text}
                        />
                    );
                }}
                onPressLeft={() => {
                    navigation.goBack();
                }}
            />
           <View style={{ flex: 1 }}>
               <View style={{ alignItems: 'center', flexDirection: 'column', padding: 20 }}>
                    <Image source={Images.logo} style={{ height: 130, width: 130, position: 'absolute', marginTop: 60, zIndex: 100 }} />
                    <CircularProgress
                        style={{ height: 200, width: 200 }}
                        percentage={CardReport10.percent}
                        progressWidth={CardReport10.size / 2 - CardReport10.borderWidth}
                        size={CardReport10.size}
                        blankColor={BaseColor.text}
                        donutColor={colors.primaryLight}
                        fillColor={colors.primaryLight}
                    >
                    </CircularProgress>
               </View>
            <View style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                >
                    <View
                        style={{
                            marginBottom: 15,
                            paddingTop: 10,
                            paddingBottom: 10,
                        }}
                    >
                        <Text title3>{t("overview")}</Text>
                        <View
                            style={{
                                flexDirection: "row",
                                marginBottom: 10,
                                marginTop: 20,
                            }}
                        >
                            <LabelUpper2Row
                                style={{ flex: 1 }}
                                label={t("market_value")}
                                value="$997.39"
                            />
                            <LabelUpper2Row
                                style={{ flex: 1 }}
                                label={t("holdings")}
                                value="100B"
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginBottom: 10,
                            }}
                        >
                            <LabelUpper2Row
                                style={{ flex: 1 }}
                                label={t("net_cost")}
                                value="$99739"
                            />
                            <LabelUpper2Row
                                style={{ flex: 1 }}
                                label={t("avg_net_cost")}
                                value="$5000"
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginBottom: 10,
                            }}
                        >
                            <LabelUpper2Row
                                style={{ flex: 1 }}
                                label={t("profit_lost")}
                                value="-"
                            />
                            <LabelUpper2Row
                                style={{ flex: 1 }}
                                label={t("percent_change")}
                                value="-"
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
        </SafeAreaView>
    );
}
