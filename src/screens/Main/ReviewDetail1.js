// 주의사항: isCookie 여부에 따라 유저 권한 다르게 주기

import React, {useState} from "react";
import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { AlertFormForSort } from "@forms/AlertForm";

export default function ReviewDetail1({isCookie}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [sortCriteria, setSortCriteria] = useState("공감순");
    
    const nav = useNavigation();

    return (
        <SafeAreaView>
            <Text>여기는 모든 리뷰 페이지</Text>
            {isCookie ? <Text>로그인 되어 있음</Text> : <Text>로그인 안 되어 있음</Text>}
            <Button onPress={() => nav.goBack()} title="뒤로 가기"></Button>
            <Button onPress={() => nav.navigate("SeeMore1")} title="SeeMore1으로 가기"></Button>
            <Button onPress={() => {setModalVisible(true)}} title={sortCriteria}></Button>
                <AlertFormForSort modalVisible={modalVisible} setModalVisible={setModalVisible} sortCriteria={sortCriteria} setSortCriteria={setSortCriteria}>
                </AlertFormForSort>
        </SafeAreaView>
    )
}
