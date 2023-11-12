// TODO: 중복확인 버튼 스타일 변화 onFocus에 적용 (InputForm, ButtonForm 수정)

import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

import axios from 'axios';

import hash from '@functions/hash';
import * as Cookies from '@functions/cookie';

import { useNavigation } from '@react-navigation/native';

import InputForm from '@forms/InputForm';
import AlertForm, { ContractForm, EmailVerityForm } from '@forms/AlertForm';

export default function Login1() {
  const nav = useNavigation();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [password_, setPassword_] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [contractModal1Visible, setContractModal1Visible] = useState(false);
  const [contractModal2Visible, setContractModal2Visible] = useState(false);

  const [ifButtonID, setIfButtonID] = useState(true);
  const [ifCheckID, setIfCheckID] = useState(false);

  const [borderColor, setBorderColor] = useState('#ABABAB');
  const [buttonColor, setButtonColor] = useState('#3A3D52');
  const [buttonTextColor, setButtonTextColor] = useState('#ABABAB');
  const [buttonText, setButtonText] = useState('중복확인');

  const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
  const [alertText, setAlertText] = useState('사용 불가한 이메일입니다');

  const [ifCheckPW, setIfCheckPW] = useState(false);
  const [ifXPW, setIfXPW] = useState(false);

  const [opacityBorder, setOpacityBorder] = useState('#ABABAB');
  const [opacityBg, setOpacityBg] = useState('#3A3D52');
  const [textColor, setTextColor] = useState('#ABABAB');
  const [verifyEmailModalVisible, setVerifyEmailModalVisible] = useState(false);  
  const [ifClearedVerificationStage, setIfClearedVerificationStage] = useState(false);

  const [rectangle1, setRectangle1] = useState(
    require('@images/rectangle.png'),
  );
  const [rectangle2, setRectangle2] = useState(
    require('@images/rectangle.png'),
  );

  const checkRectangle1 = () => {
    if (rectangle1 === require('@images/rectangle.png')) {
      setRectangle1(require('@images/rectangle_checked.png'));
    } else {
      setRectangle1(require('@images/rectangle.png'));
    }
  };

  const checkRectangle2 = () => {
    if (rectangle2 === require('@images/rectangle.png')) {
      setRectangle2(require('@images/rectangle_checked.png'));
    } else {
      setRectangle2(require('@images/rectangle.png'));
    }
  };

  const goBack = () => {
    nav.goBack();
  };

  const nullFunc = () => {
    return;
  };

  const reappearButton = () => {
    setBorderColor('#ABABAB');
    setIfButtonID(true);
  };

  let ifDuplicate = false;

  const checkDuplicate = async () => {
    try {
      const response = await axios.get(
        `http://3.39.145.210/member/duplicate?member-id=${id}`,
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.data.code);
      if (error.response.data.code === 'DUPLICATE_LOGIN_ID') {
        ifDuplicate = true;
      }
    }

    if (id === '') {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('이메일을 입력해주세요');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
    } else if (ifDuplicate) {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('사용 불가한 이메일입니다');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
    } else {
      setBorderColor('#F5F8F5');
      setButtonColor('#F5F8F5');
      setButtonTextColor('#191919');

      setModalVisible(!modalVisible);
      setAlertImage(require('@images/check.png'));
      setAlertText('사용 가능한 이메일입니다');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);

      setIfButtonID(false);
      setIfCheckID(true);
    }
  };

  const comparePW = text => {
    if (password_ !== '') {
      if (text === password_) {
        setIfCheckPW(true);
        setIfXPW(false);
      } else {
        setIfCheckPW(false);
        setIfXPW(true);
      }
    } else {
      setIfCheckPW(false);
      setIfXPW(false);
    }
  };

  const comparePW_ = text => {
    if (password !== '') {
      if (text === password) {
        setIfCheckPW(true);
        setIfXPW(false);
      } else {
        setIfCheckPW(false);
        setIfXPW(true);
      }
    } else {
      setIfCheckPW(false);
      setIfXPW(false);
    }
  };

  const onPressContract1 = () => {
    setContractModal1Visible(!contractModal1Visible);
  };

  const onPressContract2 = () => {
    setContractModal2Visible(!contractModal2Visible);
  };

  const finalSignupFunction = async () => {
    console.log(ifCheckID);
    console.log(ifCheckPW);
    console.log(rectangle1 === require('@images/rectangle_checked.png'));
    console.log(rectangle2 === require('@images/rectangle_checked.png'));
    console.log(ifClearedVerificationStage);
    
    if (ifCheckID && ifCheckPW && rectangle1 === require('@images/rectangle_checked.png') && rectangle2 === require('@images/rectangle_checked.png') && ifClearedVerificationStage) {
      const hashedPW = hash(password);
      Cookies.clearCookie();
      try {
        const response = await axios.post('http://3.39.145.210/member/join', {
          memberId: id,
          memberPW: hashedPW,
        });
        console.log(response.data);
        nav.navigate('Login2');
      } catch (error) {
        console.log(error.response.data.code);
      }
    } else {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('다시 시도해주세요');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
    }
  };

  useEffect(() => {
    if (ifClearedVerificationStage)
      finalSignupFunction();
  }, [ifClearedVerificationStage]);

  const onPressEmailVerify = () => {
    if (id === '') {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('이메일을 입력해주세요');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
      return;
    }
    if (password.length < 7) {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('비밀번호 조건을 확인해주세요');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
      return;
    }
    if (password === '') {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('비밀번호를 입력해주세요');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
      return;
    }
    if (password_ === '') {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('비밀번호를 확인해주세요');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
      return;
    }

    if (!ifCheckID) {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('이메일 중복확인을 해주세요');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
      return;
    }

    if (!ifCheckPW) {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('비밀번호가 일치하지 않습니다');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
      return;
    }

    if (
      rectangle1 !== require('@images/rectangle_checked.png') ||
      rectangle2 !== require('@images/rectangle_checked.png')
    ) {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('약관에 동의해주세요');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
      return;
    }

    setVerifyEmailModalVisible(!verifyEmailModalVisible);
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
        <Pressable onPress={goBack} style={tw`flex-row items-center`}>
          <Image
            source={require('@images/chevron_left.png')}
            style={tw`mx-[10px] w-[10px] h-[18px]`}></Image>
          <Text style={tw`text-[#F5F8F5] text-sm`}>로그인</Text>
        </Pressable>
        <Text style={tw`text-[#F5F8F5] text-lg`}>회원가입</Text>
        <View style={tw`flex-row`}>
          <Image
            source={require('@images/chevron_left.png')}
            style={tw`mr-[10px] w-[10px] h-[18px] tint-[#3A3D52]`}></Image>
          <Text style={tw`text-[#3A3D52] text-sm mr-2`}>로그인</Text>
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
          reappearButton={reappearButton}
          ifButton={ifButtonID}
          borderColor={borderColor}
          buttonColor={buttonColor}
          buttonTextColor={buttonTextColor}
          buttonText={buttonText}
          onPressButton={checkDuplicate}
          ifCheck={ifCheckID}
          style={tw`mb-2.5`}></InputForm>
        <InputForm
          image={require('@images/password.png')}
          placeholder={'비밀번호를 설정해주세요 (7자 이상)'}
          secureTextEntry={true}
          setValue={setPassword}
          compareValue={comparePW}
          reappearButton={nullFunc}
          style={tw`mb-2.5`}></InputForm>
        <InputForm
          image={require('@images/password.png')}
          placeholder={'비밀번호를 다시 확인해주세요'}
          secureTextEntry={true}
          setValue={setPassword_}
          compareValue={comparePW_}
          reappearButton={nullFunc}
          ifCheck={ifCheckPW}
          ifX={ifXPW}
          style={tw`mb-2.5`}></InputForm>

        <View style={tw`flex-row items-center self-start ml-[5%] mt-2.5 mb-1`}>
          <Pressable onPress={checkRectangle1}>
            <Image source={rectangle1} style={tw`mr-2 w-[16px] h-[16px]`}></Image>
          </Pressable>
          <Pressable onPress={onPressContract1}>
            <Text style={tw`text-[#ABABAB] text-sm underline`}>이용약관 (필수)</Text>
          </Pressable>
          <ContractForm modalVisible={contractModal1Visible} setModalVisible={setContractModal1Visible} contractNum={1}></ContractForm>
        </View>
        <View style={tw`flex-row items-center self-start ml-[5%] mt-1 mb-4.5`}>
          <Pressable onPress={checkRectangle2}>
            <Image source={rectangle2} style={tw`mr-2 w-[16px] h-[16px]`}></Image>
          </Pressable>
          <Pressable onPress={onPressContract2}>
            <Text style={tw`text-[#ABABAB] text-sm underline`}>
              개인정보 처리 방침 (필수)
            </Text>
          </Pressable>
          <ContractForm modalVisible={contractModal2Visible} setModalVisible={setContractModal2Visible} contractNum={2}></ContractForm>
        </View>

        <Pressable onPress={onPressEmailVerify} style={tw`w-[90%] h-[46px] border-solid border-2 rounded-3xl self-center justify-center items-center border-[${opacityBorder}] bg-[${opacityBg}]`} ifOpacity={true} onPressIn={() => { setOpacityBorder("#F5F8F5"); setOpacityBg("#F5F8F5"); setTextColor("#191919"); }} onPressOut={() => { setOpacityBorder("#ABABAB"); setOpacityBg("#3A3D52"); setTextColor("#ABABAB"); }}>
            <Text style={tw`font-semibold text-lg text-[${textColor}]`}>본인인증 후 가입하기</Text>
        </Pressable>
        <EmailVerityForm modalVisible={verifyEmailModalVisible} setModalVisible={setVerifyEmailModalVisible} setIfClearedVerificationStage={setIfClearedVerificationStage}></EmailVerityForm>
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
