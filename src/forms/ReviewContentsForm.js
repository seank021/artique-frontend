import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from 'react-native-modal';

import tw from 'twrnc';

// 캐스팅 입력 모듈
// props: modalVisible, setModalVisible, castings, setFinalCastings
export const CastingForm = (props) => {
    const [placeholder, setPlaceholder] = useState("배우 이름을 입력해주세요")
    const [editable, setEditable] = useState(true)
    const [casting, setCasting] = useState("") // 배우 이름
    const [castings, setCastings] = useState(props.castings) // 배우 이름 리스트

    const addCasting = () => {
        if (casting.trim() === "") return;
        setCastings([...castings, casting]);
        setCasting("");

        if (castings.length >= 6) {
            setPlaceholder("최대 7명까지 입력 가능합니다");
            setEditable(false);
        } else {
            setPlaceholder("배우 이름을 입력해주세요");
            setEditable(true);
        }
    }

    const removeCasting = (index) => {
        setCastings(castings.filter((cast, i) => i !== index));
    }

    const onPressSave = () => { // castings ReviewWrite에 넘겨주기
        props.setFinalCastings(castings);
        props.setModalVisible(false);
    }

    return (
        <Modal animationIn={"fadeIn"} animationOut={"fadeOut"} transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.5} onBackdropPress={() => props.setModalVisible(false)}>
            <View style={tw`flex flex-col justify-around items-center self-center w-[230px] bg-[#FAFAFA] rounded-[15px] mb-[150px]`}>
                <Text style={tw`text-[#191919] text-base font-medium mt-[24px] mb-[12px]`}>캐스팅 입력하기</Text>
                {castings.map((cast, index) => (
                    <View key={index} style={tw`flex-row items-center`}>
                        <Text style={tw`text-[#191919] text-sm my-[7.5px] mr-[10px]`}>{cast}</Text>
                        <Pressable onPress={() => removeCasting(index)}><Image source={require('@images/x.png')} style={tw`w-[14px] h-[14px] tint-[#ABABAB]`}></Image></Pressable>
                    </View>
                ))}
                <TextInput style={tw`text-sm mb-[15px]`} placeholder={placeholder} editable={editable} placeholderTextColor="#B6B6B6" onChangeText={(text) => setCasting(text)} value={casting}></TextInput>
                <Pressable onPress={addCasting}><Image source={require('@images/add_button.png')} style={tw`w-[20px] h-[20px] mb-[30px] mt-[5px]`}></Image></Pressable>
                <View style={tw`w-[100%] border-[0.5px] border-[#D3D4D3]`}></View>
                <Pressable onPress={onPressSave}><Text style={tw`text-[#191919] text-sm my-[15px]`}>저장</Text></Pressable>
            </View>
        </Modal>
    )
}

// 좌석 입력 모듈
// props: modalVisible, setModalVisible, seat, setFinalSeat
export const SeatForm = (props) => {
    const [seat, setSeat] = useState(props.seat) // 좌석 위치

    const onPressSave = () => { // seat ReviewWrite에 넘겨주기
        if (seat.trim() === "") props.setModalVisible(false);
        setSeat(seat);
        props.setFinalSeat(seat);
        props.setModalVisible(false);
    }

    return (
        <Modal animationIn={"fadeIn"} animationOut={"fadeOut"} transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.5} onBackdropPress={() => props.setModalVisible(false)}>
            <View style={tw`flex flex-col justify-around items-center self-center w-[230px] bg-[#FAFAFA] rounded-[15px] mb-[150px]`}>
                <Text style={tw`text-[#191919] text-base font-medium mt-[24px] mb-[12px]`}>좌석 입력하기</Text>
                <TextInput style={tw`text-sm mb-[15px]`} value={seat} defaultValue={seat} placeholder="좌석 위치를 입력해주세요" placeholderTextColor="#B6B6B6" onChangeText={(text) => setSeat(text)}></TextInput>
                <View style={tw`w-[100%] border-[0.5px] border-[#D3D4D3]`}></View>
                <Pressable onPress={onPressSave}><Text style={tw`text-[#191919] text-sm my-[15px]`}>저장</Text></Pressable>
            </View>
        </Modal>
    )
}

// 한줄평 입력 모듈
// props: modalVisible, setModalVisible, shortReview, setFinalShortReview
export const ShortReviewForm = (props) => {
    const [shortReview, setShortReview] = useState(props.shortReview) // 한줄평
    const [charCount, setCharCount] = useState(props.shortReview.length); // 문자 수

    const onShortReviewChange = (text) => {
        if (text.length <= 50) { // 최대 50자 제한
            setShortReview(text);
            setCharCount(text.length);
        }
    }

    const onPressSave = () => { // shortReview ReviewWrite에 넘겨주기
        if (shortReview.trim() === "") props.setModalVisible(false);
        setShortReview(shortReview);
        props.setFinalShortReview(shortReview);
        props.setModalVisible(false);
    }

    return (
        <Modal animationIn={"fadeIn"} animationOut={"fadeOut"} transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.5} onBackdropPress={() => props.setModalVisible(false)}>
            <View style={tw`flex flex-col justify-around items-center self-center w-[300px] bg-[#FAFAFA] rounded-[15px] absolute top-[40%]`}>
                <TextInput style={tw`flex flex-wrap text-sm mt-[28px] self-start mx-[26px]`} defaultValue={shortReview} placeholder="한줄평을 입력해주세요" placeholderTextColor="#B6B6B6" onChangeText={onShortReviewChange} maxLength={50} multiline={true} value={shortReview}></TextInput>
                <Text style={tw`text-[#B6B6B6] text-sm mb-[27px] self-end mr-[26px]`}>{charCount} / 50</Text>
                <View style={tw`w-[100%] border-[0.5px] border-[#D3D4D3]`}></View>
                <Pressable onPress={onPressSave}><Text style={tw`text-[#191919] text-sm my-[15px]`}>저장</Text></Pressable>
            </View>
        </Modal>
    )
}

// 긴줄평 입력 모듈
// props: modalVisible, setModalVisible, longReview, setFinalLongReview, isLongReviewSpoiler, setIsFinalLongReviewSpoiler
export const LongReviewForm = (props) => {
    const [isLongReviewSpoiler, setIsLongReviewSpoiler] = useState(props.isLongReviewSpoiler);
    const [longReviewCheckRectangle, setLongReviewCheckRectangle] = useState(isLongReviewSpoiler ? require('@images/rectangle_checked_with_border.png') : require('@images/rectangle.png'));

    const [charCount, setCharCount] = useState(props.longReview.length); // 문자 수
    const [longReview, setLongReview] = useState(props.longReview); // 긴줄평

    const goBack = () => {
        props.setFinalLongReview(longReview);
        props.setIsFinalLongReviewSpoiler(isLongReviewSpoiler);
        props.setModalVisible(false);
    };

    const onLongReviewChange = (text) => {
        if (text.length <= 2500) { // 최대 2500자 제한
            setLongReview(text);
            setCharCount(text.length);
        }
    }

    const checkLongReviewSpoiler = () => {
        if (longReviewCheckRectangle === require('@images/rectangle.png')) {
            setIsLongReviewSpoiler(true);
            setLongReviewCheckRectangle(require('@images/rectangle_checked_with_border.png'));
        } else {
            setIsLongReviewSpoiler(false);
            setLongReviewCheckRectangle(require('@images/rectangle.png'));
        }
    };

    return (
        <Modal animationIn={"fadeIn"} animationOut={"fadeOut"} transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.5} onBackdropPress={goBack}>
            <SafeAreaView style={styles.container}>
                <View style={tw`flex-row items-center justify-between mt-5 mb-[14px]`}>
                    <Pressable onPress={goBack} style={tw`flex-row`}>
                        <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] mr-[8px] w-[10px] h-[18px] tint-[#191919]`}></Image>
                        <View style={tw`px-[20px]`}></View>
                    </Pressable>
                    <Text style={tw`text-[#191919] text-base font-medium`}>긴줄평 적기</Text>
                    <View style={tw`flex-row`}>
                        <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] mr-[8px] w-[10px] h-[18px] tint-[#FAFAFA]`}></Image>
                        <View style={tw`px-[20px]`}></View>
                    </View>
                </View>
                <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>

                <View style={tw`flex-row items-center justify-between mt-[24px]`}>
                    <View style={tw`flex-row items-center self-start ml-[5%]`}>
                        <Pressable onPress={checkLongReviewSpoiler}>
                            <Image source={longReviewCheckRectangle} style={tw`mr-2 w-[16px] h-[16px]`}></Image>
                        </Pressable>
                        <Text style={tw`text-[#B6B6B6] text-xs`}>스포일러 포함</Text>
                    </View>
                    <Text style={tw`text-[#B6B6B6] text-xs mb-[21px] self-end mr-[5%]`}>{charCount} / 2500</Text>
                </View>
                
                <View style={tw`flex-1 flex-row justify-between bg-[#F5F5F5] w-[90%] h-[80%] self-center rounded-[5px] mb-[10px]`}>
                    <TextInput style={tw`flex flex-wrap text-sm self-start mx-[26px] my-[10px]`} defaultValue={longReview} placeholder="긴줄평을 입력해주세요" placeholderTextColor="#B6B6B6" onChangeText={onLongReviewChange} maxLength={2500} multiline={true} value={longReview}></TextInput>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FAFAFA',
        width: '100%',
        height: '90%',
        borderRadius: 15,
        position: 'absolute',
        top: "5%",
    },
});


