import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, ScrollView, Dimensions, PixelRatio} from 'react-native';
import tw from 'twrnc';

import AlertForm, { LongReviewForm } from '@forms/AlertForm';

import { makeStars, makeStarsForEachReview } from '@functions/makeStars';
import { ifReviewBlocked, ifUserBlocked } from '@functions/block';

import { useNavigation } from "@react-navigation/native";

import { AlertFormForModifyAndDelete, AlertFormForReport } from '@forms/AlertForm';

{/*기본 화면 설정*/}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;

// props: reviewInfo, onPressThumbsUp, onPressArrowCircledRight, isCookie, isShortReviewSpoiler
export function ShortReviewForm(props) {
    const nav = useNavigation();

    const [isCookie, setIsCookie] = useState(props.isCookie);
    const [isThumbsUp, setIsThumbsUp] = useState(props.reviewInfo.isThumbsUp);
    const [thumbsCount, setThumbsCount] = useState(props.reviewInfo.thumbsCount);
    const [thumbsUpImg, setThumbsUpImg] = useState(require('@images/like_gray_small.png'));

    const [modalVisible, setModalVisible] = useState(false);

    const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
    const [alertText, setAlertText] = useState('로그인이 필요한 서비스입니다.');

    const [seeSpoiler, setSeeSpoiler] = useState(!props.isShortReviewSpoiler);

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

    const onPressProfile = () => {
        nav.navigate('Mypage', { otherMemberId: props.reviewInfo.memberId });
    }

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
                        <Pressable onPress={onPressProfile}>
                            <Image source={{uri: props.reviewInfo.memberImageUrl}} style={tw`w-[24px] h-[24px] rounded-full mr-[10px]`}></Image>
                        </Pressable>
                        <Pressable onPress={onPressProfile}>
                            <Text style={tw`text-[#191919] text-sm mr-[15px]`}>{props.reviewInfo.memberNickname}</Text>
                        </Pressable>
                        <Text style={tw`text-[#ABABAB] text-xs`}>{props.reviewInfo.viewDate}</Text>
                    </View>
                    <View style={tw`flex-row items-center`}>
                        <Image source={require('@images/star.png')} style={tw`w-[14.95726px] h-[16px] mr-[4px]`}></Image>
                        <Text style={tw`text-[#191919] text-sm`}>{props.reviewInfo.starRating.toFixed(1)}</Text>
                    </View>
                </View>
                <View onTouchEnd={()=>setSeeSpoiler(true)} style={tw`flex flex-row rounded-sm bg-[#F5F5F5] border-2 border-[#F5F5F5] mb-[15px] items-center p-[6px] rounded-2`}>
                    {seeSpoiler ?
                        <>
                        <Text style={tw`self-start text-[#191919] text-sm font-medium leading-[24px]`}>"</Text>
                        <Text style={tw`text-[#191919] text-sm font-medium leading-[24px]`}>{props.reviewInfo.shortReview}"</Text>
                        </>
                        :
                        <Text style={tw`text-[#B6B6B6] text-sm font-medium leading-[24px] underline`}>스포일러 포함</Text>
                    }
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

// props:  reviewInfo, goToMusicalDetail1, goToReviewDetail1, onPressThumbsUp, isCookie / isMine, reviewInfo, setReviewInfo, setReviewInfo2, setOnRefreshWhenDelete, isShortReviewSpoiler / setGoToFeed
export function ShortReviewFormInFeed(props) {
    const nav = useNavigation();

    const [isCookie, setIsCookie] = useState(props.isCookie);
    const [isThumbsUp, setIsThumbsUp] = useState(props.reviewInfo.isThumbsUp);
    const [thumbsCount, setThumbsCount] = useState(props.reviewInfo.thumbsCount);
    const [thumbsUpImg, setThumbsUpImg] = useState(require('@images/like_gray_small.png'));

    const [modalVisible, setModalVisible] = useState(false);

    const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
    const [alertText, setAlertText] = useState('로그인이 필요한 서비스입니다.');

    const [modifynDeleteModalVisible, setModifynDeleteModalVisible] = useState(false);
    const [reportModalVisible, setReportModalVisible] = useState(false);

    const [seeSpoiler, setSeeSpoiler] = useState(!props.isShortReviewSpoiler);

    const [blockedReview, setBlockedReview] = useState(false);
    const [blockedUser, setBlockedUser] = useState(false);

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

    useEffect(() => {
        ifReviewBlocked(props.reviewInfo.reviewId).then((result) => {
            setBlockedReview(result);
        }).catch((err) => {
            console.log(err);
        });        
    }, []);

    useEffect(() => {
        ifUserBlocked(props.reviewInfo.memberId).then((result) => {
            setBlockedUser(result);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

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
        if (!props.isCookie) {
            setModalVisible(!modalVisible);
            setAlertImage(require('@images/x_red.png'));
            setAlertText('로그인이 필요한 서비스입니다.');
            setTimeout(() => {
                setModalVisible(modalVisible);
            }, 1000);
            return;
        }
        if (props.isMine) setModifynDeleteModalVisible(!modifynDeleteModalVisible);
        else setReportModalVisible(!reportModalVisible);
    }

    const onPressProfile = () => {
        nav.navigate('Mypage', { otherMemberId: props.reviewInfo.memberId });
    }

    return (
        !blockedReview && !blockedUser &&
        <>
            <View>
                <AlertForm modalVisible={modalVisible} setModalVisible={setModalVisible} borderColor="#F5F8F5" bgColor="#F5F8F5" image={alertImage} textColor="#191919" text={alertText}></AlertForm>
            </View>
            
            <View style={tw`flex flex-col w-[90%] self-center my-[20px]`}>
                <View style={tw`flex-row justify-between items-center mb-[10px] z-20`}>
                    <View style={tw`flex-row justify-between items-center`}>
                        <Pressable onPress={onPressProfile}>
                            <Image source={{uri: props.reviewInfo.memberImageUrl}} style={tw`w-[24px] h-[24px] rounded-full mr-[10px]`}></Image>
                        </Pressable>
                        <Pressable onPress={onPressProfile}>
                            <Text style={tw`text-[#191919] text-sm mr-[15px]`}>{props.reviewInfo.memberNickname}</Text>
                        </Pressable>
                        <Text style={tw`text-[#ABABAB] text-xs`}>{props.reviewInfo.viewDate}</Text>
                    </View>
                    <Pressable onPress={onPressMore}><Image style={tw`w-[30px] h-[30px]`} source={require("@images/dots_more.png")}></Image></Pressable>
                </View>
                {props.isMine ?
                    <AlertFormForModifyAndDelete modalVisible={modifynDeleteModalVisible} setModalVisible={setModifynDeleteModalVisible} reviewInfo={props.reviewInfo} setReviewInfo={props.setReviewInfo} setReviewInfo2={props.setReviewInfo2} setOnRefreshWhenDelete={props.setOnRefreshWhenDelete} setGoToFeed={props.setGoToFeed}></AlertFormForModifyAndDelete>
                    : <AlertFormForReport modalVisible={reportModalVisible} setModalVisible={setReportModalVisible} reviewInfo={props.reviewInfo} setGoToFeed={props.setGoToFeed} setOnRefreshWhenDelete={props.setOnRefreshWhenDelete}></AlertFormForReport>
                }

                <View style={[tw`flex flex-row mb-[12px] bg-[#FFFFFF] h-[162px] rounded-4 shadow`]}>
                    <Pressable onPress={props.goToMusicalDetail1}>
                        <Image source={{uri: props.reviewInfo.posterUrl}} style={tw`w-[122px] h-[100%] rounded-l-4 mr-[10px]`} />
                    </Pressable>
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
                    <Pressable onPress={props.goToReviewDetail1} style={{ flex: 1 }}>
                        <View style={[tw`flex-col justify-between ml-[5px]`, { flex: 1 }]}>
                            <Text style={tw`text-[#191919] text-base font-medium mt-[14px] mb-[4px]`}>{props.reviewInfo.musicalName}</Text>
                            <Text numberOfLines={1} style={tw`text-[#191919] text-xs mb-[14px] w-[90%]`}>
                                {props.reviewInfo.casting.split(',').map((item, index) => {
                                    if (index === 0) return item;
                                    else return ', ' + item;
                                })}
                            </Text>
                            {makeStars(props.reviewInfo.starRating)}
                            <Pressable onTouchEnd={(e)=> { e.stopPropagation(); setSeeSpoiler(true)}}>
                                <View style={tw`flex-row rounded-sm bg-[#F5F5F5] border-2 border-[#F5F5F5] mt-[5px] mb-[14px] p-[6px] rounded-2 w-[95%]`}>
                                    {seeSpoiler ?
                                        <>
                                            <Text numberOfLines={1} style={[tw`text-[#191919] font-medium leading-[22px] w-full`, {fontSize: getFontSize(14)}]}>"{props.reviewInfo.shortReview}"</Text>
                                        </>
                                        :
                                        <Text style={[tw`text-[#B6B6B6] font-medium leading-[22px] underline`, {fontSize: getFontSize(14)}]}>스포일러 포함</Text>
                                    }
                                </View>
                            </Pressable>
                        </View>
                    </Pressable>
                </View>

                <View style={tw`flex-row items-center z-20`}>
                    <Pressable onPress={onPressThumbsUp}>
                        <Image source={thumbsUpImg} style={tw`w-[25.72288px] h-[18px] mr-[10.28px]`}></Image>
                    </Pressable>
                    <Text style={tw`text-[10px] text-[#191919]`}>공감 {thumbsCount}회</Text>
                </View>
            </View>

            <View style={tw`border-4 border-[#F0F0F0]`}></View>
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

    const [modifynDeleteModalVisible, setModifynDeleteModalVisible] = useState(false);
    const [reportModalVisible, setReportModalVisible] = useState(false);

    const [seeSpoiler, setSeeSpoiler] = useState(!props.isShortReviewSpoiler);

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
        if (!props.isCookie) {
            setModalVisible(!modalVisible);
            setAlertImage(require('@images/x_red.png'));
            setAlertText('로그인이 필요한 서비스입니다.');
            setTimeout(() => {
                setModalVisible(modalVisible);
            }, 1000);
            return;
        }
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
                    <Text style={tw`text-[#ABABAB] text-xs`}>{props.reviewInfo.viewDate}</Text>
                    <Pressable onPress={onPressMore}><Image style={tw`w-[30px] h-[20px]`} source={require("@images/dots_more.png")}></Image></Pressable>
                </View>
                {props.isMine ?
                    <AlertFormForModifyAndDelete modalVisible={modifynDeleteModalVisible} setModalVisible={setModifynDeleteModalVisible} reviewInfo={props.reviewInfo} setReviewInfo={props.setReviewInfo} setReviewInfo2={props.setReviewInfo2} setOnRefreshWhenDelete={props.setOnRefreshWhenDelete} setGoToFeed={props.setGoToFeed}></AlertFormForModifyAndDelete>
                    : <AlertFormForReport modalVisible={reportModalVisible} setModalVisible={setReportModalVisible} reviewInfo={props.reviewInfo} setGoToFeed={props.setGoToFeed}></AlertFormForReport>
                }

                <View style={tw`flex flex-row mb-[12px] bg-[#FFFFFF] h-[162px] rounded-4 shadow-sm`}>
                    <Pressable onPress={props.goToMusicalDetail1}>
                        <Image source={{uri: props.reviewInfo.posterUrl}} style={tw`w-[122px] h-[100%] rounded-l-4 mr-[20px]`} />
                    </Pressable>
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
                    <Pressable onPress={props.goToReviewDetail1} style={{ flex: 1 }}>
                        <View style={[tw`flex-col justify-between`, { flex: 1 }]}>
                            <Text style={tw`text-[#191919] text-base font-medium mt-[14px] mb-[4px]`}>{props.reviewInfo.musicalName}</Text>
                            <Text numberOfLines={1} style={tw`text-[#191919] text-xs mb-[14px] w-[90%]`}>
                                {props.reviewInfo.casting.split(',').map((item, index) => {
                                    if (index === 0) return item;
                                    else return ', ' + item;
                                })}
                            </Text>
                            {makeStars(props.reviewInfo.starRating)}
                            <Pressable onTouchEnd={(e)=> { e.stopPropagation(); setSeeSpoiler(true)}}>
                                <View style={tw`flex-row rounded-sm bg-[#F5F5F5] border-2 border-[#F5F5F5] mt-[5px] mb-[14px] p-[6px] rounded-2 w-[95%]`}>
                                    {seeSpoiler ?
                                        <>
                                            <Text style={tw`text-[#191919] text-sm font-medium leading-[24px]`}>"</Text>
                                            <Text numberOfLines={1} style={tw`text-[#191919] text-sm font-medium leading-[24px] w-full`}>{props.reviewInfo.shortReview}"</Text>
                                        </>
                                        :
                                        <Text style={[tw`text-[#B6B6B6] font-medium leading-[22px] underline`, {fontSize: getFontSize(14)}]}>스포일러 포함</Text>
                                    }
                                </View>
                            </Pressable>
                        </View>
                    </Pressable>
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

export function MusicalInfoFormInReviewDetail(props) {
    const [longReviewModalVisible, setLongReviewModalVisible] = useState(false);
    // console.log("PROPS", !props?.isShortReviewSpoiler, props?.isLongReviewSpoiler)
    const [seeShortSpoiler, setSeeShortSpoiler] = useState(false);
    const [seeLongSpoiler, setSeeLongSpoiler] = useState(false);

    useEffect(() => {
        setSeeShortSpoiler(!props?.isShortReviewSpoiler);
        setSeeLongSpoiler(!props?.isLongReviewSpoiler);
    }, [props.isShortReviewSpoiler, props.isLongReviewSpoiler]);
    
    return (
        <View style={tw`w-[90%] h-[95%] rounded-3xl bg-white mx-auto my-auto`}>
            <Image source={require("@images/half_circle.png")} style={tw`w-[60px] h-[30px] tint-[#F5F5F5] self-center absolute top-0`}></Image>
            
            {/*뮤지컬 정보*/}
            <View style={tw`border border-gray-900 border-[0.7px] self-center w-[85%] mt-13`}></View>
            <View style={tw`flex-col items-start mt-3 mx-[10%] z-20`}>
                <Text style={tw`text-1.375rem text-gray-900 font-medium mb-4`}>{props.reviewInfo.musicalTitle}</Text>
                {(props.reviewInfo.casting === '' || props.reviewInfo.casting === undefined) ?
                    <Text style={tw`text-[#B6B6B6] text-sm text-justify font-normal leading-6`}>캐스팅 정보가 없습니다.</Text>
                    :
                    <Text numberOfLines={1} style={tw`text-sm text-gray-900 mb-1.5 w-[95%]`}>
                        {props.reviewInfo.casting.split(',').map((item, index) => {
                            if (index === 0) return item;
                            else return ', ' + item;
                        })}
                    </Text>
                }
                {(props.reviewInfo.seat === '') ? 
                    <Text style={tw`text-[#B6B6B6] text-sm text-justify font-normal leading-6`}>좌석 정보가 없습니다.</Text>
                    :
                    <Text style={tw`text-sm text-gray-900 mb-1.5`}>{props.reviewInfo.seat}</Text>
                }
                <Text style={tw`text-sm text-gray-900`}>{props.reviewInfo.viewDate}</Text>
            </View>
            <View style={tw`border border-gray-900 border-[0.7px] self-center w-[85%] mt-3`}></View>
            
            {/*평점, 한줄평*/}
            <View style={tw`flex flex-col items-start mt-5`}>
                <View style={tw`flex flex-row w-[100%] justify-between`}>
                    <Text style={tw`text-gray-900 text-sm self-start ml-[10%]`}>평점</Text>
                    <View style={tw`mr-[10%]`}>{makeStarsForEachReview(props.reviewInfo.rating)}</View>
                </View>
                <View style={tw`flex flex-row items-start w-[100%] min-h-1/7 justify-between mt-4`}>
                    <Text style={tw`text-gray-900 text-sm leading-6 ml-[10%] mr-[7.5%]`}>한줄평</Text>
                    {seeShortSpoiler ?
                        <Text numberOfLines={5} style={tw`w-[60%] h-[120px] text-gray-900 text-sm text-center font-medium leading-6 self-center mr-[5%]`}>"{props.reviewInfo.shortReview}"</Text>
                        :
                        <Pressable onTouchEnd={(e)=> { e.stopPropagation(); setSeeShortSpoiler(true)}} style={tw`w-[200px] h-auto justify-center mr-[5%]`}>
                            <Text style={[tw`text-[#B6B6B6] font-medium text-center leading-[22px] underline`, {fontSize: getFontSize(14)}]}>스포일러 포함</Text>
                        </Pressable>
                    }
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
            <View style={tw`flex flex-row items-start ml-[10%] mr-[7.5%] absolute bottom-[7%]`}>
                <View style={tw`flex flex-row items-start w-[100%] justify-between z-20`}>
                    <Text style={tw`text-gray-900 text-sm leading-6 mr-[7.5%]`}>긴줄평</Text>
                    <ScrollView style={tw`h-[100px]`} showsVerticalScrollIndicator={false} onTouchEnd={() => setLongReviewModalVisible(true)} onMomentumScrollBegin={() => setLongReviewModalVisible(true)}>
                        {(props.reviewInfo.longReview === '') ? (
                            <Text style={tw`text-[#B6B6B6] text-sm text-center font-normal leading-6 ml-7.5`}>작성된 긴줄평이 없습니다.</Text>
                        ) : (
                            seeLongSpoiler ?
                                <Text style={tw`text-gray-900 text-sm text-center font-normal leading-6 ml-7.5`}>{props.reviewInfo.longReview}</Text>
                                :
                                <Pressable onTouchEnd={(e)=> { e.stopPropagation(); setSeeLongSpoiler(true)}} style={tw`w-[200px] h-auto ml-[7.5%] self-center justify-center`}>
                                    <Text style={[tw`text-[#B6B6B6] font-medium text-center leading-[22px] underline`, {fontSize: getFontSize(14)}]}>스포일러 포함</Text>
                                </Pressable>
                        )}
                    </ScrollView>
                    <LongReviewForm seeLongSpoiler={seeLongSpoiler} setSeeLongSpoiler={setSeeLongSpoiler} longReviewModalVisible={longReviewModalVisible} setLongReviewModalVisible={setLongReviewModalVisible} longReview={props.reviewInfo.longReview}></LongReviewForm>
                </View>
            </View>

            <Image source={require("@images/half_circle_usd.png")} style={tw`w-[60px] h-[30px] tint-[#F5F5F5] self-center absolute top-[95%]`}></Image>
        </View>
    )
}

{/* props: reviewId, musicalName, starRating, shortReview*/}
export function ShortReviewFormInMypage(props) {
    const [seeSpoiler, setSeeSpoiler] = useState(!props.isShortReviewSpoiler);

    return (
        <View style={tw`w-[254px] h-[121px] bg-[#FFF] rounded-[10px] shadow mr-2 mb-5`}>
            <View style={tw`flex flex-col w-full h-full items-start justify-between px-3 py-3`}>
                <Text style={tw`text-sm text-[#191919] font-medium mb-2`}>{props.musicalName}</Text>
                <View> 
                    {makeStars(props.starRating)}
                    <Pressable onPress={props.onPressShortReview}>
                        <View style={tw`flex-row items-center bg-[#F5F5F5] rounded-[5px] w-[230px] min-h-[30px] mt-[5px]`}>
                            {seeSpoiler ?
                                <View style={tw`flex-row justify-between mx-1.5 my-1.5`}>
                                    <Text numberOfLines={1} style={tw`w-full text-xs text-[#191919] font-medium mr-1.5`}>
                                        "{props.shortReview}"
                                    </Text>
                                </View>
                                :
                                <Pressable onTouchEnd={(e)=> { e.stopPropagation(); setSeeSpoiler(true)}} style={tw`mx-2 my-1.5`}>
                                    <Text style={[tw`text-[#B6B6B6] font-medium underline`, {fontSize: getFontSize(12)}]}>스포일러 포함</Text>
                                </Pressable>
                            }
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}