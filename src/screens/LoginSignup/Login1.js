/* 
TODO:
1. 로그인 전 둘러보기 버튼 누르면 메인 페이지로 이동
2. 소셜로그인 구현
*/

import React from "react";
import { View, Text, Image, Pressable, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";

import ButtonForm from "@forms/ButtonForm";

export default function Login1() {
    const nav = useNavigation();

    onPressLookAround = () => {
        Alert.alert("로그인 전 둘러보기: 메인 페이지로");
    }

    onPressLogin = () => {
        nav.navigate("Login2");
    }

    onPressKakao = () => {
        Alert.alert("카카오 로그인 구현");
    }

    onPressGoogle = () => {
        Alert.alert("구글 로그인 구현");
    }

    onPressApple = () => {
        Alert.alert("애플 로그인 구현");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={tw`h-[60%] items-center justify-center`}>
                <Image source={require("@images/logo.png")} />
            </View>

            <View style={tw`h-[10%]`}>
                <ButtonForm borderColor="#E94A4B" textColor="#F5F5F5" text="로그인 전 둘러보기" onPress={onPressLookAround}></ButtonForm>
            </View>
            <View style={tw`h-[10%]`}>
                <ButtonForm borderColor="#E94A4B" bgColor="#E94A4B" textColor="#F5F5F5" text="로그인" onPress={onPressLogin}></ButtonForm>
            </View>
            
            <View style={tw`w-[90%] h-[7%] flex-row justify-around self-center items-center`}>
                <Image source={require("@images/vector.png")} style={tw`w-[25%]`} />
                <Text style={tw`text-[#FFFFFF] text-sm`}>SNS 계정으로 계속하기</Text>
                <Image source={require("@images/vector.png")} style={tw`w-[25%]`} />
            </View>

            <View style={tw`w-[70%] h-[13%] flex-row justify-around self-center`}>
                <Pressable onPress={onPressKakao}><Image source={require("@images/kakaotalk.png")} /></Pressable>
                <Pressable onPress={onPressGoogle}><Image source={require("@images/google.png")} /></Pressable>
                <Pressable onPress={onPressApple}><Image source={require("@images/apple.png")} /></Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "#3A3D52",
    },
});

