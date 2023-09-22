import React from "react";
import { View, Text, Button } from "react-native";

import { clearCookie } from "@functions/cookie";

// 편의를 위해 logout 기능 추가해둠. 이후 삭제 예정.

export default function Profile({isCookie, setGoToFeed}) {
    const logout = () => {
        clearCookie();
        setGoToFeed(false);
    }

    return (
        <View>
            <Text>여기는 프로필 페이지</Text>
            {isCookie ? <Text>로그인 되어 있음</Text> : <Text>로그인 안 되어 있음</Text>}
            <Button onPress={logout} title="로그아웃"></Button>
        </View>
    );
}