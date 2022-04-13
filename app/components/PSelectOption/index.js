import { Icon, Tag, ModalOption } from "@components";
import { useTheme } from "@config";
import { EOptions } from "@data";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";


const PSelectOption = ({ title = "Type", options = EOptions, value = null, onPress = () => {}, isMulti = false }) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [option, setOption] = useState({});

    return (
        <Fragment>
            <Tag
                iconRight
                style={{ marginHorizontal: 5, padding: 15 }}
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                {`${title}${value.length > 0 ? ` (${value.length ? value.length : 'none'})  ` : value.text != undefined ?  ' ('+value.text+') ' : " "}`}
                <Icon name="chevron-down" color={colors.text} size={10} />
            </Tag>
            <ModalOption
                isMulti={isMulti}
                value={value}
                options={options}
                isVisible={modalVisible}
                onSwipeComplete={() => {
                    setModalVisible(false);
                }}
                onPress={(option) => {
                    onPress(option);
                    setModalVisible(false);
                }}
            />
        </Fragment>
    );
};

export default PSelectOption;
