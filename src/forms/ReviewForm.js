import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';

import AlertForm from '@forms/AlertForm';

import makeStars from '@functions/makeStars';

import tw from 'twrnc';

// props: reviewInfo.reviews[i], onPressThumbsUp, onPressArrowCircledRight, isCookie
export function ShortReviewForm(props) {
    const [isCookie, setIsCookie] = useState(props.isCookie);
    const [isThumbsUp, setIsThumbsUp] = useState(props.reviewInfo.isThumbsUp);
    const [thumbsCount, setThumbsCount] = useState(props.reviewInfo.thumbsCount);
    const [thumbsUpImg, setThumbsUpImg] = useState(require('@images/like_gray_small.png'));

    const [modalVisible, setModalVisible] = useState(false);

    const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
    const [alertText, setAlertText] = useState('로그인이 필요한 서비스입니다.');

    useEffect(() => {
        setIsCookie(props.isCookie);
    }, [props.isCookie]);

    useEffect(() => {
        if (isThumbsUp && isCookie) {
            setThumbsUpImg(require('@images/like_red_small.png'));
        } else {
            setThumbsUpImg(require('@images/like_gray_small.png'));
        }
    }, [isThumbsUp, isCookie]);

    const onPressThumbsUp = () => {
        if (!props.isCookie) {
            setModalVisible(!modalVisible);
            setAlertImage(require('@images/x_red.png'));
            setAlertText('로그인이 필요한 서비스입니다.');
            setTimeout(() => {
                setModalVisible(modalVisible);
            }, 1000);
            return;
        }
        setIsThumbsUp(!isThumbsUp);
        if (isThumbsUp) {
            setThumbsCount(thumbsCount - 1);
        } else {
            setThumbsCount(thumbsCount + 1);
        }
        props.onPressThumbsUp(props.reviewInfo.reviewId);
    };

    const onPressArrowCircledRight = () => {
        props.onPressArrowCircledRight(props.reviewInfo.reviewId);
    };

    return (
        <>
            <View>
                <AlertForm modalVisible={modalVisible} setModalVisible={setModalVisible} borderColor="#F5F8F5" bgColor="#F5F8F5" image={alertImage} textColor="#191919" text={alertText}></AlertForm>
            </View>
            <View style={tw`flex flex-col w-[90%] self-center my-[20px]`}>
                <View style={tw`flex-row justify-between items-center mb-[15px]`}>
                    <View style={tw`flex-row justify-between items-center`}>
                        <Image source={{uri: props.reviewInfo.memberImageUrl}} style={tw`w-[24px] h-[24px] rounded-full mr-[10px]`}></Image>
                        <Text style={tw`text-[#191919] text-sm mr-[15px]`}>{props.reviewInfo.memberNickname}</Text>
                        <Text style={tw`text-[#ABABAB] text-xs`}>{props.reviewInfo.viewDate}</Text>
                    </View>
                    <View style={tw`flex-row items-center`}>
                        <Image source={require('@images/star.png')} style={tw`w-[14.95726px] h-[16px] mr-[4px]`}></Image>
                        <Text style={tw`text-[#191919] text-sm`}>{props.reviewInfo.starRating.toFixed(1)}</Text>
                    </View>
                </View>
                <View style={tw`flex flex-row rounded-sm bg-[#F5F5F5] border-2 border-[#F5F5F5] mb-[15px] items-center p-[7px] rounded-2`}>
                    <Text style={tw`self-start text-[#191919] text-base font-medium leading-6`}>"</Text>
                    <Text style={tw`text-[#191919] text-base font-medium leading-6`}>{props.reviewInfo.shortReview}"</Text>
                </View>
                <View style={tw`flex-row justify-between items-center`}>
                    <View style={tw`flex-row justify-between items-center`}>
                        <Pressable onPress={onPressThumbsUp}>
                            <Image source={thumbsUpImg} style={tw`w-[22.86469px] h-[16.00034px] mr-[11.14px]`}></Image>
                        </Pressable>
                        <Text style={tw`text-[10px] text-[#191919]`}>공감 {thumbsCount}회</Text>
                    </View>
                    <Pressable onPress={onPressArrowCircledRight}>
                        <Image
                        source={require('@images/arrow_circled_right.png')}
                        style={tw`w-[20px] h-[20px]`}></Image>
                    </Pressable>
                </View>
            </View>
        </>
    );
}

// TODO: length 정하기 (현재 25자 넘어가면 ...으로 표시)
// props: musicalInfo, reviewInfo.reviews[i], onPressThumbsUp, isCookie, goToMusicalDetail1, goToReviewDetail1
export function ShortReviewFormInFeed(props) {
    const [isCookie, setIsCookie] = useState(props.isCookie);
    const [isThumbsUp, setIsThumbsUp] = useState(props.reviewInfo.isThumbsUp);
    const [thumbsCount, setThumbsCount] = useState(props.reviewInfo.thumbsCount);
    const [thumbsUpImg, setThumbsUpImg] = useState(require('@images/like_gray_small.png'));

    const [modalVisible, setModalVisible] = useState(false);

    const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
    const [alertText, setAlertText] = useState('로그인이 필요한 서비스입니다.');

    useEffect(() => {
        setIsCookie(props.isCookie);
    }, [props.isCookie]);

    useEffect(() => {
        if (isThumbsUp && isCookie) {
            setThumbsUpImg(require('@images/like_red_small.png'));
        } else {
            setThumbsUpImg(require('@images/like_gray_small.png'));
        }
    }, [isThumbsUp, isCookie]);

    const onPressThumbsUp = () => {
        if (!props.isCookie) {
            setModalVisible(!modalVisible);
            setAlertImage(require('@images/x_red.png'));
            setAlertText('로그인이 필요한 서비스입니다.');
            setTimeout(() => {
                setModalVisible(modalVisible);
            }, 1000);
            return;
        }
        setIsThumbsUp(!isThumbsUp);
        if (isThumbsUp) {
            setThumbsCount(thumbsCount - 1);
        } else {
            setThumbsCount(thumbsCount + 1);
        }
        props.onPressThumbsUp(props.reviewInfo.reviewId);
    };

    return (
        <>
            <View>
                <AlertForm modalVisible={modalVisible} setModalVisible={setModalVisible} borderColor="#F5F8F5" bgColor="#F5F8F5" image={alertImage} textColor="#191919" text={alertText}></AlertForm>
            </View>
            <View style={tw`flex flex-col w-[90%] self-center my-[20px]`}>
                <View style={tw`flex-row justify-between items-center mb-[10px]`}>
                    <View style={tw`flex-row justify-between items-center`}>
                        <Image source={{uri: props.reviewInfo.memberImageUrl}} style={tw`w-[24px] h-[24px] rounded-full mr-[10px]`}></Image>
                        <Text style={tw`text-[#191919] text-sm mr-[15px]`}>{props.reviewInfo.memberNickname}</Text>
                        <Text style={tw`text-[#ABABAB] text-xs`}>{props.reviewInfo.viewDate}</Text>
                    </View>
                </View>

                <View style={tw`flex flex-row mb-[12px] bg-[#FFFFFF] h-[162px] rounded-4`}>
                        <Image source={{uri: props.musicalInfo.poster}} style={tw`w-[122px] rounded-4 mr-[10px]`} onTouchEnd={props.goToMusicalDetail1} />
                        <View style={[tw`flex-col justify-between`, { flex: 1 }]} onTouchEnd={props.goToReviewDetail1}>
                            <Text style={tw`text-[#191919] text-base font-medium mt-[14px] mb-[4px]`}>{props.musicalInfo.title}</Text>
                            <Text style={tw`text-[#191919] text-xs mb-[14px]`}>{props.musicalInfo.casting}</Text>
                            {makeStars(props.musicalInfo.averageScore)}
                            <View style={tw`flex-row rounded-sm bg-[#F5F5F5] border-2 border-[#F5F5F5] mt-[5px] mb-[14px] p-[7px] rounded-2 w-[95%]`}>
                                <Text style={tw`text-[#191919] text-sm font-medium leading-6`}>"</Text>
                                <Text style={tw`text-[#191919] text-sm font-medium leading-6`}>{props.reviewInfo.shortReview.length < 25 ? props.reviewInfo.shortReview : props.reviewInfo.shortReview.slice(0, 25) + '···'}"</Text>
                            </View>
                        </View>
                </View>

                <View style={tw`flex-row items-center`}>
                    <Pressable onPress={onPressThumbsUp}>
                        <Image source={thumbsUpImg} style={tw`w-[25.72288px] h-[18px] mr-[10.28px]`}></Image>
                    </Pressable>
                    <Text style={tw`text-[10px] text-[#191919]`}>공감 {thumbsCount}회</Text>
                </View>
            </View>
        </>
    );
}

