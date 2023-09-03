// TODO: 좋아요 누르면 font-medium, 좋아요 안 눌렀으면 font-normal

import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';

import AlertForm from "@forms/AlertForm";

import tw from 'twrnc';

// props: reviewInfo.reviews[i], onPressThumbsUp, onPressArrowCircledRight, isCookie
export function ShortReviewForm(props) {
    const [isThumbsUp, setIsThumbsUp] = useState(props.reviewInfo.isThumbsUp);
    const [isFontMedium, setIsFontMedium] = useState("font-normal");
    const [thumbsUpImg, setThumbsUpImg] = useState(require("@images/thumbs_up.png"));

    const [modalVisible, setModalVisible] = useState(false);

    const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
    const [alertText, setAlertText] = useState('로그인이 필요한 서비스입니다.');

    if (props.isCookie) {
        useEffect(() => {
            if (isThumbsUp) {
                setThumbsUpImg(require("@images/thumbs_up_red.png"));
                setIsFontMedium("font-bold");
            } else {
                setThumbsUpImg(require("@images/thumbs_up.png"));
                setIsFontMedium("font-normal");
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
                <AlertForm
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    borderColor="#F5F8F5"
                    bgColor="#F5F8F5"
                    image={alertImage}
                    textColor="#191919"
                    text={alertText}>
                </AlertForm>
            </View>
            <View style={tw`flex flex-col w-[90%] self-center my-[20px]`}>
                <View style={tw`flex-row justify-between items-center mb-[15px]`}>
                    <View style={tw`flex-row justify-between items-center`}>
                        <Image source={{uri: props.reviewInfo.memberImageUrl}} style={tw`w-[24px] h-[24px] rounded-full mr-[10px]`}></Image>
                        <Text style={tw`text-[#191919] text-[13px] mr-[15px]`}>{props.reviewInfo.memberNickname}</Text>
                        <Text style={tw`text-[#ABABAB] text-xs`}>{props.reviewInfo.viewDate}</Text>
                    </View>
                    <View style={tw`flex-row items-center`}>
                        <Image source={require("@images/star.png")} style={tw`w-[16px] h-[16px] mr-[3px]`}></Image>
                        <Text style={tw`text-[#191919] text-sm`}>{props.reviewInfo.starRating.toFixed(1)}</Text>
                    </View>
                </View>
                <View style={tw`flex-row h-[35px] rounded-sm bg-[#F5F5F5] border-2 border-[#F5F5F5] mb-[15px] items-center`}>
                    <Text style={tw`text-[#191919] font-medium`}>"</Text>
                    <Text style={tw`text-[#191919] font-medium`}>{props.reviewInfo.shortReview}</Text>
                    <Text style={tw`text-[#191919] font-medium`}>"</Text>
                </View>
                <View style={tw`flex-row justify-between items-center`}>
                    <View style={tw`flex-row justify-between items-center`}>
                        <Pressable onPress={onPressThumbsUp}><Image source={thumbsUpImg} style={tw`w-[20px] h-[20px] mr-[5px]`}></Image></Pressable>
                        <Text style={tw`text-sm text-[#191919] ${isFontMedium}`}>{props.reviewInfo.thumbsCount}</Text>
                    </View>
                    <Pressable onPress={onPressArrowCircledRight}><Image source={require("@images/arrow_circled_right.png")} style={tw`w-[20px] h-[20px]`}></Image></Pressable>
                </View>
            </View>
            <View style={tw`border-4 border-[#F5F5F5]`}></View>
        </>
    )
}

export function ShortReviewFormInFeed(props) {

}
