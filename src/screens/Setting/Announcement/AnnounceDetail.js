import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";

export default function AnnounceDetail ({isCookie}) {
  const nav = useNavigation();

  const goBack = () => {
    nav.goBack();
  }

  const goToDocument = () => {
    nav.navigate('AnnounceDetail');
  }

  return (
    <SafeAreaView style={styles.container}>
        {/* 상단 바 */}
        <View style={tw`flex-row justify-between items-center mt-5 mb-[14px]`}>
          <Pressable onPress={goBack} style={tw`flex-row`}>
              <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] w-[10px] h-[18px] tint-[#191919]`}></Image>
          </Pressable>
          <Text style={tw`text-[#191919] text-base font-medium`}>공지사항</Text>
          <View style={tw`mr-[20px]`}></View>
        </View>
        <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>

        <ScrollView style={tw`flex-col`} showsVerticalScrollIndicator={false}>
          {/* 공지정보 */}
          <View style={tw`flex-col justify-center h-[90px] mx-5`}>
            <Text style={tw`text-base text-[#191919] font-normal mb-[10px]`}>공지 제목</Text>
            <Text style={tw`text-xs text-[#B6B6B6] font-normal`}>작성 날짜</Text>
          </View>
          <View style={tw`border-b border-[#E5E6E5]`}></View>

          {/* 공지내용 */}
          <View style={tw`flex-col my-5 mx-5`} showsVerticalScrollIndicator={false}>
            <Text style={tw`text-xs text-[#191919] font-normal leading-[23px]`}>
              … 스타트업레시피 데이터에 따르면 현재 기준으로 올해 에듀테크 분야에 유입된 자금은 400억 원이 채 되지 않는 것으로 나타났는데요. 최대 투자금도 100억 원을 상회 하는 등 다른 분야보다 더 적은 금액이 유입됐습니다.

  …

  이런 감소는 경기침체로 인한 전체 투자 감소와 관련이 있지만 팬데믹이 끝나면서 온라인 학습에 대한 수요 감소와 성장성에 대한 의문도 영향을 미친 것으로 보입니다. 또 수익성을 증명한 스타트업이 없다는 것도 투자를 주저하는 이유 중 하나입니다.

  그 중에서도 투자 호황기 가장 많은 자금을 끌어갔던 취미 기반 온라인 교육 플랫폼 부진은 시장 전체에 영향을 주고 있습니다. 유니콘을 노리던 클래스101는 강도 높은 구조 조정에도 최근 임대료 미지급으로 구설수에 올랐고 탈잉은 최근 흑자 소식을 전했지만 직원 대다수를 정리하며 사업을 축소했죠.

  ...

  그럼에도 불구하고 투자를 유치하는 곳은 있습니다. **바로 AI 기반 에듀테크 기업**입니다. AI 기술을 접목해 학습 방식을 새롭게 바꾸거나 학습 보조 도구를 제공, 교육 효율성을 확대하는 곳인데요. 이들은 국내를 벗어나 글로벌 시장을 겨냥하며 성장 가능성을 증명해내려고 하고 있습니다.

  … CB인사이트에 따르면 올해 상반기 에듀테크 스타트업 투자는 23%가 하락했습니다. 또 인도 바이주 같은 유니콘 기업 가치 하락, IPO 성공 기업 부재 등 글로벌 시장에서도 에듀테크 기업은 부진한 성적을 보이고 있는데요. …그래서 링글도 이러한 분위기를 읽었던 것일까요? ML 팀이 링글에 생기게 되고 제가 입사를 한 것도 그 시작과 함께였습니다.

  하지만 시니어는 없었고, 매니징을 해줄 시니어의 부재는 수많은 삽질로 이어졌습니다.

  그 삽질들 중에서 MLOps 의 필요성을 가장 크게 느낀 사례를 공유해드리겠습니다.

  저는 링글에서 유저가 1:1 화상 과외를 마치고 나면 유저의 영어실력을 진단하는 머신러닝 엔진을 개발하고 있습니다! Here’s how the example above works:

  By default, the outer div is display: block, but by adding the md:flex utility, it becomes display: flex on medium screens and larger.
  When the parent is a flex container, we want to make sure the image never shrinks, so we’ve added md:shrink-0 to prevent shrinking on medium screens and larger. Technically we could have just used shrink-0 since it would do nothing on smaller screens, but since it only matters on md screens, it’s a good idea to make that clear in the class name.
  On small screens the image is automatically full width by default. On medium screens and up, we’ve constrained the width to a fixed size and ensured the image is full height using md:h-full md:w-48.
  We’ve only used one breakpoint in this example, but you could easily customize this component at other sizes using the sm, lg, xl, or 2xl responsive prefixes as well.
            </Text>
          </View>
          <View style={tw`border-solid border-b border-[#E5E6E5]`}></View>

          <Pressable onPress={goToDocument} style={tw`flex-row justify-between items-center h-[57px] mx-5`}>
              <View style={tw`flex-row`}>
                <Text style={tw`text-xs text-[#191919] font-normal mr-[15px]`}>이전 글</Text>
                <Text style={tw`text-xs text-[#191919] font-normal`}>공지 제목</Text>
              </View>
              <Image source={require('@images/chevron_right.png')} style={tw`w-[10px] h-[18px] tint-[#CBCDCB]`}></Image>
          </Pressable>
          <View style={tw`border-solid border-b border-[#E5E6E5]`}></View>
          <Pressable onPress={goToDocument} style={tw`flex-row justify-between items-center h-[57px] mx-5`}>
              <View style={tw`flex-row`}>
                <Text style={tw`text-xs text-[#191919] font-normal mr-[15px]`}>다음 글</Text>
                <Text style={tw`text-xs text-[#191919] font-normal`}>공지 제목</Text>
              </View>
              <Image source={require('@images/chevron_right.png')} style={tw`w-[10px] h-[18px] tint-[#CBCDCB]`}></Image>
          </Pressable>
          <View style={tw`border-solid border-b border-[#E5E6E5]`}></View>
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