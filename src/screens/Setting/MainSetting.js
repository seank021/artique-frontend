import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";
import { AlertFormForConfirm } from "@forms/AlertForm";
import { removeAutoLogin } from "@functions/autoLogin";

import * as Cookies from "@functions/cookie";

export default function MainSetting ({setIsCookie, setGoToFeed}) {
  const nav = useNavigation();

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const goBack = () => {
    nav.goBack();
  }

  const goToMyAccount = () => {
    nav.navigate('MyAccount');
  }

  const goToAnnouncement = () => {
    nav.navigate('Announcement');
  }

  const goToCSCenter = () => {
    nav.navigate('CSCenter');
  }

  const goToArtiqueInfo = () => {
    nav.navigate('ArtiqueInfo');
  }

  const onPressLogout = async () => {
    setLogoutModalVisible(!logoutModalVisible);
  }

  const onPressLogoutConfirm = async () => {
    const currentLogin = await Cookies.getCurrentLogin();
    await Cookies.removeCookie(currentLogin);
    await removeAutoLogin();
    nav.navigate('MainTab', { screen: 'Feed1' });
    setGoToFeed(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 바 */}
      <View style={tw`flex-row justify-between items-center mt-5 mb-[14px]`}>
          <Pressable onPress={goBack} style={tw`flex-row`}>
              <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] w-[10px] h-[18px] tint-[#191919]`}></Image>
          </Pressable>
          <Text style={tw`text-[#191919] text-base font-medium`}>설정</Text>
          <View style={tw`mr-[20px]`}></View>
      </View>
      <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>

      {/* 설정 목록 */}
      <Pressable onPress={goToMyAccount} style={tw`flex-row justify-between items-center h-[57px] mx-5`}>
        <Text style={tw`text-sm text-[#191919] font-normal`}>내 계정</Text>
        <Image source={require('@images/chevron_right.png')} style={tw`w-[10px] h-[18px] tint-[#CBCDCB]`}></Image>
      </Pressable>
      <View style={tw`border-solid border-b border-[#E5E6E5]`}></View>

      <Pressable onPress={goToAnnouncement} style={tw`flex-row justify-between items-center h-[57px] mx-5`}>
        <Text style={tw`text-sm text-[#191919] font-normal`}>공지사항</Text>
        <Image source={require('@images/chevron_right.png')} style={tw`w-[10px] h-[18px] tint-[#CBCDCB]`}></Image>
      </Pressable>
      <View style={tw`border-solid border-b border-[#E5E6E5]`}></View>

      <Pressable onPress={goToCSCenter} style={tw`flex-row justify-between items-center h-[57px] mx-5`}>
        <Text style={tw`text-sm text-[#191919] font-normal`}>고객센터</Text>
        <Image source={require('@images/chevron_right.png')} style={tw`w-[10px] h-[18px] tint-[#CBCDCB]`}></Image>
      </Pressable>
      <View style={tw`border-solid border-b border-[#E5E6E5]`}></View>

      <Pressable onPress={goToArtiqueInfo} style={tw`flex-row justify-between items-center h-[57px] mx-5`}>
        <Text style={tw`text-sm text-[#191919] font-normal`}>Artique 정보</Text>
        <Image source={require('@images/chevron_right.png')} style={tw`w-[10px] h-[18px] tint-[#CBCDCB]`}></Image>
      </Pressable>
      <View style={tw`border-solid border-b border-[#E5E6E5]`}></View>

      <Pressable onPress={onPressLogout} style={tw`flex-row justify-between items-center h-[57px] mx-5`}>
        <Text style={tw`text-sm text-[#191919] font-normal`}>로그아웃</Text>
        <Image source={require('@images/chevron_right.png')} style={tw`w-[10px] h-[18px] tint-[#CBCDCB]`}></Image>
      </Pressable>
      <View style={tw`border-solid border-b border-[#E5E6E5]`}></View>
      <AlertFormForConfirm
        modalVisible={logoutModalVisible}
        setModalVisible={setLogoutModalVisible}
        question="로그아웃 하시겠습니까?"
        text='로그아웃'
        onPress={onPressLogoutConfirm}
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