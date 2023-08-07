import React, { useState } from "react";
import { View, Text, Image, Pressable, ScrollView, StyleSheet, Alert } from "react-native";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";

import InputForm from "@forms/InputForm";
import ButtonForm from "@forms/ButtonForm";

export default function Login1() {
    const nav = useNavigation();

    const [rectangle1, setRectangle1] = useState(require("@images/rectangle.png"));
    const [rectangle2, setRectangle2] = useState(require("@images/rectangle.png"));

    const checkRectangle1 = () => {
        if (rectangle1 === require("@images/rectangle.png")) {
            setRectangle1(require("@images/rectangle_checked.png"));
        } else {
            setRectangle1(require("@images/rectangle.png"));
        }
    }

    const checkRectangle2 = () => {
        if (rectangle2 === require("@images/rectangle.png")) {
            setRectangle2(require("@images/rectangle_checked.png"));
        } else {
            setRectangle2(require("@images/rectangle.png"));
        }
    }

    const goBack = () => {
        nav.goBack();
    }

    const onPressSignup = () => {
        Alert.alert("회원가입 로직 구현");
    }

    return (
        <View style={styles.container}>
            <View style={tw`flex-row items-center justify-between mt-6`}>
                <Pressable onPress={goBack} style={tw`flex-row items-center`}>
                    <Image source={require("@images/chevron_left.png")} style={tw`mx-2`}></Image>
                    <Text style={tw`text-[#F5F8F5] text-sm`}>로그인</Text>
                </Pressable>
                <Text style={tw`text-[#F5F8F5] text-lg`}>회원가입</Text>
                <View style={tw`flex-row`}>
                    <Image source={require("@images/chevron_left.png")} style={tw`mr-2 tint-[#3A3D52]`}></Image>
                    <Text style={tw`text-[#3A3D52] text-sm mr-2`}>로그인</Text>
                </View>
            </View>

            <Image source={require("@images/logo_small.png")} style={tw`self-center mt-10 mb-6`}></Image>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <InputForm image={require("@images/id.png")} placeholder={"아이디를 입력해주세요"}></InputForm>
                <InputForm image={require("@images/password.png")} placeholder={"비밀번호를 입력해주세요"} secureTextEntry={true}></InputForm>
                <InputForm image={require("@images/password.png")} placeholder={"비밀번호를 한 번 더 입력해주세요"} secureTextEntry={true}></InputForm>

                <View style={tw`flex-row items-center self-start ml-[5%]`}>
                    <Pressable onPress={checkRectangle1}><Image source={rectangle1} style={tw`mr-2`}></Image></Pressable>
                    <Text style={tw`text-[#ABABAB] text-sm underline`}>이용약관 (필수)</Text>
                </View>
                <View style={tw`flex-row items-center self-start ml-[5%]`}>
                    <Pressable onPress={checkRectangle2}><Image source={rectangle2} style={tw`mr-2`}></Image></Pressable>
                    <Text style={tw`text-[#ABABAB] text-sm underline`}>개인정보 처리 방침 (필수)</Text>
                </View>

                <ButtonForm borderColor="#ABABAB" textColor="#ABABAB" text={"가입하기"} onPress={onPressSignup}></ButtonForm>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "#3A3D52",
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: "space-around",
        alignItems: "center",
        paddingBottom: "60%",
    },
});
