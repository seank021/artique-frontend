import React, { useState } from 'react';
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

import axios from 'axios';

import hash from '@functions/hash';
import * as Cookies from '@functions/cookie';
import { setAutoLogin } from '@functions/autoLogin';
import { getPort } from '@functions/port';

import { useNavigation } from '@react-navigation/native';

import InputForm from '@forms/InputForm';
import ButtonForm from '@forms/ButtonForm';
import AlertForm from '@forms/AlertForm';

export default function Login2({setGoToFeed, setIsCookie}) {
  const nav = useNavigation();
  const PORT = getPort();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
  const [alertText, setAlertText] = useState('다시 시도해주세요.');

  const [rectangle, setRectangle] = useState(require('@images/rectangle.png'));
  const [ifChecked, setIfChecked] = useState(false); // 자동로그인 체크 여부

  const checkRectangle = () => {
    if (rectangle === require('@images/rectangle.png')) {
      setRectangle(require('@images/rectangle_checked.png'));
      setIfChecked(true);
    } else {
      setRectangle(require('@images/rectangle.png'));
      setIfChecked(false);
    }
  };

  const goBack = () => {
    nav.goBack();
  };

  const nullFunc = () => {
    return;
  };

  const onPressLogin = async () => {
    if (id === '') {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('이메일을 입력해주세요.');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
      return;
    }
    if (password === '') {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('비밀번호를 입력해주세요.');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
      return;
    }

    const hashedPW = hash(password);
    Cookies.removeCookie('currentLogin');
    try {
      const response = await axios.post(`${PORT}/member/login`, {
        memberId: id,
        memberPW: hashedPW,
      });

      if (response.data.success === true) {
        // console.log('로그인 성공');
        console.log(response.headers['authorization']);
        try {
          Cookies.setCookie('general', response.headers['authorization']);
          Cookies.setCookie('currentLogin', 'general');
          setAutoLogin(ifChecked);
          setGoToFeed(true);
        } catch (err) {
          console.log(err);
        }
      } else {
        setModalVisible(!modalVisible);
        setAlertImage(require('@images/x_red.png'));
        setAlertText('다시 시도해주세요.');
        setTimeout(() => {
          setModalVisible(modalVisible);
        }, 1000);
      }
    } catch (error) {
      if (error.response.data.code === 'INVALID_MEMBER_ID') {
        setModalVisible(!modalVisible);
        setAlertImage(require('@images/x_red.png'));
        setAlertText('이메일이 틀렸습니다.');
        setTimeout(() => {
          setModalVisible(modalVisible);
        }, 1000);
      } else if (error.response.data.code === 'INVALID_PASSWORD') {
        setModalVisible(!modalVisible);
        setAlertImage(require('@images/x_red.png'));
        setAlertText('비밀번호가 틀렸습니다.');
        setTimeout(() => {
          setModalVisible(modalVisible);
        }, 1000);
      } else {
        setModalVisible(!modalVisible);
        setAlertImage(require('@images/x_red.png'));
        setAlertText('다시 시도해주세요.');
        setTimeout(() => {
          setModalVisible(modalVisible);
        }, 1000);
      }
    }
  };

  const onPressChangePW = () => {
    nav.navigate('ChangePW1');
  };

  const onPressSignup = () => {
    nav.navigate('Signup1');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <AlertForm
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          borderColor="#F5F8F5"
          bgColor="#F5F8F5"
          image={alertImage}
          textColor="#191919"
          text={alertText}></AlertForm>
      </View>
      <View style={tw`flex-row items-center justify-between mt-5 mb-3`}>
        <Pressable onPress={goBack} style={tw`flex-row`}>
          <Image source={require('@images/x.png')} style={tw`ml-[10px] w-[20px] h-[20px]`}></Image>
          <View style={tw`px-[20px]`}></View>
        </Pressable>
        <Text style={tw`text-[#F5F8F5] text-lg`}>로그인</Text>
        <View style={tw`flex-row`}>
          <Image source={require('@images/x.png')} style={tw`mr-[10px] w-[20px] h-[20px] tint-[#3A3D52]`}></Image>
          <View style={tw`px-[20px]`}></View>
        </View>
      </View>
      <View style={tw`border-solid border-b border-[#323546]`}></View>

      <Image
        source={require('@images/logo_small.png')}
        style={tw`self-center mt-7 mb-7 w-[110px] h-[38px]`}></Image>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <InputForm
          image={require('@images/id.png')}
          placeholder={'이메일을 입력해주세요'}
          setValue={setId}
          compareValue={nullFunc}
          reappearButton={nullFunc}
          style={tw`mb-2.5`}></InputForm>
        <InputForm
          image={require('@images/password.png')}
          placeholder={'비밀번호를 입력해주세요'}
          secureTextEntry={true}
          setValue={setPassword}
          compareValue={nullFunc}
          reappearButton={nullFunc}
          style={tw`mb-2.5`}></InputForm>

        <View style={tw`w-[90%] flex-row items-center mt-2.5 mb-4.5`}>
          <Pressable onPress={checkRectangle}>
            <Image source={rectangle} style={tw`mr-2 w-[16px] h-[16px]`}></Image>
          </Pressable>
          <Text style={tw`text-[#ABABAB] text-sm`}>자동로그인</Text>
        </View>

        <ButtonForm
          borderColor="#F5F8F5"
          bgColor="#F5F8F5"
          textColor="#191919"
          text={'로그인'}
          onPress={onPressLogin}
          ifOpacity={true}></ButtonForm>

        <View style={tw`w-[90%] flex-row justify-between self-center mt-4`}>
          <Pressable onPress={onPressChangePW}>
            <Text style={tw`text-[#ABABAB] text-sm`}>비밀번호 재설정</Text>
          </Pressable>
          <Pressable onPress={onPressSignup}>
            <Text style={tw`text-[#ABABAB] text-sm`}>회원가입</Text>
          </Pressable>
        </View>
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
