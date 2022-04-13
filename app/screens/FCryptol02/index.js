import { Header, Icon, SafeAreaView, TabSlider } from "@components";
import { BaseStyle, useTheme } from "@config";
import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View, Text } from "react-native";
import LabelUpper2Row from "@components/Label/Upper2Row";

export default function FCryptol01({ navigation }) {
    const route = useRoute();
    const item = route?.params?.item ?? { name: "Bitcoin", code: "BTC" };
    const { colors } = useTheme();
    const { t, i18n } = useTranslation();
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
