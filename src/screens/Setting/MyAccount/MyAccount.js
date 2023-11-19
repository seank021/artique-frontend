import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";
import { AlertFormForConfirm } from "@forms/AlertForm";
import { clearCookie } from "@functions/cookie";

export default function MyAccount ({ isCookie, setGoToFeed }) {
  const nav = useNavigation();

  const [exitModalVisible, setExitModalVisible] = useState(false);

  const goBack = () => {
    nav.goBack();
  }

  const goToPWChange = () => {
    nav.navigate('PWChange');
  }

  const onPressExit = () => {
    setExitModalVisible(!exitModalVisible)
  }

  const onPressExitConfirm = async () => {
    await clearCookie();
    await removeAutoLogin();
    setGoToFeed(false);
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 바 */}
      <View style={tw`flex-row justify-between items-center mt-5 mb-[14px]`}>
            <Pressable onPress={goBack} style={tw`flex-row`}>
                <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] w-[10px] h-[18px] tint-[#191919]`}></Image>
            </Pressable>
            <Text style={tw`text-[#191919] text-base font-medium`}>내 계정</Text>
            <View style={tw`mr-[20px]`}></View>
        </View>
        <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>
      
      {/* 계정 정보 */}
      <View style={tw`flex-row items-center h-[57px] mx-5`}>
        <Text style={tw`text-sm text-[#191919] font-normal`}>가입 계정</Text>
        <Text style={tw`text-sm text-[#191919] font-normal absolute left-[140px]`}>카카오톡</Text>
      </View>
      <View style={tw`border-solid border-b border-[#E5E6E5]`}></View>

      <View style={tw`flex-row items-center h-[57px] mx-5`}>
        <Text style={tw`text-sm text-[#191919] font-normal`}>아이디</Text>
        <Text style={tw`text-sm text-[#191919] font-normal absolute left-[140px]`}>artique</Text>
      </View>
      <View style={tw`border-solid border-b border-[#E5E6E5]`}></View>

      <Pressable onPress={goToPWChange} style={tw`flex-row justify-between items-center h-[57px] mx-5`}>
        <Text style={tw`text-sm text-[#191919] font-normal`}>비밀번호 변경</Text>
        <Image source={require('@images/chevron_right.png')} style={tw`w-[10px] h-[18px] tint-[#CBCDCB]`}></Image>
      </Pressable>
      <View style={tw`border-solid border-b border-[#E5E6E5]`}></View>

      <Pressable onPress={onPressExit} style={tw`flex-row justify-between items-center h-[57px] mx-5`}>
        <Text style={tw`text-sm text-[#191919] font-normal`}>탈퇴하기</Text>
        <Image source={require('@images/chevron_right.png')} style={tw`w-[10px] h-[18px] tint-[#CBCDCB]`}></Image>
      </Pressable>
      <View style={tw`border-solid border-b border-[#E5E6E5]`}></View>
      <AlertFormForConfirm
        modalVisible={exitModalVisible}
        setModalVisible={setExitModalVisible}
        question="탈퇴하시겠습니까?"
        text="탈퇴하기"
        onPress={onPressExitConfirm}
        />
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