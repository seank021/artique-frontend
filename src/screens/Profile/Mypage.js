import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";
import { ShortReviewFormInMypage } from "@forms/ReviewForm";
import AverageScoreForm from "@forms/AverageScoreForm";

import { memberSummary, memberStatistics } from "@functions/api";

export default function Mypage ({ isCookie }) {
  const nav = useNavigation();

  const goToChangeProfile = () => {
    nav.navigate('ChangeProfile');
  }

  const goToMyReviews = () => {
    nav.navigate('MyReviews');
  }

  const [memberInfo, setMemberInfo] = useState({});
  const [memberRates, setMemberRates] = useState({});
  const [averageRate, setAverageRate] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [maxRate, setMaxRate] = useState(0);

  useEffect(() => {
    memberSummary().then((newMemberInfo) => {
      setMemberInfo(() => newMemberInfo);
      console.log(newMemberInfo)
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  
  useEffect(() => {
    memberStatistics().then((newMemberRates) => {
      setMemberRates(() => newMemberRates.statistic);
      setAverageRate(() => newMemberRates.averageRate);
      setReviewCount(() => newMemberRates.totalReviewCount);
      setMaxRate(() => newMemberRates.maxStarRate);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 바 */}
      <View style={tw`flex-row justify-between items-center mx-5 my-5`}>
        <Text style={tw`text-lg text-[#191919] font-medium`}>마이페이지</Text>
        <View style={tw`flex-row`}>
          <Pressable onPress={goToChangeProfile}>
            <Image source={require('@images/profilechange.png')} style={tw`w-[18px] h-[18px] mr-4.5`}></Image>
          </Pressable>
          <Image source={require('@images/settings.png')} style={tw`w-[18px] h-[18px]`}></Image>
        </View>
      </View>
      <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>

      {/* 프로필 */}
      <View style={tw`flex-row items-center w-9/10 mt-5 mx-5`}>
        <Image source={require('@images/newprofile.png')} style={tw`w-[100px] h-[100px] mr-5`}></Image>
        <View style={tw`flex-col justify-between`}>
          <Text style={tw`text-base text-[#191919] font-medium mb-5`}>{memberInfo.nickname}</Text>
          <Text style={tw`text-xs text-[#191919] font-normal w-57.5 leading-5`}>나에 대한 소개를 작성할 수 있는 칸입니다. 글자수 제한은 두 줄에 들어가는 50자로 할까요?</Text>
        </View>
      </View>
      <Pressable onPress={goToMyReviews} style={tw`self-center w-9/10 h-[33px] mt-[25px] rounded-3xl bg-[#FFF] shadow`}>
        <Text style={tw`text-xs text-[#191919] font-normal text-center leading-[33px]`}>작성한 리뷰 모아보기</Text>
      </Pressable>
        
      {/* 평점 */}
      <View style={tw`mt-7.5 ml-5`}>
        <Text style={tw`mb-2`}>
          <Text style={tw`text-sm text-[#191919] font-medium`}>지친 오혜령</Text>
          <Text style={tw`text-sm text-[#191919] font-normal`}> 님은</Text>
        </Text>
        <Text style={tw`items-center`}>
          <Text style={tw`text-xs text-[#191919] font-normal`}>냉정하게 별점을 매기는</Text>
          <Text style={tw`text-sm text-[#191919] font-medium`}> '짠돌이 파'</Text>
        </Text>
      </View>
      {/* <View>
        {makeBarChart()}
      </View> */}
      <View style={tw`flex-row justify-between mt-3 mx-5`}>
        <View style={tw`flex-col items-center`}>
          <Text style={tw`text-xs text-[#191919] font-normal`}>별점 평균</Text>
          <Text style={tw`text-xs text-[#191919] font-normal`}>2.0</Text>
        </View>
        <View style={tw`flex-col items-center`}>
          <Text style={tw`text-xs text-[#191919] font-normal`}>작성한 리뷰 수</Text>
          <Text style={tw`text-xs text-[#191919] font-normal`}>51</Text>
        </View>
        <View style={tw`flex-col items-center`}>
          <Text style={tw`text-xs text-[#191919] font-normal`}>많이 준 별점</Text>
          <Text style={tw`text-xs text-[#191919] font-normal`}>2.0</Text>
        </View>
      </View>

      {/* 공감한 한줄평 */}
      <View style={tw`flex-row justify-between mt-11.5 mx-5`}>
        <Text style={tw`text-sm text-[#191919] font-medium`}>공감한 한줄평</Text>
        <Pressable onPress={console.log('내가 공감한 review 전체보기')} style={tw`w-[50px] h-[21px]`}>
          <Text style={tw`text-xs text-[#191919] font-normal`}>전체보기</Text>
        </Pressable>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={tw`mt-3 ml-5`}>
        <ShortReviewFormInMypage />
        <ShortReviewFormInMypage />
        <ShortReviewFormInMypage />
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FAFAFA',
    },
});