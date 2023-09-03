import React from 'react';
import { View, Text, Image } from 'react-native';
import Modal from 'react-native-modal';
import tw from 'twrnc';

// App.js에서 props 변경해서 쓰기

// props: modalVisible, setModalVisible / borderColor, bgColor, image, textColor, text
export default function AlertForm(props) {
    const alertFormStyles = {
        ...tw`flex flex-row w-[90%] h-[54px] border-solid border-2 rounded-3xl self-center justify-center items-center`,
        borderColor: props.borderColor,
        backgroundColor: props.bgColor,
    }

    const textStyles = {
        ...tw`font-semibold text-lg`,
        color: props.textColor,
    }

    return (
        <Modal animationIn="fadeIn" animationOut="fadeOut" transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.5}>
            <View style={alertFormStyles}>
                {props.image === require("@images/check.png") ?
                    <Image source={require("@images/check.png")} style={tw`mr-4 w-[24px] h-[17.63637px]`}></Image> 
                    : <Image source={require("@images/x_red.png")} style={tw`mr-4 w-[19px] h-[19px]`}></Image>
                }
                <Text style={textStyles}>{props.text}</Text>
            </View>
        </Modal>
    );
}

// props: sortCriteria
export function AlertFormForSort(props) {
    return (
        <View>

        </View>
    )
}
