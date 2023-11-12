import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";
import AlertForm from '@forms/AlertForm';

export default function DBRequest ({ isCookie }) {
  const nav = useNavigation();

  const goBack = () => {
    nav.goBack();
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [alertImage, setAlertImage] = useState(require('@images/check.png'));
  const [alertText, setAlertText] = useState('비밀번호가 변경되었습니다.');

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');

  const [rectangle1, setRectangle1] = useState(
    require('@images/checked_rectangle.png'),
  );
  const [rectangle2, setRectangle2] = useState(
    require('@images/empty_rectangle.png'),
  );

  const checkRectangle1 = () => {
    if (rectangle1 === require('@images/empty_rectangle.png')) {
      setRectangle1(require('@images/checked_rectangle.png'));
      setRectangle2(require('@images/empty_rectangle.png'));
    } else {
      setRectangle1(require('@images/empty_rectangle.png'));
      setRectangle2(require('@images/checked_rectangle.png'));
    }
  };

  const checkRectangle2 = () => {
    if (rectangle2 === require('@images/empty_rectangle.png')) {
      setRectangle2(require('@images/checked_rectangle.png'));
      setRectangle1(require('@images/empty_rectangle.png'));
    } else {
      setRectangle2(require('@images/empty_rectangle.png'));
      setRectangle1(require('@images/checked_rectangle.png'));
    }
  };

  const onPressSave = () => {
    if (title === '') {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('제목과 기간을 입력해주세요');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
    } else if (url === '') {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('URL을 입력해주세요');
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
          <Text style={tw`text-[#191919] text-base font-medium`}>DB 요청하기</Text>
          <Pressable onPress={onPressSave} style={tw`flex-row`}>
              <Text style={tw`text-[#191919] text-sm font-normal`}>저장</Text>
              <View style={tw`mr-[20px]`}></View>
          </Pressable>
      </View>
      <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>
      <ScrollView>
        {/* DB 요청하기 */}
        <View style={tw` mt-5 mx-5`}>
          <Text style={tw`text-sm text-[#191919] font-normal`}>원하는 요청 사항을 선택해주세요</Text>
          <View style={tw`flex-row justify-between mt-6`}>
            <View style={tw`flex-row items-center`}>
              <Pressable onPress={checkRectangle1}>
                <Image source={rectangle1} style={tw`w-[20px] h-[20px]`}></Image>
              </Pressable>
              <Pressable onPress={checkRectangle1}>
                <Text style={tw`text-sm text-[#191919] font-normal ml-5`}>DB 추가 요청</Text>
              </Pressable>
            </View>
            <View style={tw`flex-row items-center`}>
              <Pressable onPress={checkRectangle2}>
                <Image source={rectangle2} style={tw`w-[20px] h-[20px]`}></Image>
              </Pressable>
              <Pressable onPress={checkRectangle2}>
                <Text style={tw`text-sm text-[#191919] font-normal ml-5`}>DB 수정 요청</Text>
              </Pressable>
            </View>
          </View>
        </View>
          
        {/* 제목 & 기간 */}
        <View style={tw`flex-col mt-15 mx-5`}>
          <Text style={tw`text-[#191919] text-sm`}>추가(수정)하시려는 콘텐츠의 제목과 기간을 작성해주세요</Text>
          <TextInput placeholder='제목과 기간을 입력해주세요' placeholderTextColor="#B6B6B6" inputMode='text' value={title} onChangeText={setTitle} multiline={true} numberOfLines={2} color="#191919" style={tw`mt-6 pb-[10px] border-b-[1px] border-[#ABABAB] w-[100%]`}></TextInput>
        </View>

        {/* URL */}
        <View style={tw`flex-col mt-15 mx-5`}>
          <Text style={tw`text-[#191919] text-sm`}>콘텐츠의 정보를 찾을 수 있는 URL을 입력해주세요</Text>
          <TextInput placeholder='URL을 입력해주세요' placeholderTextColor="#B6B6B6" inputMode='text' value={url} onChangeText={setUrl} multiline={true} numberOfLines={3} color="#191919" style={tw`mt-6 pb-[10px] border-b-[1px] border-[#ABABAB] w-[100%]`}></TextInput>
        </View>

        {/*Content*/}
        <View style={tw`flex-col mt-15 mx-5`}>
          <Text style={tw`text-[#191919] text-sm`}>추가(수정) 요청하시려는 내용을 알려주세요</Text>
          <TextInput placeholder='내용을 입력해주세요' placeholderTextColor="#B6B6B6" inputMode='text' value={content} onChangeText={setContent} multiline={true} color="#191919" style={tw`mt-6 pb-[10px] border-b-[1px] border-[#ABABAB] w-[100%]`}></TextInput>
        </View>
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
