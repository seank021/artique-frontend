import React, { useState, useEffect, Fragment } from 'react';
import { View, Pressable, Text, ScrollView, Image, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import tw from 'twrnc';

import AlertForm from '@forms/AlertForm';

import MusicalInfoForm from '@forms/MusicalInfoForm';
import StoryForm from '@forms/StoryForm';
import AverageScoreForm from '@forms/AverageScoreForm';
import { ShortReviewForm } from '@forms/ReviewForm';

import { useNavigation } from '@react-navigation/native';

import { musicalDetails, musicalReviews, musicalRateStatistics } from '@functions/api';

export default function MusicalDetail1({isCookie, musicalId}) {
    const [modalVisible, setModalVisible] = useState(false);

    const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
    const [alertText, setAlertText] = useState('로그인이 필요한 서비스입니다.');
    
    const [musicalInfo, setMusicalInfo] = useState({});
    const [musicalRates, setMusicalRates] = useState({});
    const [totalReviewCount, setTotalReviewCount] = useState(0);
    const [reviews, setReviews] = useState([]);

    const nav = useNavigation();

    useEffect(() => {
        musicalDetails(musicalId).then((newMusicalInfo) => {
            setMusicalInfo(() => newMusicalInfo);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        musicalRateStatistics(musicalId).then((newMusicalRates) => {
            setMusicalRates(() => newMusicalRates.statistic);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    
    useEffect(() => {
        musicalReviews(musicalId).then((newReviews) => {
            setTotalReviewCount(() => newReviews.totalReviewCount);
            setReviews(() => [...newReviews.reviews]);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

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

    const goToMusicalDetail2 = (musicalId) => {
        nav.navigate('MusicalDetail2');
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
            <View>
                <AlertForm modalVisible={modalVisible} setModalVisible={setModalVisible} borderColor="#F5F8F5" bgColor="#F5F8F5" image={alertImage} textColor="#191919" text={alertText}></AlertForm>
            </View>
            <View style={tw`flex-row items-center justify-between mt-5 mb-[14px]`}>
                <Pressable onPress={goBack} style={tw`flex-row`}>
                    <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] mr-[8px] w-[10px] h-[18px] tint-[#191919]`}></Image>
                    <View style={tw`px-[20px]`}></View>
                </Pressable>
                <Text style={tw`text-[#191919] text-base font-medium`}>{musicalInfo.title}</Text>
                <Pressable onPress={onPressWrite} style={tw`flex-row`}>
                    <View style={tw`px-[20px]`}></View>
                    <Image source={require('@images/write.png')} style={tw`mr-[20px] w-[18px] h-[17.121px] tint-[#191919]`}></Image>
                </Pressable>
            </View>
            <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>

            <ScrollView>
                <View style={tw`mt-[27.56px]`}></View>
                {musicalInfo.posterUrl && (
                    <MusicalInfoForm poster={musicalInfo.posterUrl} title={musicalInfo.title} score={musicalInfo.averageScore} date={musicalInfo.date} place={musicalInfo.place} duration={musicalInfo.duration} casting={musicalInfo.casting}></MusicalInfoForm>
                )}                
                <View style={tw`mb-[27.56px]`}></View>
                <StoryForm story={musicalInfo.story}></StoryForm>
                <View style={tw`mb-[35px]`}></View>
                {Object.keys(musicalRates).length === 10 && (
                    <AverageScoreForm averageScore={musicalInfo.averageScore} scoreCount={musicalRates}></AverageScoreForm>
                )}
                <View style={tw`mb-[35px]`}></View>
                <View style={tw`flex flex-row w-[90%] justify-between items-center self-center mb-[10px]`}>
                    <Text style={tw`text-[#191919] text-base font-medium`}>리뷰 ({totalReviewCount})</Text>
                    <Pressable onPress={() => goToMusicalDetail2(musicalId)}>
                        <Text style={tw`text-xs text-[#191919]`}>전체보기</Text>
                    </Pressable>
                </View>

                {reviews.map((review, index) => (
                    <Fragment key={index}>
                        <ShortReviewForm
                            reviewInfo={review}
                            onPressThumbsUp={() => onPressThumbsUp(review.reviewId)}
                            onPressArrowCircledRight={() => goToReviewDetail1(review.reviewId)}
                            isCookie={isCookie}
                        />
                        {index < reviews.length - 1 && (
                            <View style={tw`border-4 border-[#F5F5F5]`}></View>
                        )}
                    </Fragment>
                ))}
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
