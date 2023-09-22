import React from "react";
import { View, TextInput, Image } from "react-native";
import tw from "twrnc";

import { VerifyButtonForm } from "./ButtonForm";

// props: image, placeholder, secureTextEntry, setValue, compareValue, reappearButton / ifButton, borderColor, buttonColor, buttonTextColor, buttonText, onPressButton / ifCheck, ifX
export default function InputForm(props) {
    return (
        <View style={tw`flex flex-row justify-between items-center border-solid border-b border-[#ABABAB] w-[90%] mb-2`}>
            <View style={tw`flex-row items-center`}>
                <Image source={props.image} style={tw`tint-[#F5F8F5] ml-10px mr-20px w-[20px] h-[20px]`}></Image>
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
