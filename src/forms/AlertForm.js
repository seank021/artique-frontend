import React from 'react';
import { View, Text, Image, Modal } from 'react-native';
import tw from 'twrnc';

// App.js에서 props 변경해서 쓰기

// props: modalVisible, setModalVisible / borderColor, bgColor, image, textColor, text
export default function ButtonForm(props) {
    const alertFormStyles = {
        ...tw`flex flex-row w-[90%] h-[54px] border-solid border-2 rounded-3xl self-center justify-center items-center`,
        borderColor: props.borderColor,
        backgroundColor: props.bgColor,
        top: "80%",
    }

    const textStyles = {
        ...tw`font-semibold text-lg`,
        color: props.textColor,
    }

    return (
        <Modal animationType="none" transparent={true} visible={props.modalVisible} onRequestClose={()=>{props.setModalVisible(!props.modalVisible)}}>
            <View style={alertFormStyles}>
                <Image source={props.image} style={tw`mr-4`}></Image>
                <Text style={textStyles}>{props.text}</Text>
            </View>
        </Modal>
    );
}
