import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";
import { announcementList } from "@functions/api";

export default function Announcement ({isCookie}) {
  const nav = useNavigation();

  const goBack = () => {
    nav.goBack();
  }

  const goToDocument = () => {
    nav.navigate('AnnounceDetail');
  }

  const [notice, setNotice] = useState([]);

  useEffect(() => {
    announcementList().then((newAnnouncement) => {
      setNotice(() => newAnnouncement);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        {/* 상단 바 */}
        <View style={tw`flex-row justify-between items-center mt-5 mb-[14px]`}>
          <Pressable onPress={goBack} style={tw`flex-row`}>
              <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] w-[10px] h-[18px] tint-[#191919]`}></Image>
          </Pressable>
          <Text style={tw`text-[#191919] text-base font-medium`}>공지사항</Text>
          <View style={tw`mr-[30px]`}></View>
        </View>
        <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>

        {/* 공지사항 -> 현재 공지사항이 빈 배열이라 에러남*/}
        <ScrollView style={tw`flex-col`}>
          {notice.length > 0 ? (
            notice.map((item, index) => (
              <>
                <Pressable key={index} onPress={goToDocument} style={tw`flex-row justify-between items-center h-[57px] mx-5`}>
                  <Text style={tw`text-sm text-[#191919] font-normal`}>{item.title}</Text>
                  <Image source={require('@images/chevron_right.png')} style={tw`w-[10px] h-[18px] tint-[#CBCDCB]`}></Image>
                </Pressable>
                <View style={tw`border-solid border-b border-[#E5E6E5]`}></View>
              </>
            ))
          ) : (
              <View style={tw`flex-col justify-center items-center h-[100px]`}>
                <Text style={tw`text-sm text-[#191919] font-normal my-0`}>공지사항이 없습니다.</Text>
              </View>
          )}
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