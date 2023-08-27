/* 
TODO:
1. 쿠키 저장 기능 구현
2. 둘러보기 시 setIsLoggedIn과 cookie 조합해서 Feed로 이동 설졍
*/

import React, { useEffect } from "react";
import { View, Text, Image, Pressable, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import * as KakaoLogin from "@react-native-seoul/kakao-login";
import { GoogleSignin } from "react-native-google-signin";
// import appleAuth from '@invertase/react-native-apple-authentication';

import axios from "axios";

import { useNavigation } from "@react-navigation/native";

import ButtonForm from "@forms/ButtonForm";

export default function Login1({setIsLoggedIn}) {
    const nav = useNavigation();

    // useEffect(() => {
    //     return appleAuth.onCredentialRevoked(async () => {
    //         console.warn('If this function executes, User Credentials have been Revoked',);
    //     });
    // }, []);

    onPressLookAround = () => {
        nav.navigate("Feed"); // 수정 필요 : cookie / setIsLoggedIn으로 처리
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
                "thirdPartyName": "kakao",
                "token": result.accessToken,
            });
            console.log(response.data.userId);
            console.log(response.headers["set-cookie"]);
            setIsLoggedIn(true); // 수정 필요: cookie 관련으로 로그인 여부를 결정
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
            const response = await axios.post("http://3.39.145.210/member/oauth", {
                "thirdPartyName": "google",
                "token": userInfo.idToken,
            });
            console.log(response.data.userId);
            console.log(response.headers["set-cookie"]);
            setIsLoggedIn(true); // 수정 필요: cookie 관련으로 로그인 여부를 결정
        } catch (err) {
            console.log(err);
        }
    }

    onPressApple = async () => {
        // try {
        //     const appleAuthRequestResponse = await appleAuth.performRequest({
        //         requestedOperation: appleAuth.Operation.LOGIN,
        //         requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        //     });
        //     console.log('appleAuthRequestResponse: ', appleAuthRequestResponse);
        //     const credentialState = await appleAuth.getCredentialStateForUser(
        //         appleAuthRequestResponse.user,
        //     );
        //     if (credentialState === appleAuth.State.AUTHORIZED) {
        //         console.log('user is authenticated');
        //             setIsLoggedIn(true); // 수정 필요: cookie 관련으로 로그인 여부를 결정
        //     }
        // } catch (error) {
        //     console.log('error: ', error);
        //     if (error.code === appleAuth.Error.CANCELED) {
        //         console.warn('User canceled Apple Sign in.');
        //     }
        // }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={tw`h-[63%] items-center justify-center`}>
                <Image source={require("@images/logo.png")} />
            </View>

            <View style={tw`h-[7%]`}>
                <ButtonForm borderColor="#E94A4B" textColor="#F5F5F5" text="로그인 전 둘러보기" onPress={onPressLookAround}></ButtonForm>
            </View>
            <View style={tw`h-[7%]`}>
                <ButtonForm borderColor="#E94A4B" bgColor="#E94A4B" textColor="#F5F5F5" text="로그인" onPress={onPressLogin}></ButtonForm>
            </View>
            
            <View style={tw`w-[90%] h-[5%] flex-row justify-around self-center items-center`}>
                <Image source={require("@images/vector.png")} style={tw`w-[25%]`} />
                <Text style={tw`text-[#FFFFFF] text-sm`}>SNS 계정으로 계속하기</Text>
                <Image source={require("@images/vector.png")} style={tw`w-[25%]`} />
            </View>

            <View style={tw`w-[70%] h-[10%] flex-row justify-around self-center`}>
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

