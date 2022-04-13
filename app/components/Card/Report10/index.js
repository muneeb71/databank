import { Icon, Image, Text } from "@components";
import { Images, BaseColor, useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import ProgressBar from "@components/Progress/Bar";
import CircularProgress from "@components/Progress/Circle";

const CardReport10 = ({
    icon = "",
    style = {},
    size = 60,
    borderWidth = 5,
    datetime = '10 Mar 2022 07:15',
    name = "",
    price = "",
    onPress = () => { },
    percent = "0",
    backgroundIcon = "",
}) => {
    const { colors } = useTheme();
    return (
        <View style={{ width: '100%', height: 80, }}>
            <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
                <View
                    style={[
                        styles.image,
                        { backgroundColor: backgroundIcon || colors.primaryLight },
                    ]}
                >
                    <Icon
                        name={icon}
                        size={18}
                        style={{ color: BaseColor.whiteColor }}
                        solid
                    />
                </View>
                <View
                    style={{
                        paddingLeft: 15,
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <View  style={{ marginBottom: 10 }}>
                            <Text headline>
                                {name}
                            </Text>
                            <Text>{datetime}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <ProgressBar
                            style={{ flex: 1, paddingRight: 20 }}
                            percent={percent}
                        />
                    </View>
                </View>
                <CircularProgress
                    percentage={percent}
                    progressWidth={size / 2 - borderWidth}
                    size={size}
                    blankColor={BaseColor.text}
                    donutColor={colors.primaryLight}
                    fillColor={colors.background}
                >
                    <Text headline>{percent}%</Text>
                </CircularProgress>
            </TouchableOpacity>
        </View>
    );
};

CardReport10.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    icon: PropTypes.string,
    name: PropTypes.string,
    datetime : PropTypes.string, 
    percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onPress: PropTypes.func,
    backgroundIcon: PropTypes.string
};

export default CardReport10;
