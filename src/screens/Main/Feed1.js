// 주의사항: isCookie 여부에 따라 유저 권한 다르게 주기

import React from "react";
import { Text, Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";

export default function Feed1({isCookie}) {
    const nav = useNavigation();

    return (
        <SafeAreaView style={tw`bg-[#FAFAFA]`}>
            <View>
                <Text>여기는 피드 페이지</Text>
                {isCookie ? <Text>로그인 되어 있음</Text> : <Text>로그인 안 되어 있음</Text>}
                <Button onPress={() => nav.navigate("MusicalDetail1")} title="MusicalDetail1으로 가기"></Button>
                <Button onPress={() => nav.navigate("SeeMore1")} title="SeeMore1으로 가기"></Button>
            </View>
        </SafeAreaView>
    )
}
