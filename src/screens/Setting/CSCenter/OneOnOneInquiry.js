import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";
import AlertForm from '@forms/AlertForm';

export default function OneOnOneInquiry ({ isCookie }) {
  const nav = useNavigation();

  const goBack = () => {
    nav.goBack();
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [alertImage, setAlertImage] = useState(require('@images/check.png'));
  const [alertText, setAlertText] = useState('비밀번호가 변경되었습니다.');

  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const onPressSave = () => {
    if (title === '') {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('제목을 입력해주세요');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
    } else if (email === '') {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('메일 주소를 입력해주세요');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
    } else if (content === '') {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('내용을 입력해주세요');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
    } else {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/check.png'));
      setAlertText('저장되었습니다');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
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
        textColor="#191919"
        text={alertText}>
      </AlertForm>

      {/* 상단 바 */}
      <View style={tw`flex-row items-center justify-between mt-5 mb-[14px]`}>
          <Pressable onPress={goBack} style={tw`flex-row`}>
              <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] mr-[8px] w-[10px] h-[18px] tint-[#191919]`}></Image>
              <View style={tw`ml-[20px]`}></View>
          </Pressable>
          <Text style={tw`text-[#191919] text-base font-medium`}>1:1 문의</Text>
          <Pressable onPress={onPressSave} style={tw`flex-row`}>
              <Text style={tw`text-[#191919] text-sm font-normal`}>저장</Text>
              <View style={tw`mr-[20px]`}></View>
          </Pressable>
      </View>
      <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>

      {/* 제목 & 메일 */}
      <View style={tw`mt-5 mx-5`}>
        <View style={tw`flex-row items-start w-[90%] justify-start mb-[50px]`}>
          <Text style={tw`text-[#191919] text-sm w-[15%]`}>제목 : </Text>
          <TextInput placeholder='제목을 입력해주세요' placeholderTextColor="#B6B6B6" inputMode='text' value={title} onChangeText={setTitle} color="#191919" style={tw`absolute left-15 pb-[10px] border-b-[1px] border-[#ABABAB] w-[85%]`}></TextInput>
        </View>

        <View style={tw`flex-row items-start w-[90%] justify-start mb-10`}>
          <Text style={tw`text-[#191919] text-sm w-[15%]`}>메일 : </Text>
          <TextInput placeholder='답변을 전달받을 메일 주소를 입력해주세요' placeholderTextColor="#ABABAB" inputMode='email' value={email} onChangeText={setEmail} color="#191919" style={tw`absolute left-15 pb-[10px] border-b-[1px] border-[#ABABAB] w-[85%]`}></TextInput>
        </View>
      </View>

      {/* 내용 */}
      <View style={tw`flex-col mt-10 mx-5`}>
        <Text style={tw`text-[#191919] text-sm`}>문의 내용 : </Text>
        <TextInput placeholder='문의 내용을 입력해주세요' placeholderTextColor="#B6B6B6" inputMode='text' value={content} onChangeText={setContent} multiline={true} numberOfLines={10} color="#191919" style={tw`mt-5 pb-[10px] border-b-[1px] border-[#ABABAB] w-[100%]`}></TextInput>
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
