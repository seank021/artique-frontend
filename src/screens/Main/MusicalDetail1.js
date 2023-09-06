// 주의사항: isCookie 여부에 따라 유저 권한 다르게 주기

import React, { useState } from 'react';
import { View, Pressable, Text, ScrollView, Image, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import tw from 'twrnc';

import AlertForm from '@forms/AlertForm';

import MusicalInfoForm from '@forms/MusicalInfoForm';
import StoryForm from '@forms/StoryForm';
import AverageScoreForm from '@forms/AverageScoreForm';
import { ShortReviewForm } from '@forms/ReviewForm';

import { useNavigation } from '@react-navigation/native';

import { musicalInfo } from '@functions/api';
import { scoreCount } from '@functions/api';
import { reviewInfo } from '@functions/api';

export default function MusicalDetail1({isCookie}) {
    const [modalVisible, setModalVisible] = useState(false);

    const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
    const [alertText, setAlertText] = useState('로그인이 필요한 서비스입니다.');

    const nav = useNavigation();

    const goBack = () => {
        nav.goBack();
    };

    const onPressWrite = () => {
        if (!isCookie) {
            setModalVisible(!modalVisible);
            setAlertImage(require('@images/x_red.png'));
            setAlertText('로그인이 필요한 서비스입니다.');
            setTimeout(() => {
                setModalVisible(modalVisible);
            }, 1000);
            return;
        }
        console.log(musicalInfo.musicalId);
        Alert.alert('리뷰 작성 페이지로 이동');
    };

    const goToReviewDetail1 = () => {
        nav.navigate('ReviewDetail1');
    };

    const onPressThumbsUp = reviewId => {
        console.log(reviewId);
    };

    const goToSeeMore1 = reviewId => {
        console.log(reviewId);
        nav.navigate('SeeMore1');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <AlertForm modalVisible={modalVisible} setModalVisible={setModalVisible} borderColor="#F5F8F5" bgColor="#F5F8F5" image={alertImage} textColor="#191919" text={alertText}></AlertForm>
            </View>
            <View style={tw`flex-row items-center justify-between mt-5 mb-[14px]`}>
                <Pressable onPress={goBack}>
                    <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] mr-[8px] w-[10px] h-[18px] tint-[#191919]`}></Image>
                </Pressable>
                <Text style={tw`text-[#191919] text-base font-medium`}>{musicalInfo.title}</Text>
                <Pressable onPress={onPressWrite}>
                    <Image source={require('@images/write.png')} style={tw`mr-[20px] w-[18px] h-[17.121px] tint-[#191919]`}></Image>
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
                <View style={tw`flex flex-row w-[90%] justify-between items-center self-center mb-[10px]`}>
                    <Text style={tw`text-[#191919] text-base font-medium`}>리뷰 ({reviewInfo.totalReviewCount})</Text>
                    <Pressable onPress={goToReviewDetail1}>
                        <Text style={tw`text-xs text-[#191919]`}>전체보기</Text>
                    </Pressable>
                </View>
                <ShortReviewForm reviewInfo={reviewInfo.reviews[0]} onPressThumbsUp={() => onPressThumbsUp(reviewInfo.reviews[0].reviewId) } onPressArrowCircledRight={() => goToSeeMore1(reviewInfo.reviews[0].reviewId) } isCookie={isCookie}></ShortReviewForm>
                <ShortReviewForm reviewInfo={reviewInfo.reviews[1]} onPressThumbsUp={() => onPressThumbsUp(reviewInfo.reviews[1].reviewId) } onPressArrowCircledRight={() => goToSeeMore1(reviewInfo.reviews[1].reviewId) } isCookie={isCookie}></ShortReviewForm>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FAFAFA',
    },
});
