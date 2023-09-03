// 주의사항: isCookie 여부에 따라 유저 권한 다르게 주기

import React from "react";
import { View, Pressable, Text, Button, ScrollView, Image, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import tw from "twrnc";

import MusicalInfoForm from "@forms/MusicalInfoForm";
import StoryForm from "@forms/StoryForm";
import AverageScoreForm from "@forms/AverageScoreForm";

import { useNavigation } from "@react-navigation/native";

// props: musicalInfo 나중에 받아오기
// setGoToFeed 넣어놓음 (로그아웃 테스트용)
export default function MusicalDetail1({isCookie}) {

    // 테스트용 musicalInfo
    const musicalInfo = {
        id: 1,
        poster: {uri: 'http://www.kopis.or.kr/upload/pfmPoster/PF_PF217859_230504_141255.jpg'},
        title: "뮤지컬 지킬 앤 하이드",
        averageScore: "3.0 (211)",
        date: "2018. 11. 13. ~ 2019. 05. 19.",
        place: "샤롯데시어터",
        duration: "160분 (인터미션 20분)",
        casting: "조승우, 홍광호, 박은태, 조정은",
        story: "1885년 런던, 헨리 지킬은 유능한 의사이자 과학자이다. 그는 정신병을 앓고 있는 아버지때문에 인간의 정신을 분리하여 정신병 환자를 치료하는 연구를 시작한다. 인간을 대상으로 임상실험에 들어가야 하는 단계에 이르렀지만 이사회의 전원 반대로 무산된다. 지킬의 변호사인 와트슨은 그를 위로하며 웨스트엔드 한 클럽으로 데리고 간다. 클럽에서 일하는 루시가 학대 당하는 모습을 보고 지킬은 친구가 필요하면 연락하라며 자신의 명함을 준다. 임상 실험 대상을 구하지 못한 지킬은 자기 자신을 대상으로 실험하기로 결정한다. 정신이 선과 악으로 분열되면서 악으로만 가득 찬 제 2의 인물 '하이드'가 내면을 차지하게 된다. 실험이 진행될수록 지킬은 약혼자인 엠마와 점점 멀어진다. 어느 날 상처 입은 루시가 실험실로 찾아오고 그녀를 그렇게 만든 사람이 ‘하이드’라고 말한다. 지킬은 불안함에 휩싸인다. 루시는 지킬의 친절한 치료에 감동하고 사랑에 빠진다. 스크롤 보기 위한 길게 하는 중. 김세안 김태형 설원상 오혜령 안은선 전어진 아티크 파이팅. 제목이 2줄 넘어가면 ...으로 할까? 필요하면 제목 보고 알아서 검색할 듯? 너 천재야? 으헤헤 뮤지컬 제목 중에 제일 긴 게 이거야. 바다 탐험대 어쩌고 저쩌고 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    }

    // 테스트용 scoreCount (별점 분포)
    const scoreCount = {
        "0.5": 5,
        "1.0": 4,
        "1.5": 8,
        "2.0": 15,
        "2.5": 72,
        "3.0": 12,
        "3.5": 75,
        "4.0": 4,
        "4.5": 11,
        "5.0": 5,
    }
        
    const nav = useNavigation();

    const goBack = () => {
        nav.goBack();
    };

    const onPressWrite = () => {
        Alert.alert("리뷰 작성 페이지로 이동");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={tw`flex-row items-center justify-between mt-5 mb-[14px]`}>
                <Pressable onPress={goBack}>
                    <Image
                        source={require('@images/chevron_left.png')}
                        style={tw`ml-[20px] w-[10px] h-[18px] tint-[#191919]`}>
                    </Image>
                </Pressable>
                <Text style={tw`text-[#191919] text-base font-semibold`}>{musicalInfo.title}</Text>
                <Pressable onPress={onPressWrite}>
                    <Image
                        source={require('@images/write.png')}
                        style={tw`mr-[20px] w-[20px] h-[20px] tint-[#191919]`}>
                    </Image>
                </Pressable>
                
            </View>
            <View style={tw`border-solid border-b border-[#D3D4D3] mb-[27.56px]`}></View>
        
            <ScrollView>
                <MusicalInfoForm poster={musicalInfo.poster} title={musicalInfo.title} score={musicalInfo.averageScore} date={musicalInfo.date} place={musicalInfo.place} duration={musicalInfo.duration} casting={musicalInfo.casting}></MusicalInfoForm>
                <View style={tw`mb-[27.56px]`}></View>
                <StoryForm story={musicalInfo.story}></StoryForm>
                <View style={tw`mb-[35px]`}></View>
                <AverageScoreForm averageScore={musicalInfo.averageScore} scoreCount={scoreCount}></AverageScoreForm>
                <View style={tw`mb-[35px]`}></View>
            </ScrollView>


            <Button onPress={() => nav.navigate("ReviewDetail1")} title="ReviewDetail1으로 가기"></Button>

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
