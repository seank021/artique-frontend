/* 
TODO:
1. 아이디 중복확인 로직 구현, 팝업 메시지 띄우기(AlertForm 이용)
2. 회원가입 로직 구현 --> 회원가입 후 메인 페이지로 이동
3. 약관
*/

import React, { useState } from "react";
import { View, Text, Image, Pressable, ScrollView, StyleSheet, Alert, Modal } from "react-native";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";

import InputForm from "@forms/InputForm";
import ButtonForm from "@forms/ButtonForm";
import AlertForm from "@forms/AlertForm";

export default function Login1() {
    const nav = useNavigation();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [password_, setPassword_] = useState("");

    const [modalVisible, setModalVisible] = useState(false);

    const [ifButtonID, setIfButtonID] = useState(true);
    const [ifCheckID, setIfCheckID] = useState(false);

    const [borderColor, setBorderColor] = useState("#ABABAB");
    const [buttonColor, setButtonColor] = useState("#3A3D52");
    const [buttonTextColor, setButtonTextColor] = useState("#ABABAB");
    const [buttonText, setButtonText] = useState("중복확인");

    const [alertImage, setAlertImage] = useState(require("@images/x_red.png"));
    const [alertText, setAlertText] = useState("사용 불가한 아이디입니다.");

    const [ifCheckPW, setIfCheckPW] = useState(false);
    const [ifXPW, setIfXPW] = useState(false);

    const [rectangle1, setRectangle1] = useState(require("@images/rectangle.png"));
    const [rectangle2, setRectangle2] = useState(require("@images/rectangle.png"));

    const checkRectangle1 = () => {
        if (rectangle1 === require("@images/rectangle.png")) {
            setRectangle1(require("@images/rectangle_checked.png"));
        } else {
            setRectangle1(require("@images/rectangle.png"));
        }
    }

    const checkRectangle2 = () => {
        if (rectangle2 === require("@images/rectangle.png")) {
            setRectangle2(require("@images/rectangle_checked.png"));
        } else {
            setRectangle2(require("@images/rectangle.png"));
        }
    }

    const goBack = () => {
        nav.goBack();
    }

    const nullFunc = () => {
        return;
    }

    const ifDuplicate = false; // 테스트용 변수

    const checkDuplicate = () => {
        if (ifDuplicate || id === "") {
            setAlertImage(require("@images/x_red.png"));
            setAlertText("사용 불가한 아이디입니다.");
            setModalVisible(!modalVisible);
        }
        else {
            setBorderColor("#F5F8F5");
            setButtonColor("#F5F8F5");
            setButtonTextColor("#191919");
            // setButtonText("사용가능");
            
            setAlertImage(require("@images/check.png"));
            setAlertText("사용 가능한 아이디입니다.");
            setModalVisible(!modalVisible);

            setIfButtonID(false);
            setIfCheckID(true);
        }
    }

    const comparePW = (text) => {
        if (password_ !== "") {
            if (text === password_) {
                setIfCheckPW(true);
                setIfXPW(false);
            } else {
                setIfCheckPW(false);
                setIfXPW(true);
            }
        }
        else {
            setIfCheckPW(false);
            setIfXPW(false);
        }
    }

    const comparePW_ = (text) => {
        if (password !== "") {
            if (text === password) {
                setIfCheckPW(true);
                setIfXPW(false);
            } else {
                setIfCheckPW(false);
                setIfXPW(true);
            }
        }
        else {
            setIfCheckPW(false);
            setIfXPW(false);
        }
    }

    const onPressSignup = () => {
        if (ifCheckID && ifCheckPW) {
            Alert.alert("회원가입 로직 구현");
        }
        else {
            Alert.alert("회원가입 실패");
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <AlertForm modalVisible={modalVisible} setModalVisible={setModalVisible} borderColor="#F5F8F5" bgColor="#F5F8F5" image={alertImage} textColor="#191919" text={alertText}></AlertForm>
            </View>
            <View style={tw`flex-row items-center justify-between mt-5 mb-3`}>
                <Pressable onPress={goBack} style={tw`flex-row items-center`}>
                    <Image source={require("@images/chevron_left.png")} style={tw`mx-2`}></Image>
                    <Text style={tw`text-[#F5F8F5] text-sm`}>로그인</Text>
                </Pressable>
                <Text style={tw`text-[#F5F8F5] text-lg`}>회원가입</Text>
                <View style={tw`flex-row`}>
                    <Image source={require("@images/chevron_left.png")} style={tw`mr-2 tint-[#3A3D52]`}></Image>
                    <Text style={tw`text-[#3A3D52] text-sm mr-2`}>로그인</Text>
                </View>
            </View>
            <View style={tw`border-solid border-b border-[#323546]`}></View>

            <Image source={require("@images/logo_small.png")} style={tw`self-center mt-7 mb-7`}></Image>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <InputForm image={require("@images/id.png")} placeholder={"아이디를 입력해주세요"} setValue={setId} compareValue={nullFunc} ifButton={ifButtonID} borderColor={borderColor} buttonColor={buttonColor} buttonTextColor={buttonTextColor} buttonText={buttonText} onPressButton={checkDuplicate} ifCheck={ifCheckID}></InputForm>
                <InputForm image={require("@images/password.png")} placeholder={"비밀번호를 입력해주세요"} secureTextEntry={true} setValue={setPassword} compareValue={comparePW}></InputForm>
                <InputForm image={require("@images/password.png")} placeholder={"비밀번호를 다시 확인해주세요"} secureTextEntry={true} setValue={setPassword_} compareValue={comparePW_} ifCheck={ifCheckPW} ifX={ifXPW}></InputForm>

                <View style={tw`flex-row items-center self-start ml-[5%] mt-2.5 mb-1`}>
                    <Pressable onPress={checkRectangle1}><Image source={rectangle1} style={tw`mr-2`}></Image></Pressable>
                    <Text style={tw`text-[#ABABAB] text-sm underline`}>이용약관 (필수)</Text>
                </View>
                <View style={tw`flex-row items-center self-start ml-[5%] mt-1 mb-4.5`}>
                    <Pressable onPress={checkRectangle2}><Image source={rectangle2} style={tw`mr-2`}></Image></Pressable>
                    <Text style={tw`text-[#ABABAB] text-sm underline`}>개인정보 처리 방침 (필수)</Text>
                </View>

                <ButtonForm borderColor="#ABABAB" textColor="#ABABAB" text={"가입하기"} onPress={onPressSignup}></ButtonForm>
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
        paddingBottom: "90%",
    },
});
