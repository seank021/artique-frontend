import React from "react";
import { View, TextInput, Image } from "react-native";
import tw from "twrnc";

// props: image, placeholder, secureTextEntry, setValue(이후 수정)
export default function InputForm(props) {
    return (
        <View style={tw`flex flex-row border-solid border-b border-gray-400 w-[90%] self-center`}>
            <View style={tw`flex-row items-center`}>
                <Image source={props.image} style={tw`tint-[#F5F8F5] ml-10px mr-20px`}></Image>
                <TextInput
                    placeholder={props.placeholder}
                    // InputForm Text 변경시 props.setValue 함수에 담아주도록 변경
                    // onChangeText={(text) => {
                    //     props.setValue(text);
                    // }}
                    placeholderTextColor={"#ABABAB"}
                    secureTextEntry={props.secureTextEntry}
                    color={"#ABABAB"}
                ></TextInput>
            </View>
        </View>
    );
}
