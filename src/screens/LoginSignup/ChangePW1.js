// TODO: 요청하기 버튼 로직 구현

import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';

import {useNavigation} from '@react-navigation/native';
import ButtonForm from '@forms/ButtonForm';

export default function Login1() {
  const nav = useNavigation();

  const goBack = () => {
    nav.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={tw`flex-row items-center justify-between mt-5 mb-3`}>
        <Pressable onPress={goBack} style={tw`flex-row items-center`}>
          <Image
            source={require('@images/chevron_left.png')}
            style={tw`mx-[10px] w-[10px] h-[18px]`}></Image>
          <Text style={tw`text-[#F5F8F5] text-sm`}>로그인</Text>
        </Pressable>
        <Text style={tw`text-[#F5F8F5] text-lg`}>비밀번호 재설정</Text>
        <View style={tw`flex-row`}>
          <Image
            source={require('@images/chevron_left.png')}
            style={tw`mr-[10px] w-[10px] h-[18px] tint-[#3A3D52]`}>
          </Image>
          <Text style={tw`text-[#3A3D52] text-sm mr-2`}>로그인</Text>
        </View>
      </View>
      <View style={tw`border-solid border-b border-[#323546]`}></View>

      <Image
        source={require('@images/logo_small.png')}
        style={tw`self-center mt-7 mb-7 w-[110px] h-[38px]`}>
      </Image>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={tw`text-[#F5F8F5] text-sm self-center text-center mb-7`}>가입하신 메일 주소를 입력해주세요.{'\n'}초기화된 비밀번호를 보내드리겠습니다.</Text>

        <View style={tw`flex-row items-center w-[90%] justify-start mb-10`}>
          <Text style={tw`text-[#F5F8F5] text-sm w-[15%]`}>이메일 : </Text>
          <TextInput placeholder='이메일을 입력해주세요' placeholderTextColor="#ABABAB" inputMode='email' color="#F5F8F5" style={tw`border-b-[1px] border-[#ABABAB] w-[85%]`}></TextInput>
        </View>

        {/* <View style={tw`flex-row items-center w-[90%] justify-start mb-10`}>
          <Text style={tw`text-[#F5F8F5] text-sm w-[15%]`}>메일 : </Text>
          <TextInput placeholder='새 비밀번호를 받을 메일을 입력해주세요' placeholderTextColor="#ABABAB" inputMode='email' color="#F5F8F5" style={tw`border-b-[1px] border-[#ABABAB] w-[85%]`}></TextInput>
        </View> */}

        <ButtonForm
          borderColor="#ABABAB"
          textColor="#ABABAB"
          text={'요청하기'}
          onPress={()=>Alert.alert("요청 로직 구현")}
          ifOpacity={true}></ButtonForm>
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
