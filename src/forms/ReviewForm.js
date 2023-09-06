// 물어볼 것: 공감 n회 Text에 ${isFontMedium} 넣기?, 폰트 크기 10px로?
// TODO: 한줄평 맨 앞 "만큼 띄어쓰기

import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';

import AlertForm from '@forms/AlertForm';

import tw from 'twrnc';

// props: reviewInfo.reviews[i], onPressThumbsUp, onPressArrowCircledRight, isCookie
export function ShortReviewForm(props) {
    const [isThumbsUp, setIsThumbsUp] = useState(props.reviewInfo.isThumbsUp);
    const [isFontMedium, setIsFontMedium] = useState('font-normal');
    const [thumbsUpImg, setThumbsUpImg] = useState(require('@images/like_gray_small.png'));

    const [modalVisible, setModalVisible] = useState(false);

    const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
    const [alertText, setAlertText] = useState('로그인이 필요한 서비스입니다.');

    if (props.isCookie) {
        useEffect(() => {
            if (isThumbsUp) {
                setThumbsUpImg(require('@images/like_red_small.png'));
                setIsFontMedium('font-bold');
            } else {
                setThumbsUpImg(require('@images/like_gray_small.png'));
                setIsFontMedium('font-normal');
            }
            }, [isThumbsUp]);
    }

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
                        <Image source={require('@images/star_small.png')} style={tw`w-[14.95726px] h-[16px] mr-[3px]`}></Image>
                        <Text style={tw`text-[#191919] text-sm`}>{props.reviewInfo.starRating.toFixed(1)}</Text>
                    </View>
                </View>
                <View style={tw`flex flex-row rounded-sm bg-[#F5F5F5] border-2 border-[#F5F5F5] mb-[15px] items-center p-[5px]`}>
                    <Text style={tw`text-[#191919] font-medium`}>"{props.reviewInfo.shortReview}"</Text>
                </View>
                <View style={tw`flex-row justify-between items-center`}>
                <View style={tw`flex-row justify-between items-center`}>
                    <Pressable onPress={onPressThumbsUp}>
                        <Image source={thumbsUpImg} style={tw`w-[22.86469px] h-[16.00034px] mr-[5px]`}></Image>
                    </Pressable>
                    <Text style={tw`text-[10px] text-[#191919] ${isFontMedium}`}>공감 {props.reviewInfo.thumbsCount}회</Text>
                </View>
                <Pressable onPress={onPressArrowCircledRight}>
                    <Image
                    source={require('@images/arrow_circled_right.png')}
                    style={tw`w-[20px] h-[20px]`}></Image>
                </Pressable>
                </View>
            </View>
            <View style={tw`border-4 border-[#F5F5F5]`}></View>
        </>
    );
}

export function ShortReviewFormInFeed(props) {

}

