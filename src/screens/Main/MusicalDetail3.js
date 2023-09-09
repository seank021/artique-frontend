// 주의사항: isCookie 여부에 따라 유저 권한 다르게 주기

// TODO: 정렬 함수 구현, 정렬 기준 선택하면 자동으로 창 off 되게 하기

import React, {useState} from "react";
import { View, Pressable, Text, ScrollView, Image, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import tw from "twrnc";

import { AlertFormForSort } from "@forms/AlertForm";
import { ShortReviewForm } from '@forms/ReviewForm';

import { useNavigation } from "@react-navigation/native";

import { musicalInfo, reviewInfo } from '@functions/api';

export default function MusicalDetail3({isCookie}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [sortModalVisible, setSortModalVisible] = useState(false);

    const [sortCriteria, setSortCriteria] = useState("공감순");
    
    const nav = useNavigation();

    const goBack = () => {
        nav.goBack();
    }

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

    const onPressSort = () => {
        setSortModalVisible(true);
    } 
    
    const onPressThumbsUp = reviewId => {
        console.log(reviewId);
    };

    const goToReviewDetail1 = reviewId => {
        console.log(reviewId);
        nav.navigate('ReviewDetail1');
    };

    return (
        <SafeAreaView style={styles.container}>
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
                <View style={tw`flex flex-row w-[90%] justify-between items-center self-center mt-[15px]`}>
                    <Text style={tw`text-[#191919] text-base font-medium mb-[6px]`}>모든 리뷰 ({reviewInfo.totalReviewCount})</Text>
                    <Pressable style={tw`flex flex-row items-center`} onPress={onPressSort}>
                        <Text style={tw`text-[#191919] text-xs font-medium mr-[7px]`}>{sortCriteria}</Text>
                        <Image source={require('@images/chevron_down.png')} style={tw`w-[14.4px] h-[8px]`}></Image>
                    </Pressable>
                    <AlertFormForSort sortModalVisible={sortModalVisible} setSortModalVisible={setSortModalVisible} sortCriteria={sortCriteria} setSortCriteria={setSortCriteria}></AlertFormForSort>
                </View>

                {/* {reviewInfo.reviews.map((review, index) => {
                    if (sortCriteria === "공감순") {
                        reviewInfo.reviews.sort(function(a, b) {
                            return b.thumbsCount - a.thumbsCount;
                        });
                    } else if (sortCriteria === "관람일순") {
                        reviewInfo.reviews.sort(function(a, b) {
                            return new Date(b.viewDate) - new Date(a.viewDate);
                        });
                    } else if (sortCriteria === "작성일순") {
                        // reviewInfo.reviews.sort(function(a, b) {
                        //     return new Date(b.writeDate) - new Date(a.writeDate);
                        // });
                    }
                })} */}

                <ShortReviewForm reviewInfo={reviewInfo.reviews[0]} onPressThumbsUp={() => onPressThumbsUp(reviewInfo.reviews[0].reviewId) } onPressArrowCircledRight={() => goToReviewDetail1(reviewInfo.reviews[0].reviewId) } isCookie={isCookie}></ShortReviewForm>
                <View style={tw`border-4 border-[#F0F0F0]`}></View>
                <ShortReviewForm reviewInfo={reviewInfo.reviews[1]} onPressThumbsUp={() => onPressThumbsUp(reviewInfo.reviews[1].reviewId) } onPressArrowCircledRight={() => goToReviewDetail1(reviewInfo.reviews[1].reviewId) } isCookie={isCookie}></ShortReviewForm>
                <View style={tw`border-4 border-[#F0F0F0]`}></View>
                <ShortReviewForm reviewInfo={reviewInfo.reviews[2]} onPressThumbsUp={() => onPressThumbsUp(reviewInfo.reviews[2].reviewId) } onPressArrowCircledRight={() => goToReviewDetail1(reviewInfo.reviews[2].reviewId) } isCookie={isCookie}></ShortReviewForm>
                <View style={tw`border-4 border-[#F0F0F0]`}></View>
                <ShortReviewForm reviewInfo={reviewInfo.reviews[3]} onPressThumbsUp={() => onPressThumbsUp(reviewInfo.reviews[3].reviewId) } onPressArrowCircledRight={() => goToReviewDetail1(reviewInfo.reviews[3].reviewId) } isCookie={isCookie}></ShortReviewForm>
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
