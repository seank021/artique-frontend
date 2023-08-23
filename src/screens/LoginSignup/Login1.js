/* 
TODO:
1. 소셜로그인 구현
*/

import React from "react";
import { View, Text, Image, Pressable, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import * as KakaoLogin from "@react-native-seoul/kakao-login";
import { GoogleSignin } from "react-native-google-signin";

import axios from "axios";

import { useNavigation } from "@react-navigation/native";

import ButtonForm from "@forms/ButtonForm";

export default function Login1({setIsLoggedIn}) {
    const nav = useNavigation();

    onPressLookAround = () => {
        nav.navigate("Feed");
    }

    onPressLogin = () => {
        nav.navigate("Login2");
    }

    onPressKakao = async () => {
        try {
            const result = await KakaoLogin.login();
            console.log(result);
            console.log(result.accessToken);
            const response = await axios.post("http://3.39.145.210/member/oauth", {
                "accessToken": result.accessToken,
            });
            console.log(response.data.userId);
            console.log(response.headers["set-cookie"]);
            setIsLoggedIn(true);
        } catch (err) {
            console.log(err);
        }
    }

    onPressGoogle = async () => {
        GoogleSignin.configure({
            webClientId:"1001943377543-q3ed3vrdtg2hhmc8edp88c6eggh48bcs.apps.googleusercontent.com",
            offlineAccess: true,
        });

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
            console.log(userInfo.idToken);
        } catch (err) {
            console.log(err);
        }
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

