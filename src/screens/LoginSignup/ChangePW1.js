import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

import axios from 'axios';

import { useNavigation } from '@react-navigation/native';

import ButtonForm from '@forms/ButtonForm';
import AlertForm from '@forms/AlertForm';

import { getPort } from '@functions/port';

export default function ChangePW1() {
  const nav = useNavigation();
  const PORT = getPort();

  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
  const [alertText, setAlertText] = useState('다시 시도해주세요.');

  const goBack = () => {
    nav.goBack();
  };

  const onPressRequest = async () => {
    if (email === '') {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('이메일을 입력해주세요.');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
      return;
    }

    try {
      const response = await axios.post(`${PORT}/member/password/renew?member-email=${email}`);
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
      <View style={tw`flex-row items-center justify-between mt-5 mb-3`}>
        <Pressable onPress={goBack} style={tw`flex-row items-center`}>
          <Image source={require('@images/chevron_left.png')} style={tw`mx-[10px] w-[10px] h-[18px]`}></Image>
          <Text style={tw`text-[#F5F8F5] text-sm`}>로그인</Text>
        </Pressable>
        <Text style={tw`text-[#F5F8F5] text-lg`}>비밀번호 재설정</Text>
        <View style={tw`flex-row`}>
          <Image source={require('@images/chevron_left.png')} style={tw`mr-[10px] w-[10px] h-[18px] tint-[#3A3D52]`}></Image>
          <Text style={tw`text-[#3A3D52] text-sm mr-2`}>로그인</Text>
        </View>
      </View>
      <View style={tw`border-solid border-b border-[#323546]`}></View>

      <Image source={require('@images/logo_small.png')} style={tw`self-center mt-7 mb-7 w-[110px] h-[38px]`}></Image>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={tw`text-[#F5F8F5] text-sm self-center text-center mb-7`}>가입하신 메일 주소를 입력해주세요.{'\n'}초기화된 비밀번호를 보내드리겠습니다.{'\n'}로그인 후 꼭 비밀번호를 변경해주세요.</Text>

        <View style={tw`flex-row items-center w-[90%] justify-start mb-10`}>
          <Text style={tw`text-[#F5F8F5] text-sm w-[15%]`}>이메일 : </Text>
          <TextInput placeholder='이메일을 입력해주세요' placeholderTextColor="#ABABAB" inputMode='email' color="#F5F8F5" style={tw`border-b-[1px] border-[#ABABAB] w-[85%]`} onChangeText={(text)=>setEmail(text)}></TextInput>
        </View>

        <ButtonForm borderColor="#F5F8F5" bgColor="#F5F8F5" textColor="#191919" text={'요청하기'} onPress={onPressRequest} ifOpacity={true}></ButtonForm>
        <AlertForm modalVisible={modalVisible} setModalVisible={setModalVisible} borderColor="#F5F8F5" bgColor="#F5F8F5" image={alertImage} textColor="#191919" text={alertText}></AlertForm>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#3A3D52',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
