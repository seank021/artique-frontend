import React, { useState, useEffect } from "react";
import { View, Pressable, Image, StyleSheet, BackHandler, ScrollView, Linking, RefreshControl, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper";
import tw from "twrnc";

import { AlertFormForConfirm } from "@forms/AlertForm";
import Header from "@forms/Header";
import MainForm, { MainMusicalForm } from "@forms/MainForm";
import { getHomeBanners, getHomeFiveStarReviews, getHomeLongReviews, getHomeRecentReviews, getHomeRecommendMusicals, getHomeThumbsReviews } from "@functions/api";

export default function Main1({ isCookie, setGoToFeed, setReviewId, setMusicalId }) {
    const nav = useNavigation();

    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

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
        getHomeBanners().then((res) => {
            setBanners(res.banners);
        });
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
    }, []);

    useEffect(() => {
        if (!isFocused) {
            return;
        }
        onRefresh();
    }, [isFocused]);

    const onRefresh = () => {
        setRefreshing(true);
        getHomeBanners().then((res) => {
            setBanners(res.banners);
        });
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
        setRefreshing(false);
    }

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

    if (banners[0] === undefined || banners[1] === undefined || banners[2] === undefined) {
        return (
            <SafeAreaView style={styles.container}>
                <Header isCookie={isCookie} onPressExit={onPressExit} />
                <ActivityIndicator size="large" color="#000000" style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <AlertFormForConfirm modalVisible={exitModalVisible} setModalVisible={setExitModalVisible} question="앱을 종료하시겠습니까?" text='종료' onPress={BackHandler.exitApp} />

            <Header isCookie={isCookie} onPressExit={onPressExit} />

            <ScrollView style={tw`flex flex-col`} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {banners && banners[0] !== undefined && banners[1] !== undefined && banners[2] !== undefined &&
                    <Swiper style={tw`h-[300px]`} showsPagination={true} dotColor="#BDBDBD" activeDotColor="#FF5C55" autoplay={true} autoplayTimeout={3} loop={true}>
                        <Pressable style={tw`flex flex-col items-center justify-center`} onPress={() => openLink(banners[0].type, banners[0].link)}>
                            <Image source={{ uri: banners[0].bannerImg }} style={tw`w-[100%] h-[300px]`}></Image>
                        </Pressable>
                        <Pressable style={tw`flex flex-col items-center justify-center`} onPress={() => openLink(banners[1].type, banners[1].link)}>
                            <Image source={{ uri: banners[1].bannerImg }} style={tw`w-[100%] h-[300px]`}></Image>
                        </Pressable>
                        <Pressable style={tw`flex flex-col items-center justify-center`} onPress={() => openLink(banners[2].type, banners[2].link)}>
                            <Image source={{ uri: banners[2].bannerImg }} style={tw`w-[100%] h-[300px]`}></Image>
                        </Pressable>
                    </Swiper>
                }
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
