import React, { useState, useEffect } from "react";
import { View, Pressable, Text, Image, StyleSheet, BackHandler, ScrollView, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper";
import tw from "twrnc";

import { AlertFormForConfirm } from "@forms/AlertForm";
import Header from "@forms/Header";
import MainForm, { MainMusicalForm } from "@forms/MainForm";
import { getHomeBanners, getHomeFiveStarReviews, getHomeLongReviews, getHomeRecentReviews, getHomeRecommendMusicals, getHomeThumbsReviews } from "@functions/api";

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

    const [latest, setLatest] = useState([]);
    const [thumbs, setThumbs] = useState([]);
    const [recommends, setRecommends] = useState([]);
    const [longs, setLongs] = useState([]);
    const [fiveStars, setFiveStars] = useState([]);
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        getHomeRecentReviews().then((res) => {
            setLatest(res);
        });
        getHomeThumbsReviews().then((res) => {
            setThumbs(res);
        });
        getHomeRecommendMusicals().then((res) => {
            setRecommends(res);
        });
        getHomeLongReviews().then((res) => {
            setLongs(res);
        });
        getHomeFiveStarReviews().then((res) => {
            setFiveStars(res);
        });
        getHomeBanners().then((res) => {
            setBanners(res);
        });
    }, []);



    // type: 0(외부링크) - link: url, 1(내부뮤지컬) - link: musicalId, 2(내부리뷰) - link: reviewId
    // const banners = [
    //     { "bannerimg": require("@images/bannerimg.png"), "type": 0, "link": "http://www.playdb.co.kr/artistdb/detail.asp?ManNo=27064" },
    //     { "bannerimg": require("@images/bannerimg2.png"), "type": 0, "link": "https://litt.ly/artique" },
    //     { "bannerimg": require("@images/bannerimg3.png"), "type": 1, "link": "PF222698" },
    //     { "bannerimg": require("@images/bannerimg4.png"), "type": 2, "link": 68 },
    // ]

    const openLink = (type, link) => {
        if (type === 0) {
            Linking.openURL(link);
        } else if (type === 1) {
            setMusicalId(link);
            nav.navigate('MusicalDetail1');
        } else if (type === 2) {
            setReviewId(link);
            nav.navigate('ReviewDetail1');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <AlertFormForConfirm modalVisible={exitModalVisible} setModalVisible={setExitModalVisible} question="앱을 종료하시겠습니까?" text='종료' onPress={BackHandler.exitApp} />

            <Header isCookie={isCookie} onPressExit={onPressExit} />

            <ScrollView style={tw`flex flex-col`} showsVerticalScrollIndicator={false}>
                {/* <Swiper style={tw`h-[300px]`} autoplay={true} autoplayTimeout={5} showsPagination={true} dotColor="#BDBDBD" activeDotColor="#FF5C55">
                    {banners.map((banner, index) => (
                        <Pressable key={index} style={tw`flex flex-col items-center justify-center`} onPress={() => openLink(banner.type, banner.link)}>
                            <Image source={banner.bannerimg} style={tw`w-[100%] h-[300px]`}></Image>
                        </Pressable>
                    ))}
                </Swiper> */}
                <View style={tw`h-[30px]`} />

                <MainForm title="최신 리뷰" onPressMore={goToLatest} contents={latest} setMusicalId={setMusicalId} setReviewId={setReviewId} />
                <MainForm title="공감 많은 리뷰" onPressMore={goToHeartest} contents={thumbs} setMusicalId={setMusicalId} setReviewId={setReviewId} />
                <MainMusicalForm title="아티크 추천 작품" contents={recommends} setMusicalId={setMusicalId} />
                <MainForm title="긴줄평 있는 리뷰" onPressMore={goToLongs} contents={longs} setMusicalId={setMusicalId} setReviewId={setReviewId} />
                <MainForm title="별점 5점 리뷰" onPressMore={goToFiveStars} contents={fiveStars} setMusicalId={setMusicalId} setReviewId={setReviewId} />
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
