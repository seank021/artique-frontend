// 주의사항: isCookie 여부에 따라 유저 권한 다르게 주기

import React from "react";
import { Text, Button, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import tw from "twrnc";

import MusicalInfoForm from "@forms/MusicalInfoForm";
import StoryForm from "@forms/StoryForm";

import { useNavigation } from "@react-navigation/native";

// setGoToFeed 넣어놓음 (로그아웃 테스트용)
export default function MusicalDetail1({isCookie}) {
    const nav = useNavigation();

    return (
        <SafeAreaView style={tw`bg-[#FAFAFA]`}>
            <ScrollView>
                <Text>여기는 상세 페이지</Text>
                {isCookie ? <Text>로그인 되어 있음</Text> : <Text>로그인 안 되어 있음</Text>}
                <Button onPress={() => nav.goBack()} title="뒤로 가기"></Button>
                <Button onPress={() => nav.navigate("ReviewDetail1")} title="ReviewDetail1으로 가기"></Button>
                <MusicalInfoForm poster={require("@images/test_poster.png")} title="뮤지컬 지킬 앤 하이드" score="3.0 (211)" date="2018. 11. 13. ~ 2019. 05. 19." place="샤롯데시어터" duration="160분 (인터미션 20분)" casting="조승우, 홍광호, 박은태, 조정은"></MusicalInfoForm>
                <StoryForm story="1885년 런던, 헨리 지킬은 유능한 의사이자 과학자이다. 그는 정신병을 앓고 있는 아버지때문에 인간의 정신을 분리하여 정신병 환자를 치료하는 연구를 시작한다. 인간을 대상으로 임상실험에 들어가야 하는 단계에 이르렀지만 이사회의 전원 반대로 무산된다. 지킬의 변호사인 와트슨은 그를 위로하며 웨스트엔드 한 클럽으로 데리고 간다. 클럽에서 일하는 루시가 학대 당하는 모습을 보고 지킬은 친구가 필요하면 연락하라며 자신의 명함을 준다. 임상 실험 대상을 구하지 못한 지킬은 자기 자신을 대상으로 실험하기로 결정한다. 정신이 선과 악으로 분열되면서 악으로만 가득 찬 제 2의 인물 '하이드'가 내면을 차지하게 된다. 실험이 진행될수록 지킬은 약혼자인 엠마와 점점 멀어진다. 어느 날 상처 입은 루시가 실험실로 찾아오고 그녀를 그렇게 만든 사람이 ‘하이드’라고 말한다. 지킬은 불안함에 휩싸인다. 루시는 지킬의 친절한 치료에 감동하고 사랑에 빠진다. 스크롤 보기 위한 길게 하는 중. 김세안 김태형 설원상 오혜령 안은선 전어진 아티크 파이팅. 제목이 2줄 넘어가면 ...으로 할까? 필요하면 제목 보고 알아서 검색할 듯? 너 천재야? 으헤헤 뮤지컬 제목 중에 제일 긴 게 이거야. 바다 탐험대 어쩌고 저쩌고 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ"></StoryForm>
            </ScrollView>
        </SafeAreaView>
    )
}

