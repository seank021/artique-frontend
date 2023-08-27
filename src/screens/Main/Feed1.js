// 주의사항: isCookie 여부에 따라 유저 권한 다르게 주기

import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

import * as Cookies from "@functions/cookie";

import { useNavigation } from "@react-navigation/native";

export default function Feed1() {
    const [isCookie, setIsCookie] = useState(true);

    useEffect(() => {
        const checkCookie = async () => {
            const cookieExists = await Cookies.ifCookieExists();
            setIsCookie(cookieExists);
        };
        checkCookie();
    }, []);

    const nav = useNavigation();

    return (
        <View>
            <Text>여기는 피드 페이지</Text>
            <Button onPress={() => nav.navigate("Detail1")} title="Detail1으로 가기"></Button>
            <Button onPress={() => nav.navigate("SeeMore1")} title="SeeMore1으로 가기"></Button>
        </View>
    )
}
