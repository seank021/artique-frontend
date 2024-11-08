import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import tw from 'twrnc';

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

// props: borderColor, buttonColor, textColor, text, onPress
export function VerifyButtonForm(props) {
    const buttonStyles = {
        ...tw`w-[81px] h-[26px] rounded-3xl self-center justify-center items-center`,
        borderWidth: 1,
        borderColor: props.borderColor,
        backgroundColor: props.buttonColor,
    }

    const textStyles = {
        ...tw`text-sm font-semibold`,
        color: props.textColor,
    }

    return (
        <Pressable onPress={props.onPress} style={buttonStyles}>
            <Text style={textStyles}>{props.text}</Text>
        </Pressable>
    );
}