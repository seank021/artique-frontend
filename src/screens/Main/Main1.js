import React, { useState, useEffect } from "react";
import { View, Pressable, Text, Image, StyleSheet, BackHandler, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

import { AlertFormForConfirm } from "@forms/AlertForm";
import Header from "@forms/Header";
import MainForm, { MainMusicalForm } from "@forms/MainForm";

export default function Main1({ isCookie, setGoToFeed, setReviewId, setMusicalId }) {
    const nav = useNavigation();

    const [exitModalVisible, setExitModalVisible] = useState(false);
    
    useEffect(() => {
        const backAction = () => {
            if (nav.isFocused()) {
                setExitModalVisible(true);
                return true;
            }
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);

    const onPressExit = () => {
        setGoToFeed(false);
    }

    const goToLatest = () => {
        nav.navigate('Feed1');
    }

    const goToHeartest = () => {
        nav.navigate('Feed2');
    }

    const goToLongs = () => {
        nav.navigate('Feed3');
    }

    const goToFiveStars = () => {
        nav.navigate('Feed4');
    }

    // dummy data - TODO: api connection
    const latest = [
        {"casting": "홍", "isThumbsUp": false, "memberId": "kakao@2980747057", "memberImageUrl": "https://artique-profile.s3.ap-northeast-2.amazonaws.com/kakao%402980747057/default-image7fb18b9f-41b8-41c1-8d91-30ea8a024076.png", "memberNickname": "당당한 토끼", "musicalId": "PF214405", "musicalName": "신데렐라 [대학로]", "posterUrl": "http://www.kopis.or.kr/upload/pfmPoster/PF_PF214405_230306_124459.jpg", "reviewId": 68, "reviewSpoiler": false, "shortReview": "ㅎ", "starRating": 3, "thumbsCount": 0, "viewDate": "2023-02-02"},
        {"casting": "신데렐라", "isThumbsUp": true, "memberId": "kakao@2980747057", "memberImageUrl": "https://artique-profile.s3.ap-northeast-2.amazonaws.com/kakao%402980747057/default-image7fb18b9f-41b8-41c1-8d91-30ea8a024076.png", "memberNickname": "당당한 토끼", "musicalId": "PF214405", "musicalName": "신데렐라 [대학로]", "posterUrl": "http://www.kopis.or.kr/upload/pfmPoster/PF_PF214405_230306_124459.jpg", "reviewId": 66, "reviewSpoiler": false, "shortReview": "여기에 들어가는 한줄평 글자수가 피드에서랑 달라도 되나요?여기서는 더 보여도 될 것 같다...", "starRating": 4, "thumbsCount": 1, "viewDate": "2024-03-02"},
        {"casting": "홍,준", "isThumbsUp": false, "memberId": "kakao@2980747057", "memberImageUrl": "https://artique-profile.s3.ap-northeast-2.amazonaws.com/kakao%402980747057/default-image7fb18b9f-41b8-41c1-8d91-30ea8a024076.png", "memberNickname": "당당한 토끼", "musicalId": "PF150471", "musicalName": "빨간모자야 조심해! [청주, 세종]", "posterUrl": "http://www.kopis.or.kr/upload/pfmPoster/PF_PF150471_200629_135159.gif", "reviewId": 49, "reviewSpoiler": false, "shortReview": "아", "starRating": 3, "thumbsCount": 0, "viewDate": "2024-03-12"},
        {"casting": "조승우,김세안,홍광호", "isThumbsUp": false, "memberId": "aaa", "memberImageUrl": "https://avatars.githubusercontent.com/u/71641610?v=4", "memberNickname": "nickname3", "musicalId": "PF222698", "musicalName": "지킬앤하이드", "posterUrl": "http://www.kopis.or.kr/upload/pfmPoster/PF_PF136032_170227_153022.jpg", "reviewId": 10, "reviewSpoiler": false, "shortReview": "여주 남주 잘 어울림", "starRating": 5, "thumbsCount": 121, "viewDate": "2023-09-10"},
        {"casting": "홍", "isThumbsUp": false, "memberId": "kakao@2980747057", "memberImageUrl": "https://artique-profile.s3.ap-northeast-2.amazonaws.com/kakao%402980747057/default-image7fb18b9f-41b8-41c1-8d91-30ea8a024076.png", "memberNickname": "당당한 토끼", "musicalId": "PF214405", "musicalName": "신데렐라 [대학로]", "posterUrl": "http://www.kopis.or.kr/upload/pfmPoster/PF_PF214405_230306_124459.jpg", "reviewId": 67, "reviewSpoiler": false, "shortReview": "ㅎ", "starRating": 3, "thumbsCount": 0, "viewDate": "2023-02-02"},
    ]

    const recommends = [
        { "musicalId": "PF214405", "musicalName": "신데렐라 [대학로]", "posterUrl": "http://www.kopis.or.kr/upload/pfmPoster/PF_PF214405_230306_124459.jpg", starRating: 1.5, reviewCnt: 211 },
        { "musicalId": "PF150471", "musicalName": "빨간모자야 조심해! [청주, 세종]", "posterUrl": "http://www.kopis.or.kr/upload/pfmPoster/PF_PF150471_200629_135159.gif", starRating: 3.0, reviewCnt: 10 },
        { "musicalId": "PF222698", "musicalName": "지킬앤하이드", "posterUrl": "http://www.kopis.or.kr/upload/pfmPoster/PF_PF136032_170227_153022.jpg", starRating: 4.5, reviewCnt: 1021 },
        { "musicalId": "PF214405", "musicalName": "신데렐라 [대학로]", "posterUrl": "http://www.kopis.or.kr/upload/pfmPoster/PF_PF214405_230306_124459.jpg", starRating: 1.5, reviewCnt: 211 },
        { "musicalId": "PF150471", "musicalName": "빨간모자야 조심해! [청주, 세종]", "posterUrl": "http://www.kopis.or.kr/upload/pfmPoster/PF_PF150471_200629_135159.gif", starRating: 3.0, reviewCnt: 10 },
    ]

    return (
        <SafeAreaView style={styles.container}>
            <AlertFormForConfirm modalVisible={exitModalVisible} setModalVisible={setExitModalVisible} question="앱을 종료하시겠습니까?" text='종료' onPress={BackHandler.exitApp} />

            <Header isCookie={isCookie} onPressExit={onPressExit} />

            <ScrollView style={tw`flex flex-col`} showsVerticalScrollIndicator={false}>
                <Image source={require("@images/bannerimg.png")} style={tw`w-[100%] h-[300px] mb-[30px]`}></Image>

                <MainForm title="최신 리뷰" onPressMore={goToLatest} contents={latest} setReviewId={setReviewId} />
                <MainForm title="공감 많은 리뷰" onPressMore={goToHeartest} contents={latest} setReviewId={setReviewId} />
                <MainMusicalForm title="아티크 추천 작품" contents={recommends} setMusicalId={setMusicalId} />
                <MainForm title="긴줄평 있는 리뷰" onPressMore={goToLongs} contents={latest} setReviewId={setReviewId} />
                <MainForm title="별점 5점 리뷰" onPressMore={goToFiveStars} contents={latest} setReviewId={setReviewId} />
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
