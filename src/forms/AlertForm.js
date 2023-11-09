import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, ScrollView, Alert } from 'react-native';
import Modal from 'react-native-modal';

import tw from 'twrnc';

import { useNavigation } from '@react-navigation/native';

import { Contract1, Contract2 } from '@forms/ContractContents';

import { reviewDetail, reviewDelete } from '@functions/api';

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
    const onPressSelect = async() => {
        const response = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
        });
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                let imageUri = response.uri || response.assets[0]?.uri;
                props.setImage(imageUri);
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

// props: modalVisible, setModalVisible, reviewInfo, setReviewInfo, setReviewInfo2, setOnRefreshWhenDelete
export const AlertFormForModifyAndDelete = (props) => {
    const nav = useNavigation();

    const [isStep1ForDelete, setIsStep1ForDelete] = useState(true);
    const [isStep2ForDelete, setIsStep2ForDelete] = useState(false);

    useEffect(() => {
        setIsStep1ForDelete(true);
        setIsStep2ForDelete(false);
    }, [props.modalVisible]);

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
        await reviewDelete(props.reviewInfo.reviewId);
        props.setOnRefreshWhenDelete(true);
    }

    return (
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
    )
}

// props: modalVisible, setModalVisible
export const AlertFormForReport = (props) => {
    const [isStep1, setIsStep1] = useState(true);
    const [isStep2, setIsStep2] = useState(false);
    const [isStep3, setIsStep3] = useState(false);

    useEffect(() => {
        setIsStep1(true);
        setIsStep2(false);
        setIsStep3(false);
    }, [props.modalVisible]);

    const [reportReason, setReportReason] = useState('스포일러 포함');

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

    const onPressSubmit = () => {
        console.log(reportReason);
        setIsStep2(false);
        setIsStep3(true);
        setReportReason('스포일러 포함');

        setTimeout(() => {
            props.setModalVisible(false);
        }, 1000);
    }

    return (
        <Modal animationIn={"fadeIn"} animationOut={"fadeOut"} transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.5} onBackdropPress={onBackdropPress}>
            {isStep1 && !isStep2 && !isStep3 ? 
                <View style={tw`flex flex-col w-[230px] h-[52px] bg-white rounded-[15px] justify-around self-center`}>
                    <Pressable onPress={onPressReport}><Text style={tw`text-center text-sm text-[#E94A4B]`}>신고하기</Text></Pressable>
                </View>

            : isStep2 && !isStep1 && !isStep3 ?
                <View style={tw`flex flex-col w-[230px] h-[318px] bg-white rounded-[15px] justify-around self-center`}>
                    <Text style={tw`text-center text-base font-medium text-[#191919] mt-[24px] mb-[24px]`}>신고 사유</Text>
                    <Pressable style={tw`flex flex-row justify-between items-center`} onPress={() => setReportReason('스포일러 포함')}>
                        <Text style={tw`text-sm text-left text-[#191919] ml-[24px]`}>스포일러 포함</Text>
                        {reportReason === '스포일러 포함' && (<Image source={require('@images/check.png')} style={tw`w-[16px] h-[11.75758px] mr-[24px]`}></Image>)}
                    </Pressable>
                    <Pressable style={tw`flex flex-row justify-between items-center`} onPress={() => setReportReason('부적절한 언어 표현')}>
                        <Text style={tw`text-sm text-left text-[#191919] ml-[24px]`}>부적절한 언어 표현</Text>
                        {reportReason === '부적절한 언어 표현' && (<Image source={require('@images/check.png')} style={tw`w-[16px] h-[11.75758px] mr-[24px]`}></Image>)}
                    </Pressable>
                    <Pressable style={tw`flex flex-row justify-between items-center`} onPress={() => setReportReason('스팸 및 홍보글')}>
                        <Text style={tw`text-sm text-left text-[#191919] ml-[24px]`}>스팸 및 홍보글</Text>
                        {reportReason === '스팸 및 홍보글' && (<Image source={require('@images/check.png')} style={tw`w-[16px] h-[11.75758px] mr-[24px]`}></Image>)}
                    </Pressable>
                    <Pressable style={tw`flex flex-row justify-between items-center`} onPress={() => setReportReason('도배글')}>
                        <Text style={tw`text-sm text-left text-[#191919] ml-[24px]`}>도배글</Text>
                        {reportReason === '도배글' && (<Image source={require('@images/check.png')} style={tw`w-[16px] h-[11.75758px] mr-[24px]`}></Image>)}
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
