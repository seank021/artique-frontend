import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'twrnc';

// App.js에서 props 변경해서 쓰기

// props: borderColor, bgColor, image, textColor, text
export default function ButtonForm(props) {
    const buttonStyles = {
        ...tw`flex flex-row w-[90%] h-[54px] border-solid border-2 rounded-3xl self-center justify-center items-center`,
        borderColor: props.borderColor,
        backgroundColor: props.bgColor,
    }

    const textStyles = {
        ...tw`font-semibold text-lg`,
        color: props.textColor,
    }

    return (
        <View style={buttonStyles}>
            <Image source={props.image} style={tw`mr-4`}></Image>
            <Text style={textStyles}>{props.text}</Text>
        </View>
    );
}
