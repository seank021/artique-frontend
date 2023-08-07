import React from 'react';
import { Pressable, Text } from 'react-native';
import tw from 'twrnc';

// App.js에서 props 변경해서 쓰기
// onPress시 작동 함수 만들어서 쓰기 ex. navigate 등

// props: borderColor, bgColor, textColor, text, onPress
export default function ButtonForm(props) {
    const buttonStyles = {
        ...tw`w-[90%] h-[46px] border-solid border-2 rounded-3xl self-center justify-center items-center`,
        borderColor: props.borderColor,
        backgroundColor: props.bgColor,
    }

    const textStyles = {
        ...tw`font-semibold text-lg`,
        color: props.textColor,
    }

    return (
        <Pressable onPress={props.onPress} style={buttonStyles}>
            <Text style={textStyles}>{props.text}</Text>
        </Pressable>
    );
}