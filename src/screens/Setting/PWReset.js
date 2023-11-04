import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";

export default function PWReset ({ isCookie }) {
  const nav = useNavigation();

  const goBack = () => {
    nav.goBack();
  }

  const [modalVisible, setModalVisible] = useState(false);

  const onPressSave = () => {
    setModalVisible(!modalVisible);
  }

  return (
    <SafeAreaView style={styles.container}>
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
        <Text>아이디와 새 비밀번호를 받을 메일 주소를 입력해주세요</Text>
      </View>
      <View style={tw`flex-row w-[90%] mt-[35px] mx-5`}>
        <Text style={tw`text-[#191919] text-sm font-normal`}>아이디 :</Text>
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