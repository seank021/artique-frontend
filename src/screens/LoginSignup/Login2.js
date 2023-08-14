/* 
TODO:
1. 자동로그인 기능 구현
2. 로그인 로직 구현 --> 로그인 후 메인 페이지로 이동
3. 로그인 버튼 클릭 시 배경 흰색으로 변화
*/

import React, { useState } from "react";
import { View, Text, Image, Pressable, ScrollView, StyleSheet, Alert } from "react-native";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";

import InputForm from "@forms/InputForm";
import ButtonForm from "@forms/ButtonForm";

export default function Login1() {
    const nav = useNavigation();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const [rectangle, setRectangle] = useState(require("@images/rectangle.png"));

    const checkRectangle = () => {
        if (rectangle === require("@images/rectangle.png")) {
            setRectangle(require("@images/rectangle_checked.png"));
        } else {
            setRectangle(require("@images/rectangle.png"));
        }
    }

    const goBack = () => {
        nav.goBack();
    }

    const nullFunc = () => {
        return;
    }

    const onPressLogin = () => {
        Alert.alert("로그인 로직 구현");
    }

    const onPressChangePW = () => {
        nav.navigate("ChangePW1");
    }

    const onPressSignup = () => {
        nav.navigate("Signup1");
    }

    return (
        <View style={styles.container}>
            <View style={tw`flex-row items-center justify-between mt-5 mb-3`}>
                <Pressable onPress={goBack}><Image source={require("@images/x.png")} style={tw`ml-2`}></Image></Pressable>
                <Text style={tw`text-[#F5F8F5] text-lg`}>로그인</Text>
                <Image source={require("@images/x.png")} style={tw`mr-2 tint-[#3A3D52]`}></Image>
            </View>
            <View style={tw`border-solid border-b border-[#323546]`}></View>

            <Image source={require("@images/logo_small.png")} style={tw`self-center mt-7 mb-7`}></Image>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <InputForm image={require("@images/id.png")} placeholder={"아이디를 입력해주세요"} setValue={setId} compareValue={nullFunc}></InputForm>
                <InputForm image={require("@images/password.png")} placeholder={"비밀번호를 입력해주세요"} secureTextEntry={true} setValue={setPassword} compareValue={nullFunc}></InputForm>

                <View style={tw`w-[90%] flex-row items-center mt-2.5 mb-4.5`}>
                    <Pressable onPress={checkRectangle}><Image source={rectangle} style={tw`mr-2`}></Image></Pressable>
                    <Text style={tw`text-[#ABABAB] text-sm`}>자동로그인</Text>
                </View>

                <ButtonForm borderColor="#ABABAB" textColor="#ABABAB" text={"로그인"} onPress={onPressLogin}></ButtonForm>

                <View style={tw`w-[90%] flex-row justify-between self-center mt-4`}>
                    <Pressable onPress={onPressChangePW}><Text style={tw`text-[#ABABAB] text-sm`}>비밀번호 재설정</Text></Pressable>
                    <Pressable onPress={onPressSignup}><Text style={tw`text-[#ABABAB] text-sm`}>회원가입</Text></Pressable>
                </View>
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
        paddingBottom: "90%",
    },
});
