import {
    Button,
    Header,
    Icon, ListSearchResult,
    PaymentItem, SafeAreaView, Text
} from "@components";
import { BaseStyle, useTheme, Images } from "@config";
import { FPaymentItemsData } from "@data";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Image } from "react-native";
import ModalChoosePayment from "./ModalChoosePayment";

const FBank = (props) => {
    const { navigation } = props;
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [item, setItem] = useState(FPaymentItemsData[0]);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView
            style={BaseStyle.safeAreaView}
            edges={["right", "top", "left"]}
        >
            <Header
                title={t("transfer_confirmation")}
                renderLeft={() => {
                    return (
                        <Icon
                            name="angle-left"
                            size={20}
                            color={colors.text}
                            enableRTL={true}
                        />
                    );
                }}
                onPressLeft={() => {
                    navigation.goBack();
                }}
            />

            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: 40, marginBottom: 20 }}>
                    <Image style={{ height: 130, width: 130 }} source={Images.logo}/>
                </View>
                <ListSearchResult
                    textLeft={t("send_to")}
                    textRight="0X823974CN8237NC29487C..."
                />
                <ListSearchResult
                    textLeft={t("From")}
                    textRight="0X823974CN8237NC29487C..."
                />
                <ListSearchResult
                    textLeft={t("Amount")}
                    textRight="1232"
                />
                <ListSearchResult
                    textLeft={t("Token")}
                    textRight="MVDG"
                />
                <ListSearchResult textLeft={t("fee")} textRight="$9.32 USD" />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingVertical: 15,
                    }}
                >
                    <Text headline style={{ textTransform: "uppercase" }}>
                        {t("total")}
                    </Text>
                    <Text headline primaryColor>
                        214.23 MVDG
                    </Text>
                </View>
                <Button
                    full
                    style={{ marginTop: 20 }}
                    onPress={() => navigation.navigate("FTransactionCompleted")}
                >
                    {t("confirm")}
                </Button>
            </View>
            <ModalChoosePayment
                option={item}
                options={FPaymentItemsData}
                isVisible={modalVisible}
                onSwipeComplete={() => {
                    setModalVisible(false);
                }}
                onChange={(item) => {
                    setItem(item);
                    setModalVisible(false);
                }}
            />
        </SafeAreaView>
    );
};

export default FBank;
