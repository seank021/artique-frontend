import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";

export default function ArtiqueInfo ({ isCookie }) {
  const nav = useNavigation();

  const goBack = () => {
    nav.goBack();
  }

  const goToTerms = () => {
    console.log("이용약관")
  }

  const goToPrivacy = () => {
    console.log("개인정보 처리방침")
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 바 */}
      <View style={tw`flex-row justify-between items-center mt-5 mb-[14px]`}>
            <Pressable onPress={goBack} style={tw`flex-row`}>
                <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] w-[10px] h-[18px] tint-[#191919]`}></Image>
            </Pressable>
            <Text style={tw`text-[#191919] text-base font-medium`}>Artique 정보</Text>
            <View style={tw`mr-[20px]`}></View>
        </View>
        <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>
      
      {/* 버전 정보 */}
      <View style={tw`flex-row items-center h-[57px] mx-5`}>
        <Text style={tw`text-sm text-[#191919] font-normal`}>버전정보</Text>
        <Text style={tw`text-sm text-[#191919] font-normal absolute left-[140px]`}>v 1.0</Text>
      </View>
      <View style={tw`border-solid border-b border-[#E5E6E5]`}></View>

      <Pressable onPress={goToTerms} style={tw`flex-row justify-between items-center h-[57px] mx-5`}>
        <Text style={tw`text-sm text-[#191919] font-normal`}>Artique 이용약관</Text>
        <Image source={require('@images/chevron_right.png')} style={tw`w-[10px] h-[18px] tint-[#CBCDCB]`}></Image>
      </Pressable>
      <View style={tw`border-solid border-b border-[#E5E6E5]`}></View>

      <Pressable onPress={goToPrivacy} style={tw`flex-row justify-between items-center h-[57px] mx-5`}>
        <Text style={tw`text-sm text-[#191919] font-normal`}>개인정보 처리방침</Text>
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