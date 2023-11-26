import React, { useState } from "react";
import { View, TextInput, Text, Image } from "react-native";
import tw from "twrnc";

import { VerifyButtonForm } from "./ButtonForm";

// props: image, placeholder, secureTextEntry, setValue, compareValue, reappearButton / ifButton, borderColor, buttonColor, buttonTextColor, buttonText, onPressButton / ifCheck, ifX
export default function InputForm(props) {
    return (
        <View style={tw`flex flex-row justify-between items-center border-solid border-b border-[#ABABAB] w-[90%] mb-2`}>
            <View style={[tw`flex-row items-center`, props.ifButton ? tw`w-[55%]` : tw`w-[80%]`]}>
                <Image source={props.image} style={tw`tint-[#F5F8F5] ml-[10px] mr-[20px] w-[20px] h-[20px]`}></Image>
                <TextInput placeholder={props.placeholder} onChangeText={(text) => { props.setValue(text); props.compareValue(text); props.reappearButton(text); }} placeholderTextColor={"#ABABAB"} secureTextEntry={props.secureTextEntry} color={"#ABABAB"} style={tw`h-40px`}></TextInput>
            </View>
            <>
                {props.ifButton ?
                    <VerifyButtonForm borderColor={props.borderColor} buttonColor={props.buttonColor} textColor={props.buttonTextColor} text={props.buttonText} onPress={props.onPressButton}></VerifyButtonForm>
                    : props.ifCheck ?
                        <Image source={require("@images/check.png")} style={tw`w-[16px] h-[11.75758px]`}></Image>
                        : props.ifX ?
                            <Image source={require("@images/x_red.png")} style={tw`w-[14px] h-[14px]`}></Image>
                            : null}
            </>
        </View>
    );
}

export function InputFormInPWChange(props) {
    return (
        <View style={tw`flex flex-row justify-between items-center border-solid border-b border-[#ABABAB] w-[90%] mb-2`}>
            <View style={tw`flex-row items-center`}>
                <Image source={props.image} style={tw`tint-[#ABABAB] ml-[10px] mr-[20px] w-[20px] h-[20px]`}></Image>
                <TextInput placeholder={props.placeholder} onChangeText={(text) => { props.setValue(text); props.compareValue(text); }} placeholderTextColor={"#B6B6B6"} secureTextEntry={props.secureTextEntry} color={"#191919"} style={tw`h-40px`}></TextInput>
            </View>
            <>
                {props.ifButton ?
                    <VerifyButtonForm borderColor={props.borderColor} buttonColor={props.buttonColor} textColor={props.buttonTextColor} text={props.buttonText} onPress={props.onPressButton}></VerifyButtonForm>
                    : props.ifCheck ?
                        <Image source={require("@images/check.png")} style={tw`w-[16px] h-[11.75758px]`}></Image>
                        : props.ifX ?
                            <Image source={require("@images/x_red.png")} style={tw`w-[14px] h-[14px]`}></Image>
                            : null}
            </>
        </View>
    );
}

// props: image, placeholder, setValue, reappearButton, inputCount, value, inputSize / ifWriting / ifButton, borderColor, buttonColor, buttonTextColor, buttonText, onPressButton / ifCheck / inputSizeColor
export function NicknameInputForm(props) {
    return (
        <View style={tw`flex flex-row justify-between items-center border-solid border-b border-[#CCCCCC] w-[90%] mb-2`}>
            <View style={tw`flex flex-row items-center ml-[5%]`}>
                <Image source={props.image} style={tw`tint-[#B6B6B6] mr-[20px] w-[18px] h-[18px]`}></Image>
                <TextInput 
                    maxLength={10} 
                    placeholder={props.placeholder} 
                    onChangeText={(text) => { props.setValue(text); props.reappearButton(text); props.inputCount(text, 'nickname');}}
                    placeholderTextColor={"#B6B6B6"} 
                    color={"#191919"} 
                    style={tw`h-[40px] text-[#191919] text-sm font-normal`}
                    value={props.value}>
                </TextInput>
            </View>
            <View style={tw`flex flex-row items-center`}>
                {props.ifWriting ?
                    <Text style={[
                        tw`text-[#B6B6B6] text-[10px] font-normal mr-[9px]`,
                        { color: props.inputSizeColor }]}>{ props.inputSize }/10
                    </Text>
                    : null}
                <View>
                    {props.ifButton ?
                        <VerifyButtonForm borderColor={props.borderColor} buttonColor={props.buttonColor} textColor={props.buttonTextColor} text={props.buttonText} onPress={props.onPressButton}></VerifyButtonForm>
                        : props.ifCheck ?
                            <Image source={require("@images/check.png")} style={tw`w-[16px] h-[11.75758px]`}></Image>
                            : null}
                </View>
            </View>
        </View>
    )
}

// props: image, placeholder, setValue, inputCount, value, inputSize / ifWriting / inputSizeColor
export function IntroduceInputForm(props) {
    return (
        <View style={tw`flex flex-row justify-between items-center border-solid border-b border-[#CCCCCC] w-[90%]`}>
            <View style={tw`flex flex-row items-center ml-[5%] w-[80%]`}>
                <Image source={props.image} style={tw`mr-[20px] w-[18px] h-[18px]`}></Image>
                <TextInput
                    maxLength={50}
                    placeholder={props.placeholder}
                    onChangeText={(text) => { props.setValue(text); props.inputCount(text, 'introduce'); }}
                    placeholderTextColor={"#B6B6B6"}
                    color={"#191919"}
                    style={[tw`shrink leading-[22px] text-[#191919] text-sm font-normal`]}
                    multiline={true}
                    value={props.value}
                    >
                </TextInput>
            </View>
            <View style={tw`mb-[10px]`}>
                {props.ifWriting ?
                    <Text style={[
                        tw`text-[#B6B6B6] text-[10px] leading-[22px] font-normal`,
                        { color: props.inputSizeColor }]}>
                        {props.inputSize}/50
                    </Text>
                    : null}
            </View>
        </View>
    )
}