// 주의사항: isCookie 여부에 따라 유저 권한 다르게 주기

import React from "react";
import { View, Text, Button } from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function SeeMore1({isCookie}) {
    const nav = useNavigation();

    return (
        <View>
            <Text>여기는 더보기 페이지</Text>
            {isCookie ? <Text>로그인 되어 있음</Text> : <Text>로그인 안 되어 있음</Text>}
            <Button onPress={() => nav.goBack()} title="뒤로 가기"></Button>
        </View>
    )
}
