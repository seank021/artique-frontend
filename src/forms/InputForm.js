import React from "react";
import { View, TextInput, Image } from "react-native";
import tw from "twrnc";

// props: image, placeholder, secureTextEntry, setValue
export default function InputForm(props) {
    return (
        <View
        style={tw`flex flex-row justify-between border-solid border-b-2 border-gray-300 w-[90%] self-center`}
        >
        <View style={tw`flex-row items-center`}>
            <Image source={props.image} style={tw`tint-[#939393] mx-10px`}></Image>
            <TextInput
            placeholder={props.placeholder}
            // InputForm Text 변경시 props.setValue 함수에 담아주도록 변경
            onChangeText={(text) => {
                props.setValue(text);
            }}
            placeholderTextColor={"#6A6969"}
            secureTextEntry={props.secureTextEntry}
            ></TextInput>
        </View>
        </View>
    );
}
