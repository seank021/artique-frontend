import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, ScrollView, Platform, StyleSheet, Dimensions, PixelRatio} from 'react-native';
import tw from 'twrnc';

import AlertForm, { LongReviewForm } from '@forms/AlertForm';

import { makeStars, makeStarsForEachReview } from '@functions/makeStars';

import { AlertFormForModifyAndDelete, AlertFormForReport } from '@forms/AlertForm';

{/*기본 화면 설정*/}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;

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

// props:  reviewInfo, goToMusicalDetail1, goToReviewDetail1, onPressThumbsUp, isCookie / isMine, reviewInfo, setReviewInfo, setReviewInfo2
export function ShortReviewFormInFeed(props) {
    const [isCookie, setIsCookie] = useState(props.isCookie);
    const [isThumbsUp, setIsThumbsUp] = useState(props.reviewInfo.isThumbsUp);
    const [thumbsCount, setThumbsCount] = useState(props.reviewInfo.thumbsCount);
    const [thumbsUpImg, setThumbsUpImg] = useState(require('@images/like_gray_small.png'));

    const [modalVisible, setModalVisible] = useState(false);

    const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
    const [alertText, setAlertText] = useState('로그인이 필요한 서비스입니다.');

    const [modifynDeleteModalVisible, setModifynDeleteModalVisible] = useState(false);
    const [reportModalVisible, setReportModalVisible] = useState(false);

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

    const onPressMore = () => {
        // console.log(props.isMine)
        if (props.isMine) setModifynDeleteModalVisible(!modifynDeleteModalVisible);
        else setReportModalVisible(!reportModalVisible);
    }

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
                    <Pressable onPress={onPressMore}><Image style={tw`w-[30px] h-[30px]`} source={require("@images/dots_more.png")}></Image></Pressable>
                </View>
                {props.isMine ?
                    <AlertFormForModifyAndDelete modalVisible={modifynDeleteModalVisible} setModalVisible={setModifynDeleteModalVisible} reviewInfo={props.reviewInfo} setReviewInfo={props.setReviewInfo} setReviewInfo2={props.setReviewInfo2}></AlertFormForModifyAndDelete>
                    : <AlertFormForReport modalVisible={reportModalVisible} setModalVisible={setReportModalVisible}></AlertFormForReport>
                }

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
                            <Text style={[tw`text-[#191919] font-medium leading-[24px]`, {fontSize: getFontSize(14)}]}>{props.reviewInfo.shortReview.length < 25 ? props.reviewInfo.shortReview : props.reviewInfo.shortReview.slice(0, 25) + '···'}"</Text>
                            {/* <Text style={[tw`text-[#191919] font-medium leading-[24px]`, {fontSize: getFontSize(14)}]}>{props.reviewInfo.shortReview.length < 25 ? props.reviewInfo.shortReview : props.reviewInfo.shortReview.slice(0, 25) + '···'}"</Text> */}
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
// props: reviewInfo, onPressThumbsUp, isCookie, goToReviewDetail1, goToMusicalDetail1
export function ShortReviewFormInMyReviews(props) {
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
                    <Text style={tw`text-[#ABABAB] text-xs`}>{props.reviewInfo.viewDate}</Text>
                    <Image source={require('@images/threedots.png')} style={tw`w-[16px] h-[3.5px] mr-[4px]`}></Image>
                </View>

                <View style={tw`flex flex-row mb-[12px] bg-[#FFFFFF] h-[162px] rounded-4 shadow-sm`}>
                    <Image source={{uri: props.reviewInfo.posterUrl}} style={tw`w-[122px] rounded-l-4 mr-[20px]`} onTouchEnd={props.goToMusicalDetail1} />
                    <View style={tw`flex-col absolute left-[113px] top-[-9px]`}>
                        <View style={tw`w-[18px] h-[18px] rounded-full bg-[#F8F8F8] mb-[10px]`}></View>
                        <View style={tw`w-[10px] h-[10px] rounded-full bg-[#F8F8F8] ml-[4px]`}></View>
                        <View style={tw`w-[10px] h-[10px] rounded-full bg-[#F8F8F8] ml-[4px] mt-[9px]`}></View>
                        <View style={tw`w-[10px] h-[10px] rounded-full bg-[#F8F8F8] ml-[4px] mt-[9px]`}></View>
                        <View style={tw`w-[10px] h-[10px] rounded-full bg-[#F8F8F8] ml-[4px] mt-[9px]`}></View>
                        <View style={tw`w-[10px] h-[10px] rounded-full bg-[#F8F8F8] ml-[4px] mt-[9px]`}></View>
                        <View style={tw`w-[10px] h-[10px] rounded-full bg-[#F8F8F8] ml-[4px] mt-[9px]`}></View>
                        <View style={tw`w-[10px] h-[10px] rounded-full bg-[#F8F8F8] ml-[4px] mt-[9px]`}></View>
                        <View style={tw`w-[18px] h-[18px] rounded-full bg-[#F8F8F8] mt-[10px]`}></View>
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
// export function MusicalInfoFormInReviewDetail(props) {
//     const [longReviewModalVisible, setLongReviewModalVisible] = useState(false);

//     return (
//         <View style={tw`flex-col self-center w-[90%] h-[93%] rounded-[24px] bg-[#FFFFFF] my-[13px]`}>
//             <View style={tw`w-[60px] h-[60px] rounded-full bg-[#F5F5F5] self-center absolute top-[-30px] overflow-hidden`}></View>
            
//             <View style={tw`border-solid border border-[#191919] self-center w-[83%] mt-[57px]`}></View>
//             <View style={tw`flex-col items-start mt-[23px] ml-[10%] mr-[5%]`}>
//                 <Text style={tw`text-[22px] text-[#191919] font-medium mb-[22px]`}>{props.reviewInfo.musicalTitle}</Text>
//                 <Text style={tw`text-sm text-[#191919] mb-[6px]`}>{props.reviewInfo.casting}</Text>
//                 <Text style={tw`text-sm text-[#191919] mb-[6px]`}>{props.reviewInfo.seat}</Text>
//                 <Text style={tw`text-sm text-[#191919]`}>{props.reviewInfo.viewDate}</Text>
//             </View>
//             <View style={tw`border-solid border border-[#191919] self-center w-[83%] mt-[18px]`}></View>
            
//             <View style={tw`flex flex-col items-start mt-[23px] ml-[10%]`}>
//                 <View style={tw`flex-row w-[90%] justify-between`}>
//                     <Text style={tw`text-[#191919] text-sm self-start`}>평점</Text>
//                     {makeStarsForEachReview(props.reviewInfo.rating)}
//                 </View>
//                 <View style={tw`flex flex-row items-start w-[90%] justify-between mt-[32.4px] mb-[44px]`}>
//                     <Text style={tw`text-[#191919] text-sm leading-[26px]`}>한줄평</Text>
//                     <Text style={tw`w-[65%] text-[#191919] text-sm text-center font-medium leading-[26px]`}>"{props.reviewInfo.shortReview}"</Text>
//                 </View>
//             </View>

//             <View style={tw`flex flex-row items-center absolute left-[-10px] right-[-10px] top-[450px] justify-between`}>
//                 <View style={tw`w-[20px] h-[20px] rounded-full bg-[#F5F5F5]`}></View>
//                 {Array(15).fill().map((_, index) => (
//                     <View key={index} style={tw`w-[12px] h-[12px] rounded-full bg-[#F5F5F5]`} />
//                     ))}
//                 <View style={tw`w-[20px] h-[20px] rounded-full bg-[#F5F5F5]`}></View>
//             </View>

//             <View style={tw`flex flex-row items-start mt-[23px] ml-[10%]`}>
//                 <View style={tw`flex-row items-start w-[90%] justify-between`}>
//                     <Text style={tw`text-[#191919] text-sm mr-[57px] leading-[23px]`}>긴줄평</Text>
//                     <ScrollView style={tw`w-[65%] h-[105px]`} showsVerticalScrollIndicator={false} onTouchEnd={() => setLongReviewModalVisible(true)} onMomentumScrollBegin={() => setLongReviewModalVisible(true)}>
//                         <Text style={tw`text-[#191919] text-sm text-justify font-normal leading-[23px]`}>{props.reviewInfo.longReview}</Text>
//                     </ScrollView>
//                     <LongReviewModal longReviewModalVisible={longReviewModalVisible} setLongReviewModalVisible={setLongReviewModalVisible} longReview={props.reviewInfo.longReview}></LongReviewModal>
//                 </View>
//             </View>

//             <View style={tw`w-[60px] h-[60px] rounded-full bg-[#F5F5F5] self-center absolute bottom-[-30px] overflow-hidden`}></View>
//         </View>
//     )
// }

export function MusicalInfoFormInReviewDetail(props) {
    const [longReviewModalVisible, setLongReviewModalVisible] = useState(false);

    return (
        <View style={tw`w-[90%] h-[95%] flex-col rounded-3xl bg-white mx-auto my-auto`}>
            <View style={tw`w-15 h-15 rounded-full bg-[#F5F5F5] self-center absolute top--7.5 z-10`}></View>
            
            {/*뮤지컬 정보*/}
            <View style={tw`border border-gray-900 self-center w-[85%] mt-14.25`}></View>
            <View style={tw`flex-col items-start mt-6 mx-[10%] z-20`}>
                <Text style={tw`text-1.375rem text-gray-900 font-medium mb-5.5`}>{props.reviewInfo.musicalTitle}</Text>
                <Text style={tw`text-sm text-gray-900 mb-1.5`}>{props.reviewInfo.casting}</Text>
                <Text style={tw`text-sm text-gray-900 mb-1.5`}>{props.reviewInfo.seat}</Text>
                <Text style={tw`text-sm text-gray-900`}>{props.reviewInfo.viewDate}</Text>
            </View>
            <View style={tw`border border-gray-900 self-center w-[85%] mt-4.5`}></View>
            
            {/*평점, 한줄평*/}
            <View style={tw`flex flex-col items-start mt-6 ml-[10%] mr-[7.5%]`}>
                <View style={tw`flex flex-row w-[100%] justify-between`}>
                    <Text style={tw`text-gray-900 text-sm self-start`}>평점</Text>
                    {makeStarsForEachReview(props.reviewInfo.rating)}
                </View>
                <View style={tw`flex flex-row items-start w-[100%] min-h-1/7 justify-between mt-8`}>
                    <Text style={tw`text-gray-900 text-sm leading-6`}>한줄평</Text>
                    <Text style={tw`w-3/5 h-25 text-gray-900 text-base text-center font-medium leading-6`}>"{props.reviewInfo.shortReview}"</Text>
                </View>
            </View>

            {/*구분선*/}
            <View style={tw`flex flex-row items-center absolute left--2.5 right--2.5 bottom-[25%] justify-between`}>
                <View style={tw`w-5 h-5 rounded-full bg-[#F5F5F5]`}></View>
                {Array(15).fill().map((_, index) => (
                    <View key={index} style={tw`w-3 h-3 rounded-full bg-[#F5F5F5]`} />
                ))}
                <View style={tw`w-5 h-5 rounded-full bg-[#F5F5F5]`}></View>
            </View>
            
            {/*긴줄평*/}
            <View style={tw`flex flex-row items-start ml-[10%] mr-[7.5%] absolute bottom-[6%]`}>
                <View style={tw`flex flex-row items-start w-[100%] justify-between z-20`}>
                    <Text style={tw`text-gray-900 text-sm leading-6 mr-15`}>긴줄평</Text>
                    <ScrollView style={tw`h-[100px]`} showsVerticalScrollIndicator={false} onTouchEnd={() => setLongReviewModalVisible(true)} onMomentumScrollBegin={() => setLongReviewModalVisible(true)}>
                        <Text style={tw`text-gray-900 text-sm text-justify font-normal leading-6`}>{props.reviewInfo.longReview}</Text>
                    </ScrollView>
                    <LongReviewForm longReviewModalVisible={longReviewModalVisible} setLongReviewModalVisible={setLongReviewModalVisible} longReview={props.reviewInfo.longReview}></LongReviewForm>
                </View>
            </View>

            <View style={tw`w-15 h-15 rounded-full bg-[#F5F5F5] self-center absolute bottom--7.5 z-10`}></View>
        </View>
    )
}
{/* props: reviewId, musicalName, starRating, shortReview*/}
export function ShortReviewFormInMypage(props) {
    return (
        <View style={tw`w-[250px] h-[120px] bg-[#FFF] rounded-[10px] shadow mr-2`}>
            <View style={tw`w-full flex-col items-start mx-3 my-3`}>
                <Text style={tw`text-sm text-[#191919] font-medium mb-2`}>{props.musicalName}</Text>
                <View> 
                    {makeStars(props.starRating)}
                </View>
                <View style={tw`flex-row items-center bg-[#F5F5F5] rounded-[5px] w-[90%] h-[52px] mt-1.25`}>
                    <View style={tw`flex-row justify-between mx-1.5 my-1.5`}>
                        <Text style={tw`text-xs text-[#191919] font-medium`}>"</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={tw`text-xs text-[#191919] font-medium shrink mr-1.5`}>
                            {`${props.shortReview}`.replace(/^(.{30}[^\s]*).*/, "$1...\"")}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}