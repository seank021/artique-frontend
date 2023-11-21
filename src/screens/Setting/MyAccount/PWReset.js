import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import axios from "axios";

import { useNavigation } from "@react-navigation/native";
import AlertForm from "@forms/AlertForm";

export default function PWReset ({ isCookie }) {
  const nav = useNavigation();

  const goBack = () => {
    nav.goBack();
  }

  const [email, setEmail] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [alertImage, setAlertImage] = useState(require('@images/check.png'));
  const [alertText, setAlertText] = useState('다시 시도해주세요.');

  const onPressSave = async () => {
    if (email === '') {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('이메일을 입력해주세요');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
    } 

    try {
      const response = await axios.post(`http://3.39.145.210/member/password/renew?member-email=${email}`);
      if (response.data === "ok") {
        setModalVisible(!modalVisible);
        setAlertImage(require('@images/check.png'));
        setAlertText('이메일로 초기화된 비밀번호를 전송하였습니다.');
        setTimeout(() => {
          setModalVisible(modalVisible);
        }, 1000);
        setTimeout(() => {
          nav.navigate('Login2');
        }, 2000);
        return;
      }
    }
    catch (error) {
      console.log(error.response);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <AlertForm
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        borderColor="#FAFAFA"
        bgColor="#FAFAFA"
        image={alertImage}
        text={alertText}
        textColor="#191919"
      />
      {/* 상단 바 */}
      <View style={tw`flex-row items-center justify-between mt-5 mb-[14px]`}>
          <Pressable onPress={goBack} style={tw`flex-row`}>
              <Image 
                source={require('@images/chevron_left.png')} 
                style={tw`ml-[20px] mr-[8px] w-[10px] h-[18px] tint-[#191919]`}></Image>
              <View style={tw`ml-[20px]`}></View>
          </Pressable>
          <Text style={tw`text-[#191919] text-base font-medium`}>비밀번호 초기화</Text>
          <Pressable onPress={onPressSave} style={tw`flex-row`}>
              <Text style={tw`text-[#191919] text-sm font-normal`}>요청</Text>
              <View style={tw`mr-[20px]`}></View>
          </Pressable>
      </View>
      <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>

      {/* 비밀번호 초기화 */}
      <View style={tw`w-[90%] mt-[25px] mx-5`}>
        <Text>새 비밀번호를 받을 메일 주소를 입력해주세요</Text>
      </View>
      <View style={tw`mt-[35px] mx-5`}>
        <View style={tw`flex-row items-start w-[90%] justify-start mb-10`}>
          <Text style={tw`text-[#191919] text-sm w-[15%]`}>메일 : </Text>
          <TextInput placeholder='새 비밀번호를 받을 메일을 입력해주세요' placeholderTextColor="#ABABAB" inputMode='email' value={email} onChangeText={setEmail} color="#191919" style={tw`absolute left-15 pb-[10px] border-b-[1px] border-[#ABABAB] w-[85%]`}></TextInput>
        </View>
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FAFAFA",
  },
});