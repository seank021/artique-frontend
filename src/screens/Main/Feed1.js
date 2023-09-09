// 주의사항: isCookie 여부에 따라 유저 권한 다르게 주기

import React from "react";
import { Text, Button, View, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ShortReviewFormInFeed } from "@forms/ReviewForm";

import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";

import { musicalInfo, reviewInfo } from "@functions/api";

export default function Feed1({isCookie}) {
    const nav = useNavigation();

    const goToMusicalDetail1 = musicalId => {
        console.log(musicalId);
        nav.navigate('MusicalDetail1');
    };

    const onPressThumbsUp = reviewId => {
        console.log(reviewId);
    };

    const goToReviewDetail1 = reviewId => {
        console.log(reviewId);
        nav.navigate('ReviewDetail1');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={tw`ml-[5%] my-2.5`}>
                <Image source={require("@images/logo_small_black.png")} style={tw`w-[110px] h-[37.64781px]`}></Image>
            </View>
            <View style={tw`border-[0.5px] border-[#D3D4D3]`}></View>

            <ScrollView>
                <ShortReviewFormInFeed musicalInfo={musicalInfo} reviewInfo={reviewInfo.reviews[0]} goToMusicalDetail1={() => goToMusicalDetail1(musicalInfo.musicalId)} goToReviewDetail1={() => goToReviewDetail1(reviewInfo.reviews[0].reviewId)} onPressThumbsUp={() => onPressThumbsUp(reviewInfo.reviews[0].reviewId)} isCookie={isCookie}></ShortReviewFormInFeed>
                <View style={tw`border-4 border-[#F0F0F0]`}></View>
                <ShortReviewFormInFeed musicalInfo={musicalInfo} reviewInfo={reviewInfo.reviews[1]} goToMusicalDetail1={() => goToMusicalDetail1(musicalInfo.musicalId)} goToReviewDetail1={() => goToReviewDetail1(reviewInfo.reviews[1].reviewId)} onPressThumbsUp={() => onPressThumbsUp(reviewInfo.reviews[1].reviewId)} isCookie={isCookie}></ShortReviewFormInFeed>
                <View style={tw`border-4 border-[#F0F0F0]`}></View>
                <ShortReviewFormInFeed musicalInfo={musicalInfo} reviewInfo={reviewInfo.reviews[2]} goToMusicalDetail1={() => goToMusicalDetail1(musicalInfo.musicalId)} goToReviewDetail1={() => goToReviewDetail1(reviewInfo.reviews[2].reviewId)} onPressThumbsUp={() => onPressThumbsUp(reviewInfo.reviews[2].reviewId)} isCookie={isCookie}></ShortReviewFormInFeed>
                <View style={tw`border-4 border-[#F0F0F0]`}></View>
                <ShortReviewFormInFeed musicalInfo={musicalInfo} reviewInfo={reviewInfo.reviews[3]} goToMusicalDetail1={() => goToMusicalDetail1(musicalInfo.musicalId)} goToReviewDetail1={() => goToReviewDetail1(reviewInfo.reviews[3].reviewId)} onPressThumbsUp={() => onPressThumbsUp(reviewInfo.reviews[3].reviewId)} isCookie={isCookie}></ShortReviewFormInFeed>
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
