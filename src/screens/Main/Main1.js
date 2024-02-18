import React, { useState, useEffect } from "react";
import { Pressable, Text, StyleSheet, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

import { AlertFormForConfirm } from "@forms/AlertForm";

export default function Main1 ({ isCookie }) {
    const nav = useNavigation();

    const [exitModalVisible, setExitModalVisible] = useState(false);
    
    useEffect(() => {
        const backAction = () => {
            if (nav.isFocused()) {
                setExitModalVisible(true);
                return true;
            }
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);
    
    const goToFeed = () => {
        nav.navigate('Feed1');
    }

    return (
        <SafeAreaView style={styles.container}>
            <AlertFormForConfirm modalVisible={exitModalVisible} setModalVisible={setExitModalVisible} question="앱을 종료하시겠습니까?" text='종료' onPress={BackHandler.exitApp} />

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
