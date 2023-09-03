// 주의사항: isCookie 여부에 따라 유저 권한 다르게 주기

import React from "react";
import { View, Pressable, Text, Button, ScrollView, Image, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import tw from "twrnc";

import MusicalInfoForm from "@forms/MusicalInfoForm";
import StoryForm from "@forms/StoryForm";
import AverageScoreForm from "@forms/AverageScoreForm";
import { ShortReviewForm } from "@forms/ReviewForm";

import { useNavigation } from "@react-navigation/native";

import { musicalInfo } from "@functions/api"
import { scoreCount } from "@functions/api"
import { reviewInfo } from "@functions/api"

// props: musicalInfo 나중에 받아오기
export default function MusicalDetail1({isCookie}) {
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
            <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>
        
            <ScrollView>
                <View style={tw`mt-[27.56px]`}></View>
                <MusicalInfoForm poster={musicalInfo.poster} title={musicalInfo.title} score={musicalInfo.averageScore} date={musicalInfo.date} place={musicalInfo.place} duration={musicalInfo.duration} casting={musicalInfo.casting}></MusicalInfoForm>
                <View style={tw`mb-[27.56px]`}></View>
                <StoryForm story={musicalInfo.story}></StoryForm>
                <View style={tw`mb-[35px]`}></View>
                <AverageScoreForm averageScore={musicalInfo.averageScore} scoreCount={scoreCount}></AverageScoreForm>
                <View style={tw`mb-[35px]`}></View>
                <ShortReviewForm shortReview={reviewInfo.reviews[0].shortReview}></ShortReviewForm>
                <ShortReviewForm shortReview={reviewInfo.reviews[1].shortReview}></ShortReviewForm>
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
