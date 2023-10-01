// TODO: order-by 넣기

import React, { useState, useEffect, Fragment } from "react";
import { View, Pressable, Text, ScrollView, Image, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { AlertFormForSort } from "@forms/AlertForm";
import { ShortReviewForm } from '@forms/ReviewForm';

import { useNavigation } from "@react-navigation/native";

import { musicalDetails, musicalReviews, musicalReviewsAll, thumbsUp } from "@functions/api";

export default function MusicalDetail2({isCookie, musicalId, setReviewId}) {
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
    
    const onPressThumbsUp = (reviewId, isThumbsUp) => {
        console.log(reviewId);
        console.log(isThumbsUp);

        // isThumbsUp이 true: 이미 공감되어 있음 -> 공감 버튼 누른다는 것: 공감 취소
        // isThumbsUp이 false: 공감 안 되어 있음 -> 공감 버튼 누른다는 것: 공감
        thumbsUp(reviewId, !isThumbsUp).then((res) => {
            console.log(res);
            setReviews((prevReviews) => {
                const newReviews = [...prevReviews];
                const reviewIndex = newReviews.findIndex((review) => review.reviewId === reviewId);
                newReviews[reviewIndex].isThumbsUp = !isThumbsUp; // 프론트상에서만 바꿈 (구현 위함, 서버에서는 안 바뀜)
                return newReviews;
            });
        }).catch((err) => {
            console.log(err);
        });
    };

    const goToReviewDetail1 = reviewId => {
        console.log(reviewId);
        setReviewId(reviewId);
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

            <ScrollView onScroll={detectScroll}>
                <View style={tw`flex flex-row w-[90%] justify-between items-center self-center mt-[15px]`}>
                    <Text style={tw`text-[#191919] text-base font-medium mb-[6px]`}>모든 리뷰 ({totalReviewCount})</Text>
                    <Pressable style={tw`flex flex-row items-center`} onPress={() => setSortModalVisible(true)}>
                        <Text style={tw`text-[#191919] text-xs font-medium mr-[7px]`}>{sortCriteria}</Text>
                        <Image source={require('@images/chevron_down.png')} style={tw`w-[14.4px] h-[8px]`}></Image>
                    </Pressable>
                    <AlertFormForSort sortModalVisible={sortModalVisible} setSortModalVisible={setSortModalVisible} sortCriteria={sortCriteria} setSortCriteria={setSortCriteria}></AlertFormForSort>
                </View>

                {reviews.map((review, index) => (
                    <Fragment key={index}>
                        <ShortReviewForm
                            reviewInfo={review}
                            onPressThumbsUp={() => onPressThumbsUp(review.reviewId, review.isThumbsUp)}
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
