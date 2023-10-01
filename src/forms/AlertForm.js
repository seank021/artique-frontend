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
        <Modal animationIn="fadeIn" animationOut="fadeOut" transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.5}>
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

// TODO: 정렬 기준 선택하면 자동으로 창 off 되게 하기
// props: sortModalVisible, setSortModalVisible, sortCriteria, setSortCriteria
export function AlertFormForSort(props) {
    const [sortCriteria, setSortCriteria] = useState(props.sortCriteria);

    const onPressSort = (criteria) => {
        setSortCriteria(criteria);
        props.setSortCriteria(criteria);
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

// props: longReviewModalVisible, setLongReviewModalVisible, longReview
export function LongReviewForm(props) {
    return (
        <Modal animationIn={"fadeIn"} animationOut={"fadeOut"} transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.5} onBackdropPress={() => props.setModalVisible(false)}>
            <View style={tw`flex flex-col h-[600px] bg-white rounded-[15px] self-center items-center justify-between`}>
                <Text style={tw`text-base text-[#191919] font-medium mt-[24px]`}>긴줄평</Text>
                <ScrollView style={tw`mx-[10%] mb-[57px]`} showsVerticalScrollIndicator={false}>
                    <Text style={tw`text-sm font-normal text-justify mt-[31px] text-[#191919] leading-[23px]`}>{props.longReview}</Text>
                </ScrollView>
            </View>
        </Modal>
    )
}

export function ProfileChangeForm(props) {
    const [image, setImage] = useState(props.image);

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
                console.log(imageUri);
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