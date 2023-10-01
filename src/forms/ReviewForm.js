import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, ScrollView, Platform, StyleSheet } from 'react-native';
import tw from 'twrnc';

import AlertForm, { LongReviewForm } from '@forms/AlertForm';

import { makeStars, makeStarsForEachReview } from '@functions/makeStars';

// props: reviewInfo, onPressThumbsUp, onPressArrowCircledRight, isCookie
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
                <View style={tw`flex flex-row rounded-sm bg-[#F5F5F5] border-2 border-[#F5F5F5] mb-[15px] items-center p-[6px] rounded-2`}>
                    <Text style={tw`self-start text-[#191919] text-sm font-medium leading-[24px]`}>"</Text>
                    <Text style={tw`text-[#191919] text-sm font-medium leading-[24px]`}>{props.reviewInfo.shortReview}"</Text>
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

// props:  reviewInfo, goToMusicalDetail1, goToReviewDetail1, onPressThumbsUp, isCookie
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
                <View style={tw`flex-row justify-between items-center mb-[10px] z-20`}>
                    <View style={tw`flex-row justify-between items-center`}>
                        <Image source={{uri: props.reviewInfo.memberImageUrl}} style={tw`w-[24px] h-[24px] rounded-full mr-[10px]`}></Image>
                        <Text style={tw`text-[#191919] text-sm mr-[15px]`}>{props.reviewInfo.memberNickname}</Text>
                        <Text style={tw`text-[#ABABAB] text-xs`}>{props.reviewInfo.viewDate}</Text>
                    </View>
                </View>

                <View style={[tw`flex flex-row mb-[12px] bg-[#FFFFFF] h-[162px] rounded-4 shadow-sm`]}>
                    <Image source={{uri: props.reviewInfo.posterUrl}} style={tw`w-[122px] rounded-l-4 mr-[10px]`} onTouchEnd={props.goToMusicalDetail1} />
                    <View style={tw`flex-col absolute left-[113px] top-[-9px]`}>
                        <View style={tw`w-[18px] h-[18px] rounded-full border-[#EFEFEF] bg-[#F8F8F8] mb-[10px]`}></View>
                        <View style={tw`w-[10px] h-[10px] rounded-full border-[#EFEFEF] bg-[#F8F8F8] ml-[4px]`}></View>
                        <View style={tw`w-[10px] h-[10px] rounded-full border-[#EFEFEF] bg-[#F8F8F8] ml-[4px] mt-[9px]`}></View>
                        <View style={tw`w-[10px] h-[10px] rounded-full border-[#EFEFEF] bg-[#F8F8F8] ml-[4px] mt-[9px]`}></View>
                        <View style={tw`w-[10px] h-[10px] rounded-full border-[#EFEFEF] bg-[#F8F8F8] ml-[4px] mt-[9px]`}></View>
                        <View style={tw`w-[10px] h-[10px] rounded-full border-[#EFEFEF] bg-[#F8F8F8] ml-[4px] mt-[9px]`}></View>
                        <View style={tw`w-[10px] h-[10px] rounded-full border-[#EFEFEF] bg-[#F8F8F8] ml-[4px] mt-[9px]`}></View>
                        <View style={tw`w-[10px] h-[10px] rounded-full border-[#EFEFEF] bg-[#F8F8F8] ml-[4px] mt-[9px]`}></View>
                        <View style={tw`w-[18px] h-[18px] rounded-full border-[#EFEFEF] bg-[#F8F8F8] mt-[10px]`}></View>
                    </View>
                    <View style={[tw`flex-col justify-between ml-[10px]`, { flex: 1 }]} onTouchEnd={props.goToReviewDetail1}>
                        <Text style={tw`text-[#191919] text-base font-medium mt-[14px] mb-[4px]`}>{props.reviewInfo.musicalName}</Text>
                        <Text style={tw`text-[#191919] text-xs mb-[14px]`}>
                            {props.reviewInfo.casting.length > 20 ? `${props.reviewInfo.casting.slice(0, 20)} ...` : props.reviewInfo.casting}
                        </Text>
                        {makeStars(props.reviewInfo.starRating)}
                        <View style={tw`flex-row rounded-sm bg-[#F5F5F5] border-2 border-[#F5F5F5] mt-[5px] mb-[14px] p-[6px] rounded-2 w-[95%]`}>
                            <Text style={tw`text-[#191919] text-sm font-medium leading-[24px]`}>"</Text>
                            <Text style={tw`text-[#191919] text-sm font-medium leading-[24px]`}>{props.reviewInfo.shortReview.length < 25 ? props.reviewInfo.shortReview : props.reviewInfo.shortReview.slice(0, 25) + '···'}"</Text>
                        </View>
                    </View>
                </View>

                <View style={tw`flex-row items-center z-20`}>
                    <Pressable onPress={onPressThumbsUp}>
                        <Image source={thumbsUpImg} style={tw`w-[25.72288px] h-[18px] mr-[10.28px]`}></Image>
                    </Pressable>
                    <Text style={tw`text-[10px] text-[#191919]`}>공감 {thumbsCount}회</Text>
                </View>
            </View>
        </>
    );
}

// props: reviewInfo
export function MusicalInfoFormInReviewDetail(props) {
    const [longReviewModalVisible, setLongReviewModalVisible] = useState(false);

    return (
        <View style={tw`flex-col self-center w-[90%] h-[93%] rounded-[24px] bg-[#FFFFFF] my-[13px]`}>
            <View style={tw`w-[60px] h-[60px] rounded-full bg-[#F5F5F5] self-center absolute top-[-30px] overflow-hidden`}></View>
            
            <View style={tw`border-solid border border-[#191919] self-center w-[83%] mt-[57px]`}></View>
            <View style={tw`flex-col items-start mt-[23px] ml-[10%] mr-[5%]`}>
                <Text style={tw`text-[22px] text-[#191919] font-medium mb-[22px]`}>{props.reviewInfo.musicalTitle}</Text>
                <Text style={tw`text-sm text-[#191919] mb-[6px]`}>{props.reviewInfo.casting}</Text>
                <Text style={tw`text-sm text-[#191919] mb-[6px]`}>{props.reviewInfo.seat}</Text>
                <Text style={tw`text-sm text-[#191919]`}>{props.reviewInfo.viewDate}</Text>
            </View>
            <View style={tw`border-solid border border-[#191919] self-center w-[83%] mt-[18px]`}></View>
            
            <View style={tw`flex flex-col items-start mt-[23px] ml-[10%]`}>
                <View style={tw`flex-row w-[90%] justify-between`}>
                    <Text style={tw`text-[#191919] text-sm self-start`}>평점</Text>
                    {makeStarsForEachReview(props.reviewInfo.rating)}
                </View>
                <View style={tw`flex flex-row items-start w-[90%] justify-between mt-[32.4px] mb-[44px]`}>
                    <Text style={tw`text-[#191919] text-sm leading-[26px]`}>한줄평</Text>
                    <Text style={tw`w-[65%] text-[#191919] text-sm text-center font-medium leading-[26px]`}>"{props.reviewInfo.shortReview}"</Text>
                </View>
            </View>

            <View style={tw`flex flex-row items-center absolute left-[-10px] right-[-10px] top-[450px] justify-between`}>
                <View style={tw`w-[20px] h-[20px] rounded-full bg-[#F5F5F5]`}></View>
                {Array(15).fill().map((_, index) => (
                    <View key={index} style={tw`w-[12px] h-[12px] rounded-full bg-[#F5F5F5]`} />
                    ))}
                <View style={tw`w-[20px] h-[20px] rounded-full bg-[#F5F5F5]`}></View>
            </View>

            <View style={tw`flex flex-row items-start mt-[23px] ml-[10%]`}>
                <View style={tw`flex-row items-start w-[90%] justify-between`}>
                    <Text style={tw`text-[#191919] text-sm mr-[57px] leading-[23px]`}>긴줄평</Text>
                    <ScrollView style={tw`w-[65%] h-[105px]`} showsVerticalScrollIndicator={false} onTouchEnd={() => setLongReviewModalVisible(true)} onMomentumScrollBegin={() => setLongReviewModalVisible(true)}>
                        <Text style={tw`text-[#191919] text-sm text-justify font-normal leading-[23px]`}>{props.reviewInfo.longReview}</Text>
                    </ScrollView>
                    <LongReviewForm modalVisible={longReviewModalVisible} setModalVisible={setLongReviewModalVisible} longReview={props.reviewInfo.longReview}></LongReviewForm>
                </View>
            </View>

            <View style={tw`w-[60px] h-[60px] rounded-full bg-[#F5F5F5] self-center absolute bottom-[-30px] overflow-hidden`}></View>
        </View>
    )
}

// const styles = StyleSheet.create({
//     ratingContainer: {
//         flex: 1,
//         flexDirection: 'column',
//         alignItems: 'flex-start',
//         marginTop: 23,
//         marginLeft: '10%',
//         ...Platform.select({
//             ios: {
//                 marginRight: '5%',
//             },
//             android: {
//             },
//         }),
//     },
// });