import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { Link, useNavigation } from "@react-navigation/native";
import { AlertFormForConfirm } from "@forms/AlertForm";

export default function CSCenter ({setIsCookie}) {
  const nav = useNavigation();

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const goBack = () => {
    nav.goBack();
  }

  const goToOneOnOneInquiry = () => {
    Linking.openURL('https://forms.gle/qKhucAvewtg4qrzs8');
  }

  const goToFAQ = () => {
    Linking.openURL('https://artiqueluta.notion.site/Artique-FAQ-16e0d85eedfe4119b440441a55c5977a')
  }

  const goToDBRequest = () => {
    Linking.openURL('https://forms.gle/o8mx63bJCW8FT1jv7');
  }

  const onPressLogout = () => {
    setLogoutModalVisible(!logoutModalVisible);
    setIsCookie(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 바 */}
      <View style={tw`flex-row justify-between items-center mt-5 mb-[14px]`}>
          <Pressable onPress={goBack} style={tw`flex-row`}>
              <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] w-[10px] h-[18px] tint-[#191919]`}></Image>
          </Pressable>
          <Text style={tw`text-[#191919] text-base font-medium`}>고객센터</Text>
          <View style={tw`mr-[20px]`}></View>
      </View>
      <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>

      {/* 설정 목록 */}
      <Pressable onPress={goToOneOnOneInquiry} style={tw`flex-row justify-between items-center h-[57px] mx-5`}>
        <Text style={tw`text-sm text-[#191919] font-normal`}>1:1 문의</Text>
        <Image source={require('@images/chevron_right.png')} style={tw`w-[10px] h-[18px] tint-[#CBCDCB]`}></Image>
      </Pressable>
      <View style={tw`border-solid border-b border-[#E5E6E5]`}></View>

      <Pressable onPress={goToFAQ} style={tw`flex-row justify-between items-center h-[57px] mx-5`}>
        <Text style={tw`text-sm text-[#191919] font-normal`}>FAQ</Text>
        <Image source={require('@images/chevron_right.png')} style={tw`w-[10px] h-[18px] tint-[#CBCDCB]`}></Image>
      </Pressable>
      <View style={tw`border-solid border-b border-[#E5E6E5]`}></View>

      <Pressable onPress={goToDBRequest} style={tw`flex-row justify-between items-center h-[57px] mx-5`}>
        <Text style={tw`text-sm text-[#191919] font-normal`}>DB 요청하기</Text>
        <Image source={require('@images/chevron_right.png')} style={tw`w-[10px] h-[18px] tint-[#CBCDCB]`}></Image>
      </Pressable>
      <View style={tw`border-solid border-b border-[#E5E6E5]`}></View>
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