// TODO: 스타일 수정

import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";

import { MusicalInfoFormInReviewDetail } from "@forms/ReviewForm";

import { reviewDetail } from "@functions/api";

export default function ReviewDetail1({isCookie, reviewId}) {
    const [reviewInfo, setReviewInfo] = useState({});

    const nav = useNavigation();

    const goBack = () => {
        nav.goBack();
    };

    useEffect(() => {
        reviewDetail(reviewId).then((newReviewDetail) => {
            setReviewInfo(() => newReviewDetail);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    // console.log(reviewInfo);

    return (
        <SafeAreaView style={styles.container}>
            <View style={tw`flex-row items-center justify-between mt-5 mb-[14px] z-20`}>
                <Pressable onPress={goBack} style={tw`flex-row`}>
                    <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] mr-[8px] w-[10px] h-[18px] tint-[#191919]`}></Image>
                    <View style={tw`px-[20px]`}></View>
                </Pressable>
                <Text style={tw`text-[#191919] text-base font-medium`}>{reviewInfo?.memberNickname} 님의 리뷰</Text>
                <View style={tw`flex-row`}>
                    <View style={tw`px-[20px]`}></View>
                    <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] mr-[8px] w-[10px] h-[18px] tint-[#FAFAFA]`}></Image>
                </View>
            </View>
            <View style={tw`border-solid border-b border-[#D3D4D3] z-20`}></View>

            <View style={tw`h-[95%] relative z-10`}>
                <MusicalInfoFormInReviewDetail reviewInfo={reviewInfo}></MusicalInfoFormInReviewDetail>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5F5F5',
    },
});
