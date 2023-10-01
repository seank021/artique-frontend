import React, { useState } from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import tw from 'twrnc';

// props: modalVisible, setModalVisible / borderColor, bgColor, image, textColor, text
export default function AlertForm(props) {
    const alertFormStyles = {
        ...tw`flex flex-row w-[90%] h-[54px] border-solid border-2 rounded-3xl self-center justify-center items-center`,
        borderColor: props.borderColor,
        backgroundColor: props.bgColor,
    }

    const textStyles = {
        ...tw`font-semibold text-lg`,
        color: props.textColor,
    }

    return (
        <Modal animationIn="fadeIn" animationOut="fadeOut" transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.5}>
            <View style={alertFormStyles}>
                {props.image === require("@images/check.png") ?
                    <Image source={require("@images/check.png")} style={tw`mr-4 w-[24px] h-[17.63637px]`}></Image> 
                    : <Image source={require("@images/x_red.png")} style={tw`mr-4 w-[19px] h-[19px]`}></Image>
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

// props: longReviewModalVisible, setLongReviewModalVisible, longReview
export function LongReviewModal(props) {
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
