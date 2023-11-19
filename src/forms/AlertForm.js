import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, ScrollView, TextInput } from 'react-native';
import Modal from 'react-native-modal';

import tw from 'twrnc';

import axios from 'axios';

import { useNavigation } from '@react-navigation/native';

import { Contract1, Contract2 } from '@forms/ContractContents';

import { reviewDetail, reviewDelete, reviewReport } from '@functions/api';
import * as Cookies from '@functions/cookie';
import { removeAutoLogin } from '@functions/autoLogin';

import { launchImageLibrary } from 'react-native-image-picker';

// props: modalVisible, setModalVisible / borderColor, bgColor, image, textColor, text
export default function AlertForm(props) {
    const alertFormStyles = {
        ...tw`flex flex-col w-[65%] h-[110px] border-solid border-2 rounded-[15px] self-center justify-center items-center`,
        borderColor: props.borderColor,
        backgroundColor: props.bgColor,
    }

    const textStyles = {
        ...tw`text-sm font-medium mt-[20px]`,
        color: props.textColor,
    }

    return (
        <Modal animationIn="fadeIn" animationOut="fadeOut" transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.5} onBackdropPress={() => props.setModalVisible(false)}>
            <View style={alertFormStyles}>
                {props.image === require("@images/check.png") ?
                    <Image source={require("@images/check.png")} style={tw`w-[24px] h-[17.63637px] self-center`}></Image> 
                    : <Image source={require("@images/x_red.png")} style={tw`w-[19px] h-[19px] self-center`}></Image>
                }
                <Text style={textStyles}>{props.text}</Text>
            </View>
        </Modal>
    );
}

// props: sortModalVisible, setSortModalVisible, sortCriteria, setSortCriteria
export function AlertFormForSort(props) {
    const [sortCriteria, setSortCriteria] = useState(props.sortCriteria);

    const onPressSort = (criteria) => {
        setSortCriteria(criteria);
        props.setSortCriteria(criteria);
        props.setSortModalVisible(false);
    };

    return (
        <Modal animationIn={"fadeIn"} animationOut={"fadeOut"} transparent={true} isVisible={props.sortModalVisible} hasBackdrop={true} backdropOpacity={0.5} onBackdropPress={() => props.setSortModalVisible(false)}>
            <View style={tw`flex flex-col w-[230px] h-[225px] bg-white rounded-2xl self-center`}>
                <View style={tw`flex flex-col my-[25px] justify-between`}>
                    <Text style={tw`text-center text-base font-medium mb-[30px] text-[#191919]`}>정렬 기준</Text>
                    <View style={tw`flex flex-col w-[80%] h-[110px] self-center justify-between`}>
                        <Pressable onPress={() => onPressSort('공감순')} style={tw`flex flex-row justify-between items-center`}>
                            <Text style={tw`text-sm text-left text-[#191919]`}>공감순</Text>
                            {sortCriteria === '공감순' && (<Image source={require('@images/check.png')} style={tw`w-[16px] h-[11.75758px]`}></Image>)}
                        </Pressable>
                        <Pressable onPress={() => onPressSort('작성일순')} style={tw`flex flex-row justify-between items-center`}>
                            <Text style={tw`text-sm text-left text-[#191919]`}>작성일순</Text>
                            {sortCriteria === '작성일순' && (<Image source={require('@images/check.png')} style={tw`w-[16px] h-[11.75758px]`}></Image>)}
                        </Pressable>
                        <Pressable onPress={() => onPressSort('관람일순')} style={tw`flex flex-row justify-between items-center`}>
                            <Text style={tw`text-sm text-left text-[#191919]`}>관람일순</Text>
                            {sortCriteria === '관람일순' && (<Image source={require('@images/check.png')} style={tw`w-[16px] h-[11.75758px]`}></Image>)}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

// props: sortModalVisible, setSortModalVisible, sortCriteria, setSortCriteria
export function AlertFormForSort2(props) {
    const [sortCriteria, setSortCriteria] = useState(props.sortCriteria);

    const onPressSort = (criteria) => {
        setSortCriteria(criteria);
        props.setSortCriteria(criteria);

        props.setSortModalVisible(false);
    };

    return (
        <Modal animationIn={"fadeIn"} animationOut={"fadeOut"} transparent={true} isVisible={props.sortModalVisible} hasBackdrop={true} backdropOpacity={0.5} onBackdropPress={() => props.setSortModalVisible(false)}>
            <View style={tw`flex flex-col w-[230px] h-[179px] bg-white rounded-2xl self-center`}>
                <View style={tw`flex flex-col my-[25px] justify-between`}>
                    <Text style={tw`text-center text-base font-medium mb-[30px] text-[#191919]`}>정렬 기준</Text>
                    <View style={tw`flex flex-col w-[80%] h-[70px] self-center justify-between`}>
                        <Pressable onPress={() => onPressSort('최신순')} style={tw`flex flex-row justify-between items-center`}>
                            <Text style={tw`text-sm text-left text-[#191919]`}>최신순</Text>
                            {sortCriteria === '최신순' && (<Image source={require('@images/check.png')} style={tw`w-[16px] h-[11.75758px]`}></Image>)}
                        </Pressable>
                        <Pressable onPress={() => onPressSort('리뷰 많은 순')} style={tw`flex flex-row justify-between items-center`}>
                            <Text style={tw`text-sm text-left text-[#191919]`}>리뷰 많은 순</Text>
                            {sortCriteria === '리뷰 많은 순' && (<Image source={require('@images/check.png')} style={tw`w-[16px] h-[11.75758px]`}></Image>)}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

// props: sortModalVisible, setSortModalVisible, sortCriteria, setSortCriteria
export function AlertFormForSortInMyReviews(props) {
    const [sortCriteria, setSortCriteria] = useState(props.sortCriteria);

    const onPressSort = (criteria) => {
        setSortCriteria(criteria);
        props.setSortCriteria(criteria);
        props.setSortModalVisible(false);
    };

    return (
        <Modal animationIn={"fadeIn"} animationOut={"fadeOut"} transparent={true} isVisible={props.sortModalVisible} hasBackdrop={true} backdropOpacity={0.5} onBackdropPress={() => props.setSortModalVisible(false)}>
            <View style={tw`flex flex-col w-[230px] h-[180px] bg-white rounded-2xl self-center`}>
                <View style={tw`flex flex-col my-6 justify-between`}>
                    <Text style={tw`text-center text-base font-medium mb-[30px] text-[#191919]`}>정렬 기준</Text>
                    <View style={tw`flex flex-col w-[80%] self-center justify-between ml-6 mr-5`}>
                        <Pressable onPress={() => onPressSort('최신순')} style={tw`flex flex-row justify-between items-center mb-5`}>
                            <Text style={tw`text-sm text-left text-[#191919]`}>최신순</Text>
                            {sortCriteria === '최신순' && (<Image source={require('@images/check.png')} style={tw`w-[16px] h-[11.75758px]`}></Image>)}
                        </Pressable>
                        <Pressable onPress={() => onPressSort('공감 많은 순')} style={tw`flex flex-row justify-between items-center`}>
                            <Text style={tw`text-sm text-left text-[#191919]`}>공감 많은순</Text>
                            {sortCriteria === '공감 많은 순' && (<Image source={require('@images/check.png')} style={tw`w-[16px] h-[11.75758px]`}></Image>)}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

// props: longReviewModalVisible, setLongReviewModalVisible, longReview
export function LongReviewForm(props) {
    return (
        <Modal animationIn={"fadeIn"} animationOut={"fadeOut"} transparent={true} isVisible={props.longReviewModalVisible} hasBackdrop={true} backdropOpacity={0.5} onBackdropPress={() => props.setLongReviewModalVisible(false)}>
            <View style={tw`flex flex-col w-[95%] h-[70%] bg-white rounded-2xl self-center items-center justify-between`}>
                <Text style={tw`text-base text-[#191919] font-medium my-6`}>긴줄평</Text>
                <ScrollView style={tw`mx-8 mb-14`} showsVerticalScrollIndicator={false}>
                    {(props.longReview === '') ? (
                        <Text style={tw`text-sm font-normal text-left text-[#B6B6B6]`}>작성된 긴줄평이 없습니다.</Text> 
                    ) : (
                    <Text style={tw`text-sm font-normal text-justify text-[#191919] leading-6`}>{props.longReview}</Text>
                    )}
                </ScrollView>
            </View>
        </Modal>
    )
}

export function ProfileChangeForm(props) {
    const onPressSelect = async () => {
        const response = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
        });
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                let imageSource = response.assets[0]?.base64;
                props.setImage(imageSource);
            }
        };

    const onPressDelete = () => {
        props.setImage(null);
    }

    return(
        <Modal animationIn={"fadeIn"} animationOut={"fadeOut"} transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.5} onBackdropPress={() => props.setModalVisible(false)}>
            <View style={tw`flex flex-col w-[65%] h-[110px] bg-white rounded-[15px] self-center items-center justify-evenly`}>
                <Pressable onPress={onPressSelect}>
                    <Text style={tw`text-sm text-[#191919] font-normal`}>라이브러리에서 선택</Text>
                </Pressable>
                <View style={tw`border-solid border-b border-[#D3D4D3] w-[100%]`}></View>
                <Pressable onPress={onPressDelete}>
                    <Text style={tw`text-sm text-[#191919] font-normal`}>현재 사진 삭제</Text>
                </Pressable>
            </View>
        </Modal>
    )
}

// props: modalVisible, setModalVisible, onPress, question, text
export const AlertFormForConfirm = (props) => {
    return (
        <Modal animationIn={"fadeIn"} animationOut={"fadeOut"} transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.5} onBackdropPress={() => props.setModalVisible(false)}>
            <View style={tw`flex flex-col w-[230px] h-[136px] bg-white rounded-[15px] justify-around self-center`}>
                <Text style={tw`text-center text-base font-normal mt-[40px] mb-[27px] text-[#191919]`}>{props.question}</Text>
                <View style={tw`border-b border-solid border-[#D3D4D3]`}></View>
                <Pressable onPress={props.onPress} style={tw`self-center my-[15px]`}>
                    <Text style={tw`text-sm text-center font-medium text-[#E94A4B]`}>{props.text}</Text>
                </Pressable>
            </View>
        </Modal>
    )
}

// props: modalVisible, setModalVisible, reviewInfo, setReviewInfo, setReviewInfo2, setOnRefreshWhenDelete / setGoToFeed
export const AlertFormForModifyAndDelete = (props) => {
    const nav = useNavigation();

    const [isStep1ForDelete, setIsStep1ForDelete] = useState(true);
    const [isStep2ForDelete, setIsStep2ForDelete] = useState(false);

    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
    const [alertText, setAlertText] = useState('신고로 사용이 정지된 회원입니다.');

    useEffect(() => {
        setIsStep1ForDelete(true);
        setIsStep2ForDelete(false);
    }, [props.modalVisible]);

    const logout = async () => {
        const currentLogin = await Cookies.getCurrentLogin();
        await Cookies.removeCookie(currentLogin);
        await removeAutoLogin();
        props.setGoToFeed(false);
    }

    const onBackdropPress = () => {
        props.setModalVisible(false);
        setIsStep1ForDelete(true);
        setIsStep2ForDelete(false);
    }

    const onPressModify = async () => {
        props.setModalVisible(false);
        props.setReviewInfo(props.reviewInfo);
        const reviewInfo2 = await reviewDetail(props.reviewInfo.reviewId);
        props.setReviewInfo2(reviewInfo2);
        nav.navigate('ReviewUpdate1', {reviewInfo: props.reviewInfo, reviewInfo2: reviewInfo2});
    }

    const onPressDelete = () => {
        setIsStep1ForDelete(false);
        setIsStep2ForDelete(true);
    }

    const onPressDeleteReview = async () => {
        props.setModalVisible(false);
        const res = await reviewDelete(props.reviewInfo.reviewId);
        if (res === "banned member") {
            props.setModalVisible(false);

            setAlertModalVisible(!alertModalVisible);
            setAlertImage(require('@images/x_red.png'));
            setAlertText('신고로 사용이 정지된 회원입니다.');
            setTimeout(() => {
                setAlertModalVisible(alertModalVisible);
            }, 1000);
            setTimeout(() => {
                logout();
            }, 2000);
            return;
        }
        props.setOnRefreshWhenDelete(true);
    }

    return (
        <>
            <AlertForm modalVisible={alertModalVisible} setModalVisible={setAlertModalVisible} borderColor="#F5F8F5" bgColor="#F5F8F5" image={alertImage} textColor="#191919" text={alertText}></AlertForm>

            <Modal animationIn={"fadeIn"} animationOut={"fadeOut"} transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.5} onBackdropPress={onBackdropPress}>
                {isStep1ForDelete && !isStep2ForDelete ?
                    <View style={tw`flex flex-col w-[230px] h-[114px] bg-white rounded-[15px] justify-around self-center`}>
                        <Pressable onPress={onPressModify}><Text style={tw`text-center text-sm text-[#191919] my-[20px]`}>수정하기</Text></Pressable>
                        <View style={tw`border-b border-solid border-[#D3D4D3]`}></View>
                        <Pressable onPress={onPressDelete}><Text style={tw`text-center text-sm text-[#E94A4B] my-[20px]`}>삭제하기</Text></Pressable>
                    </View>
                : isStep2ForDelete && !isStep1ForDelete ?
                    <View style={tw`flex flex-col w-[230px] h-[136px] bg-white rounded-[15px] justify-around self-center`}>
                        <Text style={tw`text-center text-base text-[#191919] my-[20px]`}>리뷰를 삭제하시겠습니까?</Text>
                        <View style={tw`border-b border-solid border-[#D3D4D3]`}></View>
                        <Pressable onPress={onPressDeleteReview}><Text style={tw`text-center text-sm text-[#E94A4B] mb-[14px]`}>삭제하기</Text></Pressable>
                    </View>
                : null}
            </Modal>
        </>
    )
}

// props: modalVisible, setModalVisible, reviewInfo / setGoToFeed
export const AlertFormForReport = (props) => {
    const [isStep1, setIsStep1] = useState(true);
    const [isStep2, setIsStep2] = useState(false);
    const [isStep3, setIsStep3] = useState(false);

    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
    const [alertText, setAlertText] = useState('신고로 사용이 정지된 회원입니다.');

    useEffect(() => {
        setIsStep1(true);
        setIsStep2(false);
        setIsStep3(false);
    }, [props.modalVisible]);

    const logout = async () => {
        const currentLogin = await Cookies.getCurrentLogin();
        await Cookies.removeCookie(currentLogin);
        await removeAutoLogin();
        props.setGoToFeed(false);
    }

    const [reportReason, setReportReason] = useState('SPOILER');

    const onBackdropPress = () => {
        props.setModalVisible(false);
        setIsStep1(true);
        setIsStep2(false);
        setIsStep3(false);
    }

    const onPressReport = () => {
        setIsStep1(false);
        setIsStep2(true);
    }

    const onPressSubmit = async () => {
        const res = await reviewReport(props.reviewInfo.reviewId, reportReason);
        if (res === "banned member") {
            props.setModalVisible(false);

            setAlertModalVisible(!alertModalVisible);
            setAlertImage(require('@images/x_red.png'));
            setAlertText('신고로 사용이 정지된 회원입니다.');
            setTimeout(() => {
                setAlertModalVisible(alertModalVisible);
            }, 1000);
            setTimeout(() => {
                logout();
            }, 2000);
            return;
        }

        setIsStep2(false);
        setIsStep3(true);
        setReportReason('SPOILER');

        setTimeout(() => {
            props.setModalVisible(false);
        }, 1000);
    }

    return (
        <>
            <AlertForm modalVisible={alertModalVisible} setModalVisible={setAlertModalVisible} borderColor="#F5F8F5" bgColor="#F5F8F5" image={alertImage} textColor="#191919" text={alertText}></AlertForm>
            <Modal animationIn={"fadeIn"} animationOut={"fadeOut"} transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.5} onBackdropPress={onBackdropPress}>
                {isStep1 && !isStep2 && !isStep3 ? 
                    <View style={tw`flex flex-col w-[230px] h-[52px] bg-white rounded-[15px] justify-around self-center`}>
                        <Pressable onPress={onPressReport}><Text style={tw`text-center text-sm text-[#E94A4B]`}>신고하기</Text></Pressable>
                    </View>

                : isStep2 && !isStep1 && !isStep3 ?
                    <View style={tw`flex flex-col w-[230px] h-[318px] bg-white rounded-[15px] justify-around self-center`}>
                        <Text style={tw`text-center text-base font-medium text-[#191919] mt-[24px] mb-[24px]`}>신고 사유</Text>
                        <Pressable style={tw`flex flex-row justify-between items-center`} onPress={() => setReportReason('SPOILER')}>
                            <Text style={tw`text-sm text-left text-[#191919] ml-[24px]`}>스포일러 포함</Text>
                            {reportReason === 'SPOILER' && (<Image source={require('@images/check.png')} style={tw`w-[16px] h-[11.75758px] mr-[24px]`}></Image>)}
                        </Pressable>
                        <Pressable style={tw`flex flex-row justify-between items-center`} onPress={() => setReportReason('INAPPROPRIATE')}>
                            <Text style={tw`text-sm text-left text-[#191919] ml-[24px]`}>부적절한 언어 표현</Text>
                            {reportReason === 'INAPPROPRIATE' && (<Image source={require('@images/check.png')} style={tw`w-[16px] h-[11.75758px] mr-[24px]`}></Image>)}
                        </Pressable>
                        <Pressable style={tw`flex flex-row justify-between items-center`} onPress={() => setReportReason('PROMOTION')}>
                            <Text style={tw`text-sm text-left text-[#191919] ml-[24px]`}>스팸 및 홍보글</Text>
                            {reportReason === 'PROMOTION' && (<Image source={require('@images/check.png')} style={tw`w-[16px] h-[11.75758px] mr-[24px]`}></Image>)}
                        </Pressable>
                        <Pressable style={tw`flex flex-row justify-between items-center`} onPress={() => setReportReason('SPAM')}>
                            <Text style={tw`text-sm text-left text-[#191919] ml-[24px]`}>도배글</Text>
                            {reportReason === 'SPAM' && (<Image source={require('@images/check.png')} style={tw`w-[16px] h-[11.75758px] mr-[24px]`}></Image>)}
                        </Pressable>
                        <View style={tw`border-b border-solid border-[#D3D4D3]`}></View>
                        <Pressable onPress={onPressSubmit} style={tw`self-center`}>
                            <Text style={tw`text-sm text-center font-medium text-[#191919] mb-[14px]`}>제출</Text>
                        </Pressable>
                    </View>

                : isStep3 && !isStep1 && !isStep2 ?
                    <View style={tw`flex flex-col w-[65%] h-[110px] border-solid border-2 rounded-[15px] self-center justify-center items-center bg-[#FAFAFA] border-[#FAFAFA]`}>
                        <Image source={require("@images/check.png")} style={tw`w-[24px] h-[17.63637px] self-center`}></Image> 
                        <Text style={tw`text-sm font-medium mt-[20px] text-[#191919]`}>제출되었습니다</Text>
                    </View>
                : null}
            </Modal>
        </>
    )
}

// props: modalVisible, setModalVisible, contractNum
export const ContractForm = (props) => {
    return (
        <Modal animationIn={"fadeIn"} animationOut={"fadeOut"} transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.5} onBackdropPress={() => props.setModalVisible(false)}>
            <View style={tw`flex flex-col w-[95%] h-[90%] bg-[#F5F8F5] rounded-[15px] justify-around self-center`}>
                <View style={tw`w-[90%] self-center flex-row justify-between items-center`}>
                    <Image source={require("@images/x.png")} style={tw`tint-[#F5F8F5] w-[20px] h-[20px]`} />
                    <Text style={tw`text-base font-medium mt-[24px] mb-[20px] text-[#191919]`}>
                        {props.contractNum === 1 ? '이용약관' : '개인정보 처리 방침'}
                    </Text>
                    <Pressable onPress={() => props.setModalVisible(false)}><Image source={require("@images/x.png")} style={tw`tint-[#191919] w-[20px] h-[20px]`} /></Pressable>
                </View>
                <ScrollView style={tw`w-[90%] self-center mb-[31px]`}>
                    {props.contractNum === 1 ? <Contract1 /> : <Contract2 />}
                </ScrollView>
            </View>
        </Modal>
    )
}

// props: modalVisible, setModalVisible, setIfClearedVerificationStage, email
export const EmailVerityForm = (props) => {
    const [verificationNumber, setVerificationNumber] = useState('');
    const [resendModal, setResendModal] = useState(false);
    const [verificationSuccessModal, setVerificationSuccessModal] = useState(false);
    const [verificationFailModal, setVerificationFailModal] = useState(false);

    const [count, setCount] = useState(300);
    useEffect(() => {
        setCount(300);
    }, [props.modalVisible]);

    useEffect(() => {
        if (count === 0) {
            props.setModalVisible(false);
        }
        const id = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);
        if (count === 0) {
            clearInterval(id);
        }
        return () => clearInterval(id);
    }, [count]);

    const onPressResend = async () => {
        setCount(300);
        setResendModal(!resendModal);
        setTimeout(() => {
            setResendModal(resendModal);
        }, 1000);

        try {
            const response = await axios.post('http://3.39.145.210/member/join/email', {
                "mailAddress": id,
            });
            console.log(response.data)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const onPressConfirm = async () => {
        setCount(300);

        try {
            const response = await axios.post('http://3.39.145.210/member/join/email/verify', {
                "email": props.email,
                "code": verificationNumber,
            });
            if (response.data) {
                props.setIfClearedVerificationStage(true);
                setVerificationSuccessModal(true);
                setTimeout(() => {
                    setVerificationSuccessModal(false);
                }, 1000);
                props.setModalVisible(false);
            }
            else {
                setVerificationFailModal(true);
                setTimeout(() => {
                    setVerificationFailModal(false);
                }, 1000);
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <Modal animationIn={"fadeIn"} animationOut={"fadeOut"} transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.5} onBackdropPress={() => { props.setModalVisible(false); setCount(300); }}>
            <View style={tw`flex flex-col w-[90%] h-[200px] border-solid border-2 rounded-[15px] self-center justify-center items-center bg-[#FAFAFA] border-[#FAFAFA] mb-[150px]`}>
                <Text style={tw`text-sm mt-[10px] text-[#191919]`}>적어주신 이메일로 본인인증 메일을 보냈어요.{'\n'}5분 이내로 메일에 적힌 번호를 입력해주세요.</Text>
                <TextInput style={tw`w-[90%] border-solid border-b-2 border-[#ABABAB] mt-[20px] bg-[#FAFAFA]`} placeholder="인증번호를 입력해주세요." onChangeText={(text) => setVerificationNumber(text)} onSubmitEditing={onPressConfirm} keyboardType='numeric'></TextInput>
                <View style={tw`flex-row justify-between w-[90%] mt-[20px]`}>
                    <View style={tw`flex-row`}>
                        <Text style={tw`text-sm text-[#191919] mr-[20px]`}>남은 시간</Text>
                        <Text style={tw`text-sm text-[#E94A4B]`}>{Math.floor(count / 60)}:{count % 60 < 10 ? `0${count % 60}` : count % 60}</Text>
                    </View>
                    <View style={tw`flex-row`}>
                        <Pressable onPress={onPressResend}>
                            <Text style={tw`text-sm text-[#191919] mr-[20px]`}>재전송</Text>
                        </Pressable>
                        <Pressable onPress={onPressConfirm}>
                            <Text style={tw`text-sm text-[#191919]`}>확인</Text>
                        </Pressable>

                        <AlertForm modalVisible={resendModal} setModalVisible={setResendModal} borderColor="#FAFAFA" bgColor="#FAFAFA" image={require("@images/check.png")} textColor="#191919" text="재전송 되었습니다" />
                        <AlertForm modalVisible={verificationSuccessModal} setModalVisible={setVerificationSuccessModal} borderColor="#FAFAFA" bgColor="#FAFAFA" image={require("@images/check.png")} textColor="#191919" text="인증되었습니다" />
                        <AlertForm modalVisible={verificationFailModal} setModalVisible={setVerificationFailModal} borderColor="#FAFAFA" bgColor="#FAFAFA" image={require("@images/x_red.png")} textColor="#191919" text="인증번호가 일치하지 않습니다" />
                    </View>
                </View>
            </View>
        </Modal>
    )
}
