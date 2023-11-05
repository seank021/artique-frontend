import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";

export default function Announcement ({isCookie}) {
  const nav = useNavigation();

  const goBack = () => {
    nav.goBack();
  }

  const goToDocument = () => {
    nav.navigate('AnnounceDetail');
  }

  return (
    <SafeAreaView style={styles.container}>
        {/* 상단 바 */}
        <View style={tw`flex-row justify-between items-center mt-5 mb-[14px]`}>
          <Pressable onPress={goBack} style={tw`flex-row`}>
              <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] w-[10px] h-[18px] tint-[#191919]`}></Image>
          </Pressable>
          <Text style={tw`text-[#191919] text-base font-medium`}>공지사항</Text>
          <View style={tw`mr-[20px]`}></View>
        </View>
        <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>

        {/* 공지사항 */}
        <ScrollView style={tw`flex-col`}>
          <Pressable onPress={goToDocument} style={tw`flex-row justify-between items-center h-[57px] mx-5`}>
            <View style={tw`flex-col`}>
              <Text style={tw`text-sm text-[#191919] font-normal`}>공지제목</Text>
              <Text style={tw`text-[10px] text-[#B6B6B6] font-normal`}>2021.09.01</Text>
            </View>
            <Image source={require('@images/chevron_right.png')} style={tw`w-[10px] h-[18px] tint-[#CBCDCB]`}></Image>
          </Pressable>
          <View style={tw`border-solid border-b border-[#E5E6E5]`}></View>
        </ScrollView>
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