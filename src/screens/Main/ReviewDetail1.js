// 주의사항: isCookie 여부에 따라 유저 권한 다르게 주기

import React from "react";
import { View, Text, Button, Image, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";

// TODO: 백 연결 시 props로 reviewId 추가
export default function ReviewDetail1({isCookie}) {
    const nav = useNavigation();

    const goBack = () => {
        nav.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={tw`flex-row items-center justify-between mt-5 mb-[14px]`}>
                <Pressable onPress={goBack}>
                    <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] mr-[8px] w-[10px] h-[18px] tint-[#191919]`}></Image>
                </Pressable>
                <Text style={tw`text-[#191919] text-base font-medium`}>리뷰</Text>
                <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] mr-[8px] w-[10px] h-[18px] tint-[#FAFAFA]`}></Image>

            </View>
            <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FAFAFA',
    },
});
