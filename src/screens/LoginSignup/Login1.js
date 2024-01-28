import React, {useState, useEffect} from 'react';
import {View, Text, Image, Pressable, StyleSheet, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';

import * as KakaoLogin from '@react-native-seoul/kakao-login';
import {GoogleSignin} from 'react-native-google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';

import axios from 'axios';

import * as Cookies from '@functions/cookie';
import { setAutoLogin } from '@functions/autoLogin';
import { setIfCheckedContractsInSocialLogin, getIfCheckedContractsInSocialLogin } from '@functions/contract';
import { getPort } from '@functions/port';

import {useNavigation} from '@react-navigation/native';

import ButtonForm from '@forms/ButtonForm';
import { ContractAlertForm } from '@forms/AlertForm';

export default function Login1({setGoToFeed}) {
  const nav = useNavigation();
  const PORT = getPort();

  const [contractAlertFormVisible, setContractAlertFormVisible] = useState(false);

  const [ifChecked1, setIfChecked1] = useState(false);
  const [ifChecked2, setIfChecked2] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [loginMethod, setLoginMethod] = useState('');

  useEffect(() => {
    if (Platform.OS === 'ios') {
      return appleAuth.onCredentialRevoked(async () => {
          console.warn('If this function executes, User Credentials have been Revoked',);
      });
    }
  }, []);

  onPressLookAround = () => {
    Cookies.clearCookie();
    setGoToFeed(true);
  };

  onPressLogin = () => {
    nav.navigate('Login2');
  };

  useEffect(() => {
    if (isAllChecked) {
      if (loginMethod === 'kakao') onPressKakao();
      else if (loginMethod === 'google') onPressGoogle();
      else if (loginMethod === 'apple') onPressApple();
    }
  }, [ifChecked1, ifChecked2, isAllChecked]);

  onPressKakao = async () => {
    setLoginMethod('kakao');
    Cookies.removeCookie('currentLogin');

    const seeModal = await getIfCheckedContractsInSocialLogin("Kakao");

    if (seeModal === 'true') {
      try {
        const result = await KakaoLogin.login();
        const response = await axios.post(`${PORT}/member/oauth`, {
          thirdPartyName: 'kakao',
          token: result.accessToken,
        });
        console.log(response.data.userId);
        console.log(response.headers['authorization']);
        try {
          Cookies.setCookie('kakao', response.headers['authorization']);
          Cookies.setCookie('currentLogin', 'kakao');
          setAutoLogin(true);
          setIfCheckedContractsInSocialLogin(true, "Kakao");
          setGoToFeed(true);
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    }
    else {
      setContractAlertFormVisible(!contractAlertFormVisible);

      if (ifChecked1 && ifChecked2) {
        try {
          const result = await KakaoLogin.login();
          const response = await axios.post(`${PORT}/member/oauth`, {
            thirdPartyName: 'kakao',
            token: result.accessToken,
          });
          console.log(response.data.userId);
          console.log(response.headers['authorization']);
          try {
            Cookies.setCookie('kakao', response.headers['authorization']);
            Cookies.setCookie('currentLogin', 'kakao');
            setAutoLogin(true);
            setIfCheckedContractsInSocialLogin(true, "Kakao");
            setGoToFeed(true);
          } catch (err) {
            console.log(err);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  onPressGoogle = async () => {
    setLoginMethod('google');
    Cookies.removeCookie('currentLogin');

    const seeModal = await getIfCheckedContractsInSocialLogin("Google");

    if (seeModal === 'true') {
      GoogleSignin.configure({
        webClientId:
          '1001943377543-q3ed3vrdtg2hhmc8edp88c6eggh48bcs.apps.googleusercontent.com',
        iosClientId:
          '1001943377543-qs201dq0br81qia9j80b2bdi2b1q0rfj.apps.googleusercontent.com',
        offlineAccess: true,
      });

      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const response = await axios.post(`${PORT}/member/oauth`, {
          thirdPartyName: 'google',
          token: userInfo.idToken,
        });
        console.log(response.data.userId);
        console.log(response.headers['authorization']);
        try {
          Cookies.setCookie('google', response.headers['authorization']);
          Cookies.setCookie('currentLogin', 'google');
          setAutoLogin(true);
          setIfCheckedContractsInSocialLogin(true, "Google");
          setGoToFeed(true);
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err.response.data);
      }
    }
    else {
      setContractAlertFormVisible(!contractAlertFormVisible);

      if (ifChecked1 && ifChecked2) {
        GoogleSignin.configure({
          webClientId:
            '1001943377543-q3ed3vrdtg2hhmc8edp88c6eggh48bcs.apps.googleusercontent.com',
          iosClientId:
            '1001943377543-qs201dq0br81qia9j80b2bdi2b1q0rfj.apps.googleusercontent.com',
          offlineAccess: true,
        });

        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          const response = await axios.post(`${PORT}/member/oauth`, {
            thirdPartyName: 'google',
            token: userInfo.idToken,
          });
          console.log(response.data.userId);
          console.log(response.headers['authorization']);
          try {
            Cookies.setCookie('google', response.headers['authorization']);
            Cookies.setCookie('currentLogin', 'google');
            setAutoLogin(true);
            setIfCheckedContractsInSocialLogin(true, "Google");
            setGoToFeed(true);
          } catch (err) {
            console.log(err);
          }
        } catch (err) {
          console.log(err.response.data);
        }
      }
    }
  };

  onPressApple = async () => {
    if (Platform.OS === 'ios') {
      Cookies.removeCookie('currentLogin');
      setLoginMethod('apple');

      const seeModal = await getIfCheckedContractsInSocialLogin("Apple");

      if (seeModal === 'true') {
        try {
          const appleAuthRequestResponse = await appleAuth.performRequest({
              requestedOperation: appleAuth.Operation.LOGIN,
              requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
          });
          console.log('appleAuthRequestResponse: ', appleAuthRequestResponse);
          const response = await axios.post(`${PORT}/member/oauth`, {
              thirdPartyName: 'apple',
              token: appleAuthRequestResponse.identityToken,
          });
          console.log(response.data.userId);
          console.log(response.headers['authorization']);
          try {
              Cookies.setCookie("apple", response.headers["authorization"]);
              Cookies.setCookie("currentLogin", "apple");
              setAutoLogin(true);
              setIfCheckedContractsInSocialLogin(true, "Apple");
              setGoToFeed(true);
          } catch (err) {
            console.log(err);
          }
        } catch (err) {
          console.log(err);
        }
      }
      else {
        setContractAlertFormVisible(!contractAlertFormVisible);

        if (ifChecked1 && ifChecked2) {
          try {
              const appleAuthRequestResponse = await appleAuth.performRequest({
                  requestedOperation: appleAuth.Operation.LOGIN,
                  requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
              });
              console.log('appleAuthRequestResponse: ', appleAuthRequestResponse);
              const response = await axios.post(`${PORT}/member/oauth`, {
                  thirdPartyName: 'apple',
                  token: appleAuthRequestResponse.identityToken,
              });
              console.log(response.data.userId);
              console.log(response.headers['authorization']);
              try {
                  Cookies.setCookie("apple", response.headers["authorization"]);
                  Cookies.setCookie("currentLogin", "apple");
                  setAutoLogin(true);
                  setIfCheckedContractsInSocialLogin(true, "Apple");
                  setGoToFeed(true);
              } catch (err) {
                  console.log(err);
              }
          } catch (err) {
              console.log(err);
          }
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={tw`h-[63%] items-center justify-center`}>
        <Image
          style={{width: 230, height: 88}}
          source={require('@images/logo.png')}
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
        <Image source={require('@images/vector.png')} style={tw`w-[25%] h-[2px] tint-[#F5F8F5]`} />
        <Text style={tw`text-[#FFFFFF] text-sm`}>SNS 계정으로 계속하기</Text>
        <Image source={require('@images/vector.png')} style={tw`w-[25%] h-[2px] tint-[#F5F8F5]`} />
      </View>

      <View style={tw`w-[70%] h-[10%] flex-row justify-around self-center`}>
        <ContractAlertForm modalVisible={contractAlertFormVisible} setModalVisible={setContractAlertFormVisible} ifChecked1={ifChecked1} ifChecked2={ifChecked2} setIfChecked1={setIfChecked1} setIfChecked2={setIfChecked2} setIsAllChecked={setIsAllChecked} />
        <Pressable onPress={onPressKakao}>
          <Image
            style={{width: 48, height: 48}}
            source={require('@images/kakaotalk.png')}
          />
        </Pressable>
        <Pressable onPress={onPressGoogle}>
          <Image
            style={{width: 48, height: 48}}
            source={require('@images/google.png')}
          />
        </Pressable>
        <Pressable onPress={onPressApple}>
          <Image
            style={{width: 48, height: 48}}
            source={require('@images/apple.png')}
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
