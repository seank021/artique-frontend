import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import tw from 'twrnc';

// App.js에서 props 변경해서 쓰기
// onPress시 작동 함수 만들어서 쓰기 ex. navigate 등

// props: borderColor, bgColor, textColor, text, onPress / ifOpacity
export default function ButtonForm(props) {
    if (props.ifOpacity === true) {
        [opacityBorder, setOpacityBorder] = useState("#ABABAB");
        [opacityBg, setOpacityBg] = useState("#3A3D52");
        [textColor, setTextColor] = useState("#ABABAB");
    } else {
        [opacityBorder, setOpacityBorder] = useState(props.borderColor);
        [opacityBg, setOpacityBg] = useState(props.bgColor);
        [textColor, setTextColor] = useState(props.textColor);
    }

    const buttonStyles = {
        ...tw`w-[90%] h-[46px] border-solid border-2 rounded-3xl self-center justify-center items-center`,
        borderColor: opacityBorder,
        backgroundColor: opacityBg,
    }

    const textStyles = {
        ...tw`font-semibold text-lg`,
        color: textColor,
    }

    onPressIn = () => {
        if (props.ifOpacity) {
            setOpacityBorder("#F5F8F5");
            setOpacityBg("#F5F8F5");
            setTextColor("#191919");
        }
    }

    onPressOut = () => {
        if (props.ifOpacity) {
            setOpacityBorder("#ABABAB");
            setOpacityBg("#3A3D52");
            setTextColor("#ABABAB");
        }
    }

    return (
        <Pressable onPress={props.onPress} style={buttonStyles} ifOpacity={props.ifOpacity} onPressIn={onPressIn} onPressOut={onPressOut}>
            <Text style={textStyles}>{props.text}</Text>
        </Pressable>
    );
}

// props: borderColor, buttonColor, textColor, text, onPress / ifOpacity
export function VerifyButtonForm(props) {
    const [opacityBorder, setOpacityBorder] = useState("#ABABAB");
    const [opacityBg, setOpacityBg] = useState("#3A3D52");
    const [textColor, setTextColor] = useState("#ABABAB");

    const buttonStyles = {
        ...tw`w-[81px] h-[26px] rounded-3xl self-center justify-center items-center`,
        borderWidth: 1.5,
        borderColor: opacityBorder,
        backgroundColor: opacityBg,
    }

    const textStyles = {
        ...tw`text-sm`,
        color: textColor,
    }

    onPressIn = () => {
        setOpacityBorder("#F5F8F5");
        setOpacityBg("#F5F8F5");
        setTextColor("#191919");
    }

    onPressOut = () => {
        setOpacityBorder("#ABABAB");
        setOpacityBg("#3A3D52");
        setTextColor("#ABABAB");
    }

    return (
        <Pressable onPress={props.onPress} style={buttonStyles} onPressIn={onPressIn} onPressOut={onPressOut}>
            <Text style={textStyles}>{props.text}</Text>
        </Pressable>
    );
}