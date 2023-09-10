// TODO: 정렬 기준 선택하면 자동으로 창 off 되게 하기

import React, { useState, useEffect, Fragment } from "react";
import { View, Pressable, Text, ScrollView, Image, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { AlertFormForSort } from "@forms/AlertForm";
import { ShortReviewForm } from '@forms/ReviewForm';

import { useNavigation } from "@react-navigation/native";

import { musicalDetails, musicalReviews, musicalReviewsAll } from "@functions/api";

export default function MusicalDetail2({isCookie, musicalId}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [sortModalVisible, setSortModalVisible] = useState(false);

    const [sortCriteria, setSortCriteria] = useState("공감순");
    
    const nav = useNavigation();

    const [musicalInfo, setMusicalInfo] = useState({});
    const [totalReviewCount, setTotalReviewCount] = useState(0);

    const [page, setPage] = useState(0);
    const [updatePage, setUpdatePage] = useState(true);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        musicalDetails(musicalId).then((newMusicalInfo) => {
            setMusicalInfo(() => newMusicalInfo);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        musicalReviews(musicalId).then((newReviews) => {
            setTotalReviewCount(() => newReviews.totalReviewCount);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        if (updatePage && page === 0) {
            musicalReviewsAll(musicalId, page).then((newReviews) => {
                setReviews(newReviews);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [page, updatePage]);

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

    const detectScroll = async (e) => {
        if (!updatePage) {
            return;
        }

        let updateScroll = e.nativeEvent.contentOffset.y;
        if (updateScroll === 0) {
            return;
        }

        let screenHeight = e.nativeEvent.layoutMeasurement.height;
        let documentHeight = e.nativeEvent.contentSize.height;
        let endPoint = 100;

        if (updateScroll + screenHeight >= documentHeight - endPoint) {
            if(!updatePage){
                return;
            };
            setUpdatePage(false);
            const nextPage = page + 1;
            setPage(nextPage);
            
            musicalReviewsAll(musicalId, nextPage).then((newReviews) => {
                setReviews((prevReviews) => [...prevReviews, ...newReviews]);
                setUpdatePage(true);
            }).catch((err) => {
                console.log(err);
            });
        }
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

            <ScrollView onScroll={detectScroll}>
                <View style={tw`flex flex-row w-[90%] justify-between items-center self-center mt-[15px]`}>
                    <Text style={tw`text-[#191919] text-base font-medium mb-[6px]`}>모든 리뷰 ({totalReviewCount})</Text>
                    <Pressable style={tw`flex flex-row items-center`} onPress={onPressSort}>
                        <Text style={tw`text-[#191919] text-xs font-medium mr-[7px]`}>{sortCriteria}</Text>
                        <Image source={require('@images/chevron_down.png')} style={tw`w-[14.4px] h-[8px]`}></Image>
                    </Pressable>
                    <AlertFormForSort sortModalVisible={sortModalVisible} setSortModalVisible={setSortModalVisible} sortCriteria={sortCriteria} setSortCriteria={setSortCriteria}></AlertFormForSort>
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
                            <View style={tw`border-4 border-[#F0F0F0]`}></View>
                        )}
                    </Fragment>
                ))}
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
