import React from 'react';
import { View, Text, Image } from 'react-native';
import Modal from 'react-native-modal';
import tw from 'twrnc';

// App.js에서 props 변경해서 쓰기

// props: modalVisible, setModalVisible / borderColor, bgColor, image, textColor, text
export default function ButtonForm(props) {
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
                <Image source={props.image} style={tw`mr-4`}></Image>
                <Text style={textStyles}>{props.text}</Text>
            </View>
        </Modal>
    );
}
