import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { useNavigation, useIsFocused } from "@react-navigation/native";

import { MusicalInfoFormInReviewDetail } from "@forms/ReviewForm";

import * as Cookies from "@functions/cookie";
import { reviewDetail, thumbsUp } from "@functions/api";
import AlertForm, { AlertFormForModifyAndDeleteInReviewDetail1, AlertFormForReportInReviewDetail1 } from "@forms/AlertForm";

export default function ReviewDetail1({isCookie, reviewId, memberId, setReviewInfo, setReviewInfo2, setGoToFeed}) {
    const [reviewInfo, setReviewInfo_] = useState({});

    const [isMine, setIsMine] = useState(false);
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [modifynDeleteModalVisible, setModifynDeleteModalVisible] = useState(false);

    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();
    const [firstFocus, setFirstFocus] = useState(true);
    const [onRefreshWhenDelete, setOnRefreshWhenDelete] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
    const [alertText, setAlertText] = useState('로그인이 필요한 서비스입니다.');

    const nav = useNavigation();

    const goBack = () => {
        nav.goBack();
    };

    useEffect(() => {
        reviewDetail(reviewId).then((newReviewDetail) => {
            setReviewInfo_(() => newReviewDetail);
            setIsMine(newReviewDetail.memberId === memberId);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        if (firstFocus) {
            setFirstFocus(false);
            return;
        }
        if (!isFocused) {
            return;
        }
        onRefresh();
    }, [isFocused]);

    useEffect(() => {
        if (onRefreshWhenDelete) {
            onRefresh();
            setOnRefreshWhenDelete(false);
        }
    }, [onRefreshWhenDelete]);

    const onRefresh = React.useCallback(() => {
        if (refreshing) {
            return;
        }

        setRefreshing(true);

        setReviewInfo_({});
        reviewDetail(reviewId).then((newReviewDetail) => {
            setReviewInfo_(() => newReviewDetail);
            setIsMine(newReviewDetail.memberId === memberId);
        }).catch((err) => {
            console.log(err);
        });

        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, [refreshing]);

    const onPressMore = () => {
        if (!isCookie) {
            setModalVisible(!modalVisible);
            setAlertImage(require('@images/x_red.png'));
            setAlertText('로그인이 필요한 서비스입니다.');
            setTimeout(() => {
                setModalVisible(modalVisible);
            }, 1000);
            return;
        }
        if (isMine) setModifynDeleteModalVisible(!modifynDeleteModalVisible);
        else setReportModalVisible(!reportModalVisible);
    }

    const logout = async () => {
        const currentLogin = await Cookies.getCurrentLogin();
        await Cookies.removeCookie(currentLogin);
        await removeAutoLogin();
        setGoToFeed(false);
    }

    const onPressThumbsUp = (reviewId, isThumbsUp) => {
        // isThumbsUp이 true: 이미 공감되어 있음 -> 공감 버튼 누른다는 것: 공감 취소
        // isThumbsUp이 false: 공감 안 되어 있음 -> 공감 버튼 누른다는 것: 공감
        thumbsUp(reviewId, !isThumbsUp).then((res) => {
            if (res === "banned member") {
                setModalVisible(!modalVisible);
                setAlertImage(require('@images/x_red.png'));
                setAlertText('신고 누적으로 사용이 정지된 회원입니다.');
                setTimeout(() => {
                    setModalVisible(modalVisible);
                }, 1000);
                setTimeout(() => {
                    logout();
                }, 2000);
                return;
            }

            setReviewInfo_((prevReviewInfo) => {
                return {
                    ...prevReviewInfo,
                    isThumbsUp: !prevReviewInfo.isThumbsUp,
                    thumbsCount: prevReviewInfo.isThumbsUp ? prevReviewInfo.thumbsCount - 1 : prevReviewInfo.thumbsCount + 1
                };
            });
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <AlertForm modalVisible={modalVisible} setModalVisible={setModalVisible} borderColor="#F5F8F5" bgColor="#F5F8F5" image={alertImage} textColor="#191919" text={alertText}></AlertForm>
            <AlertFormForReportInReviewDetail1 modalVisible={reportModalVisible} setModalVisible={setReportModalVisible} reviewInfo={reviewInfo} setOnRefreshWhenDelete={setOnRefreshWhenDelete} setGoToFeed={setGoToFeed}></AlertFormForReportInReviewDetail1>
            <AlertFormForModifyAndDeleteInReviewDetail1 modalVisible={modifynDeleteModalVisible} setModalVisible={setModifynDeleteModalVisible} reviewInfo={reviewInfo} setReviewInfo={setReviewInfo} setReviewInfo2={setReviewInfo2} setOnRefreshWhenDelete={setOnRefreshWhenDelete} setGoToFeed={setGoToFeed}></AlertFormForModifyAndDeleteInReviewDetail1>

            <View style={tw`flex-row items-center justify-between py-[5%] z-20 bg-[#FAFAFA]`}>
                <Pressable onPress={goBack} style={tw`flex-row`} hitSlop={20}>
                    <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] mr-[8px] w-[10px] h-[18px] tint-[#191919]`}></Image>
                    <View style={tw`px-[15px]`}></View>
                </Pressable>
                <Text style={tw`text-[#191919] text-base font-medium`}>{reviewInfo?.memberNickname} 님의 리뷰</Text>
                <View style={tw`flex-row`}>
                    <Pressable onPress={onPressMore} hitSlop={20}><Image style={tw`w-[30px] h-[30px] mr-[20px]`} source={require("@images/dots_more.png")}></Image></Pressable>
                </View>
            </View>
            <View style={tw`border-solid border-b border-[#D3D4D3] z-20 mb-[2%]`}></View>
            <View style={tw`h-[90%] z-10`}>
                <MusicalInfoFormInReviewDetail 
                    isCookie={isCookie}
                    reviewInfo={reviewInfo}
                    onPressThumbsUp={() => onPressThumbsUp(reviewInfo.id, reviewInfo.isThumbsUp)}
                    isShortReviewSpoiler={reviewInfo.shortSpoiler}
                    isLongReviewSpoiler={reviewInfo.longSpoiler}
                    />
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
