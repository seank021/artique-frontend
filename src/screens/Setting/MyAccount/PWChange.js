import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";

import { InputFormInPWChange }from "@forms/InputForm";
import AlertForm from '@forms/AlertForm';

import { currentPWCheck, updatePW } from "@functions/api";
import hash from '@functions/hash';
import * as Cookies from "@functions/cookie";
import { removeAutoLogin } from "@functions/autoLogin";

export default function PWChange ({ isCookie, setGoToFeed }) {
  const nav = useNavigation();

  const goBack = () => {
    nav.goBack();
  }

  const goToPWReset = () => {
    nav.navigate('PWReset');
  }

  const logout = async () => {
    const currentLogin = await Cookies.getCurrentLogin();
    await Cookies.removeCookie(currentLogin);
    await removeAutoLogin();
    setGoToFeed(false);
}
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertImage, setAlertImage] = useState(require('@images/check.png'));
  const [alertText, setAlertText] = useState('비밀번호가 변경되었습니다.');

  const onPressSave = async() => {
    if (password === '') {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('현재 비밀번호를 입력해주세요');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
    } else if (newPassword === '') {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('새 비밀번호를 입력해주세요');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
    } else if (newPassword_ === '') {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('새 비밀번호를 다시 확인해주세요');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
    } else if (newPassword.length < 7) {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('비밀번호 조건을 확인해주세요');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
    } else if (!checkCurrentPW || !checkNewPW) {
      setModalVisible(!modalVisible);
      setAlertImage(require('@images/x_red.png'));
      setAlertText('비밀번호가 일치하지 않습니다');
      setTimeout(() => {
        setModalVisible(modalVisible);
      }, 1000);
    } else if (checkCurrentPW && checkNewPW) {
      const hashedPW = hash(newPassword);
      try {
        updatePW(hashedPW).then((req) => {
          if (req === "banned member") {
            setAlertModalVisible(!modalVisible);
            setAlertImage(require('@images/x_red.png'));
            setAlertText('신고 누적으로 사용이 정지된 회원입니다.');
            setTimeout(() => {
                setModalVisible(modalVisible);
            }, 1000);
            setTimeout(() => {
                logout();
            }, 2000);
            return;
          }
          if (req.success) {
            setModalVisible(!modalVisible);
            setAlertImage(require('@images/check.png'));
            setAlertText('저장되었습니다');
            setTimeout(() => {
              setModalVisible(modalVisible);
            }, 1000);
            nav.navigate('Mypage');
          }
        }).catch((err) => {
          console.log(err);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  const [password, setPassword] = useState('');
  const [checkCurrentPW, setCheckCurrentPW] = useState(false); // 현재 비밀번호가 맞았을 때 체크 표시
  const [XCurrentPW, setXCurrentPW] = useState(false); // 현재 비밀번호가 틀렸을 때 [X] 표시
  
  const ifPWCorrect = (text) => {
    currentPWCheck(hash(text)).then((res) => {
      if (res === "banned member") {
        setAlertModalVisible(!modalVisible);
        setAlertImage(require('@images/x_red.png'));
        setAlertText('신고 누적으로 사용이 정지된 회원입니다.');
        setTimeout(() => {
            setModalVisible(modalVisible);
        }, 1000);
        setTimeout(() => {
            logout();
        }, 2000);
        return;
      }
      if (res) {
        setCheckCurrentPW(true);
        setXCurrentPW(false);
      } else {
        setCheckCurrentPW(false);
        setXCurrentPW(true);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  const [newPassword, setNewPassword] = useState('');
  const [newPassword_, setNewPassword_] = useState(''); // 새 비밀번호 확인
  const [checkNewPW, setCheckNewPW] = useState(false); // 새 비밀번호가 맞았을 때 체크 표시
  const [XNewPW, setXNewPW] = useState(false); // 새 비밀번호가 틀렸을 때 [X] 표시
  
  const comparePW = (text) => {
    if (newPassword_!== '') {
      if (text === newPassword_) {
        setCheckNewPW(true);
        setXNewPW(false);
      } else {
        setCheckNewPW(false);
        setXNewPW(true);
      }
    } else {
      setCheckNewPW(false);
      setXNewPW(false);
    }
  }

  const comparePW_ = (text) => {
    if (newPassword !== '') {
      if (text === newPassword) {
        setCheckNewPW(true);
        setXNewPW(false);
      } else {
        setCheckNewPW(false);
        setXNewPW(true);
      }
    } else {
      setCheckNewPW(false);
      setXNewPW(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <AlertForm modalVisible={alertModalVisible} setModalVisible={setAlertModalVisible} borderColor="#F5F8F5" bgColor="#F5F8F5" image={alertImage} textColor="#191919" text={alertText}></AlertForm>
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
          <Text style={tw`text-[#191919] text-base font-medium`}>비밀번호 변경</Text>
          <Pressable onPress={onPressSave} style={tw`flex-row`}>
              <Text style={tw`text-[#191919] text-sm font-normal`}>저장</Text>
              <View style={tw`mr-[20px]`}></View>
          </Pressable>
      </View>
      <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>

      {/* 현재 비밀번호 확인 */}
      <View style={tw`self-center items-center w-[90%] mt-[90px]`}>
        <InputFormInPWChange
          image={require('@images/password.png')}
          placeholder={'현재 비밀번호를 입력해주세요'}
          secureTextEntry={true}
          setValue={setPassword}
          compareValue={ifPWCorrect}
          ifCheck={checkCurrentPW}
          ifX={XCurrentPW}
          style={tw`mb-2.5`}
        ></InputFormInPWChange>
      </View>

      {/* 새 비밀번호 */}
      <View style={tw`self-center items-center w-[90%] mt-[50px]`}>
        <InputFormInPWChange
          image={require('@images/password.png')}
          placeholder={'새 비밀번호를 입력해주세요 (7자 이상)'}
          secureTextEntry={true}
          setValue={setNewPassword}
          compareValue={comparePW}
          style={tw`mb-2.5`}
        ></InputFormInPWChange>
      </View>

      {/* 새 비밀번호 확인 */}
      <View style={tw`self-center items-center w-[90%] mt-[30px]`}>
        <InputFormInPWChange
          image={require('@images/password.png')}
          placeholder={'새 비밀번호를 다시 확인해주세요'}
          secureTextEntry={true}
          setValue={setNewPassword_}
          compareValue={comparePW_}
          ifCheck={checkNewPW}
          ifX={XNewPW}
          style={tw`mb-2.5`}
        ></InputFormInPWChange>
      </View>

      {/* 비밀번호 까먹었을 떄 */}
      <Pressable onPress={goToPWReset} style={tw`self-center items-center mt-[57px]`}>
        <Text style={tw`text-[#B6B6B6] text-[10px] underline font-normal`}>비밀번호를 잊으셨나요?</Text>
      </Pressable>
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
