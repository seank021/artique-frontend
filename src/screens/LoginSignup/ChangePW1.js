/* 
TODO:
1. 이후 비밀번호 재설정 안내 이메일 변경
2. 선 색깔 수정
*/

import React from "react";
import { View, Text, Image, Pressable, StyleSheet, ScrollView } from "react-native";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";

export default function Login1() {
    const nav = useNavigation();

    const goBack = () => {
        nav.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={tw`flex-row items-center justify-between mt-5 mb-3`}>
                <Pressable onPress={goBack} style={tw`flex-row items-center`}>
                    <Image source={require("@images/chevron_left.png")} style={tw`mx-2`}></Image>
                    <Text style={tw`text-[#F5F8F5] text-sm`}>로그인</Text>
                </Pressable>
                <Text style={tw`text-[#F5F8F5] text-lg`}>비밀번호 재설정</Text>
                <View style={tw`flex-row`}>
                    <Image source={require("@images/chevron_left.png")} style={tw`mr-2 tint-[#3A3D52]`}></Image>
                    <Text style={tw`text-[#3A3D52] text-sm mr-2`}>로그인</Text>
                </View>
            </View>
            <View style={tw`border-solid border-b border-[#2a2b38]`}></View>

            <Image source={require("@images/logo_small.png")} style={tw`self-center mt-10 mb-6`}></Image>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={tw`self-center items-center`}>
                    <Text style={tw`text-[#F5F8F5] text-sm`}>비밀번호를 잊어버리셨나요?</Text>
                    <Text></Text>
                    <Text style={tw`text-[#F5F8F5] text-sm`}>aiden99@naver.com 으로</Text>
                    <Text style={tw`text-[#F5F8F5] text-sm`}>본인 아이디와 함께 문의주세요.</Text>
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
        paddingBottom: "70%",
    },
});

