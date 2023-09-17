// TODO: 자동로그인 기능 구현

import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';

import axios from 'axios';

import hash from '@functions/hash';
import * as Cookies from '@functions/cookie';

import {useNavigation} from '@react-navigation/native';

import InputForm from '@forms/InputForm';
import ButtonForm from '@forms/ButtonForm';
import AlertForm from '@forms/AlertForm';

export default function Login1({setGoToFeed, setIsCookie}) {
  const nav = useNavigation();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
  const [alertText, setAlertText] = useState('다시 시도해주세요.');

  const [rectangle, setRectangle] = useState(require('@images/rectangle.png'));

  const checkRectangle = () => {
    if (rectangle === require('@images/rectangle.png')) {
      setRectangle(require('@images/rectangle_checked.png'));
    } else {
      setRectangle(require('@images/rectangle.png'));
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
      setAlertText('아이디를 입력해주세요.');
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
    try {
      const response = await axios.post('http://3.39.145.210/member/login', {
        memberId: id,
        memberPW: hashedPW,
      });

      if (response.data.success === true) {
        console.log('로그인 성공');
        console.log(response.headers['set-cookie']);
        try {
          Cookies.setCookie('general', response.headers['set-cookie']);
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
        setAlertText('아이디가 틀렸습니다.');
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
        <Pressable onPress={goBack}>
          <Image
            source={require('@images/x.png')}
            style={tw`ml-[10px] w-[20px] h-[20px]`}></Image>
        </Pressable>
        <Text style={tw`text-[#F5F8F5] text-lg`}>로그인</Text>
        <Image
          source={require('@images/x.png')}
          style={tw`mr-[10px] w-[20px] h-[20px] tint-[#3A3D52]`}></Image>
      </View>
      <View style={tw`border-solid border-b border-[#323546]`}></View>

      <Image
        source={require('@images/logo_small.png')}
        style={tw`self-center mt-7 mb-7 w-[110px] h-[38px]`}></Image>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <InputForm
          image={require('@images/id.png')}
          placeholder={'아이디를 입력해주세요'}
          setValue={setId}
          compareValue={nullFunc}
          reappearButton={nullFunc}></InputForm>
        <InputForm
          image={require('@images/password.png')}
          placeholder={'비밀번호를 입력해주세요'}
          secureTextEntry={true}
          setValue={setPassword}
          compareValue={nullFunc}
          reappearButton={nullFunc}></InputForm>

        <View style={tw`w-[90%] flex-row items-center mt-2.5 mb-4.5`}>
          <Pressable onPress={checkRectangle}>
            <Image source={rectangle} style={tw`mr-2 w-[16px] h-[16px]`}></Image>
          </Pressable>
          <Text style={tw`text-[#ABABAB] text-sm`}>자동로그인</Text>
        </View>

        <ButtonForm
          borderColor="#ABABAB"
          textColor="#ABABAB"
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
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: '90%',
  },
});
