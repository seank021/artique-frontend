import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

export default function Main1 ({ isCookie }) {
    const nav = useNavigation();

    const goToFeed = () => {
        nav.navigate('Feed1');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>여기는 메인 페이지입니당</Text>
            <Pressable style={tw`flex-1 items-center justify-center`} onPress={goToFeed}>
                <Text>Feed1으로 가기</Text>
            </Pressable>
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
