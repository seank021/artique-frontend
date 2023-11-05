import React, { useState } from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import tw from 'twrnc';

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
            <View style={tw`flex flex-col w-9.5/10 h-7/10 bg-white rounded-2xl self-center items-center justify-between`}>
                <Text style={tw`text-base text-[#191919] font-medium mt-6`}>긴줄평</Text>
                <ScrollView style={tw`mx-8 mb-14`} showsVerticalScrollIndicator={false}>
                    <Text style={tw`text-sm font-normal text-justify mt-8 text-[#191919] leading-6`}>{props.longReview}</Text>
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
                console.log("RESPONSE", response)
                let image = response.base64 || response.assets[0]?.base64;
                console.log(image);
                props.setImage(image);
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