import React, {useEffect} from 'react';
import {View, Text, Image, Pressable, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';

import * as KakaoLogin from '@react-native-seoul/kakao-login';
import {GoogleSignin} from 'react-native-google-signin';
// import appleAuth from '@invertase/react-native-apple-authentication';

import axios from 'axios';

import * as Cookies from '@functions/cookie';

import {useNavigation} from '@react-navigation/native';

import ButtonForm from '@forms/ButtonForm';

export default function Login1({setGoToFeed}) {
  const nav = useNavigation();

  // useEffect(() => {
  //     return appleAuth.onCredentialRevoked(async () => {
  //         console.warn('If this function executes, User Credentials have been Revoked',);
  //     });
  // }, []);

  onPressLookAround = () => {
    Cookies.clearCookie();
    setGoToFeed(true);
  };

  onPressLogin = () => {
    nav.navigate('Login2');
  };

  onPressKakao = async () => {
    try {
      const result = await KakaoLogin.login();
      console.log(result);
      console.log(result.accessToken);
      const response = await axios.post('http://3.39.145.210/member/oauth', {
        thirdPartyName: 'kakao',
        token: result.accessToken,
      });
      console.log(response.data.userId);
      console.log(response.headers['set-cookie']);
      try {
        Cookies.setCookie('kakao', response.headers['set-cookie']);
        setGoToFeed(true);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  onPressGoogle = async () => {
    GoogleSignin.configure({
      webClientId:
        '1001943377543-q3ed3vrdtg2hhmc8edp88c6eggh48bcs.apps.googleusercontent.com',
      offlineAccess: true,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      console.log(userInfo.idToken);
      const response = await axios.post('http://3.39.145.210/member/oauth', {
        thirdPartyName: 'google',
        token: userInfo.idToken,
      });
      console.log(response.data.userId);
      console.log(response.headers['set-cookie']);
      try {
        Cookies.setCookie('google', response.headers['set-cookie']);
        setGoToFeed(true);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  onPressApple = async () => {
    // try {
    //     const appleAuthRequestResponse = await appleAuth.performRequest({
    //         requestedOperation: appleAuth.Operation.LOGIN,
    //         requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    //     });
    //     console.log('appleAuthRequestResponse: ', appleAuthRequestResponse);
    //     const response = await axios.post('http://3.39.145.210/member/oauth', {
    //         thirdPartyName: 'apple',
    //         token: appleAuthRequestResponse.identityToken,
    //     });
    //     console.log(response.data.userId);
    //     console.log(response.headers['set-cookie']);
    //     try {
    //         Cookies.setCookie("apple", response.headers["set-cookie"]);
    //         setGoToFeed(true);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // } catch (err) {
    //     console.log(err);
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={tw`h-[63%] items-center justify-center`}>
        <Image
          style={{width: 230, height: 88}}
          source={require('@images/logo(h).png')}
        />
      </View>

      <View style={tw`h-[7%]`}>
        <ButtonForm
          borderColor="#E94A4B"
          textColor="#F5F5F5"
          text="로그인 전 둘러보기"
          onPress={onPressLookAround}></ButtonForm>
      </View>
      <View style={tw`h-[7%]`}>
        <ButtonForm
          borderColor="#E94A4B"
          bgColor="#E94A4B"
          textColor="#F5F5F5"
          text="로그인"
          onPress={onPressLogin}></ButtonForm>
      </View>

      <View
        style={tw`w-[90%] h-[5%] flex-row justify-around self-center items-center`}>
        <Image source={require('@images/vector.png')} style={tw`w-[25%]`} />
        <Text style={tw`text-[#FFFFFF] text-sm`}>SNS 계정으로 계속하기</Text>
        <Image source={require('@images/vector.png')} style={tw`w-[25%]`} />
      </View>

      <View style={tw`w-[70%] h-[10%] flex-row justify-around self-center`}>
        <Pressable onPress={onPressKakao}>
          <Image
            style={{width: 48, height: 48}}
            source={require('@images/kakaotalk(h).png')}
          />
        </Pressable>
        <Pressable onPress={onPressGoogle}>
          <Image
            style={{width: 48, height: 48}}
            source={require('@images/google(h).png')}
          />
        </Pressable>
        <Pressable onPress={onPressApple}>
          <Image
            style={{width: 48, height: 48}}
            source={require('@images/apple(h).png')}
          />
        </Pressable>
      </View>
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
});
