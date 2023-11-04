// 리뷰 작성용 페이지 (수정용 페이지는 따로 만들 예정, 구조는 동일하지만 정보 채워져 있음)

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import tw from 'twrnc';

import { useNavigation } from '@react-navigation/native';

import { ChooseYearForm, ChooseMonthForm, ChooseDayForm } from '@forms/ChoosingDateForm';
import MakeStarReviewForm from '@forms/MakeStarReviewForm';
import AlertForm from '@forms/AlertForm';

export default function ReviewWrite1({isCookie, musicalId, musicalPoster, musicalTitle}) {
    const nav = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
    const [alertText, setAlertText] = useState('관람일자를 입력해주세요');

    // 추가 정보
    const [isExtraInfoExpanded, setIsExtraInfoExpanded] = useState(false);

    // 관람일자
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);

    // 별점 평가
    const [star, setStar] = useState(0);

    // 한줄평
    const [shortReview, setShortReview] = useState('');
    const [isShortReviewSpoiler, setIsShortReviewSpoiler] = useState(false);
    const [shortReviewCheckRectangle, setShortReviewCheckRectangle] = useState(require('@images/rectangle.png'));

    // 긴줄평
    const [longReview, setLongReview] = useState('');

    const checkShortReviewSpoiler = () => {
        if (shortReviewCheckRectangle === require('@images/rectangle.png')) {
            setIsShortReviewSpoiler(true);
            setShortReviewCheckRectangle(require('@images/rectangle_checked_with_border.png'));
        } else {
            setIsShortReviewSpoiler(false);
            setShortReviewCheckRectangle(require('@images/rectangle.png'));
        }
    };

    const goBack = () => {
        nav.goBack();
    };

    const onPressSave = () => {
        if (year === 0 || month === 0 || day === 0) {
            setModalVisible(!modalVisible);
            setAlertImage(require('@images/x_red.png'));
            setAlertText('관람일자를 입력해주세요');
            setTimeout(() => {
                setModalVisible(modalVisible);
            }, 1000);
            return;
        }
        if (!star) {
            setModalVisible(!modalVisible);
            setAlertImage(require('@images/x_red.png'));
            setAlertText('별점 평가를 입력해주세요');
            setTimeout(() => {
                setModalVisible(modalVisible);
            }, 1000);
            return;
        }
        if (!shortReview) {
            setModalVisible(!modalVisible);
            setAlertImage(require('@images/x_red.png'));
            setAlertText('한줄평을 입력해주세요');
            setTimeout(() => {
                setModalVisible(modalVisible);
            }, 1000);
            return;
        }

        console.log(`${year}년 ${month}월 ${day}일 관람, ${star}점, ${isShortReviewSpoiler ? '스포' : '비스포'}일러, ${shortReview}`);
        // 백 연결 구현
        // AlertForm "저장되었습니다" 띄우기
        // 그 다음 어디로 가지?
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <AlertForm modalVisible={modalVisible} setModalVisible={setModalVisible} borderColor="#F5F8F5" bgColor="#F5F8F5" image={alertImage} textColor="#191919" text={alertText}></AlertForm>
            </View>
            
            <View style={tw`flex-row items-center justify-between mt-5 mb-[14px]`}>
                <Pressable onPress={goBack} style={tw`flex-row`}>
                    <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] mr-[8px] w-[10px] h-[18px] tint-[#191919]`}></Image>
                    <View style={tw`px-[20px]`}></View>
                </Pressable>
                <Text style={tw`text-[#191919] text-base font-medium`}>리뷰 작성</Text>
                <Pressable onPress={onPressSave} style={tw`flex-row`}>
                    <View style={tw`px-[20px]`}></View>
                    <Text style={tw`text-[#191919] text-sm mr-[20px]`}>저장</Text>
                </Pressable>
            </View>
            <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>

            <View style={tw`flex-row items-center my-[15px]`}>
                <Image source={{uri: musicalPoster}} style={tw`w-[50px] h-[72.018px] mx-[5%] mr-[10px] rounded-2`}></Image>
                <Text style={tw`text-[#000] text-base font-medium leading-[25px]`}>{musicalTitle}</Text>
            </View>

            <ScrollView>
            <View style={tw`border-4 border-[#F0F0F0] mb-[15px]`}></View>
            {!isExtraInfoExpanded ?
                <>
                    <Pressable onPress={() => { setIsExtraInfoExpanded(!isExtraInfoExpanded); }} style={tw`flex-row items-center justify-center`}>
                        <Text style={tw`mr-[7px] text-[#191919] text-sm font-medium`}>추가 정보</Text>
                        <Image source={require('@images/chevron_down.png')} style={tw`w-[14.4px] h-[8px] tint-[#191919]`} />
                    </Pressable>
                </>
                :
                <>
                    <View style={tw`mx-[5%]`}>
                        <View style={tw`flex-row items-center mt-[3px] mb-[19px]`}>
                            <Text style={tw`text-[#191919] text-sm w-[15%]`}>캐스팅</Text>
                            <Pressable onPress={()=>Alert.alert("캐스팅 추가")}>
                                <Image source={require('@images/add_button.png')} style={tw`w-[20px] h-[20px]`}></Image>
                            </Pressable>
                        </View>
                        <View style={tw`flex-row items-center mb-[19px]`}>
                            <Text style={tw`text-[#191919] text-sm w-[15%]`}>좌석</Text>
                            <Pressable onPress={()=>Alert.alert("좌석 추가")}>
                                <Image source={require('@images/add_button.png')} style={tw`w-[20px] h-[20px]`}></Image>
                            </Pressable>
                        </View>
                    </View>
                    <Pressable onPress={() => { setIsExtraInfoExpanded(!isExtraInfoExpanded); }} style={tw`flex-row items-center justify-center`}>
                        <Text style={tw`mr-[7px] text-[#191919] text-sm font-medium`}>추가 정보</Text>
                        <Image source={require('@images/chevron_up.png')} style={tw`w-[14.4px] h-[8px] tint-[#191919]`} />
                    </Pressable>
                </>
            }
            <View style={tw`border-4 border-[#F0F0F0] mt-[15px] mb-[30px]`}></View>
            
            <View style={tw`flex-row mb-[40px] mx-[5%]`}>
                <Text style={tw`text-[#191919] text-sm w-[30%]`}>관람일자</Text>
                <ChooseYearForm setYear={setYear} />
                <ChooseMonthForm setMonth={setMonth} />
                <ChooseDayForm setDay={setDay} />
            </View>

            <View style={tw`flex-row mb-[40px] mx-[5%]`}>
                <Text style={tw`text-[#191919] text-sm w-[30%]`}>별점 평가</Text>
                <View style={tw`flex-col justify-center items-center flex-1`}>
                    {star === 0 ? <Text style={tw`text-[#B6B6B6] text-sm`}>별을 눌러 작품을 평가해주세요</Text>
                    : star === 0.5 ? <Text style={tw`text-[#191919] text-sm`}>많이 아쉬웠던 작품</Text> 
                    : star === 1 ? <Text style={tw`text-[#191919] text-sm`}>많이 아쉬웠던 작품</Text>
                    : star === 1.5 ? <Text style={tw`text-[#191919] text-sm`}>한 번은 볼만한 작품</Text>
                    : star === 2 ? <Text style={tw`text-[#191919] text-sm`}>한 번은 볼만한 작품</Text>
                    : star === 2.5 ? <Text style={tw`text-[#191919] text-sm`}>한 번은 볼만한 작품</Text>
                    : star === 3 ? <Text style={tw`text-[#191919] text-sm`}>다시 한 번 보고 싶은 작품</Text>
                    : star === 3.5 ? <Text style={tw`text-[#191919] text-sm`}>다시 한 번 보고 싶은 작품</Text>
                    : star === 4 ? <Text style={tw`text-[#191919] text-sm`}>추천하고 싶은 작품</Text>
                    : star === 4.5 ? <Text style={tw`text-[#191919] text-sm`}>나의 인생작</Text>
                    : <Text style={tw`text-[#191919] text-sm`}>내 인생 최고의 명작</Text>
                    }
                    <MakeStarReviewForm setStar={setStar} />
                </View>
            </View>
            
            <View style={tw`flex-row mx-[5%]`}>
                <View style={tw`w-[30%]`}>
                    <Text style={tw`text-[#191919] text-sm`}>한줄평 적기</Text>
                </View>
                <Pressable onPress={()=>Alert.alert("한줄평 작성 모듈")} style={tw`border-solid border-b-[1px] border-[#CCCCCC] flex-1 justify-between flex-row`}>
                    <Text style={tw`text-[#B6B6B6] text-sm mb-[10px]`}>“</Text>
                    <Text style={tw`mx-[8px]`}>{shortReview}</Text>
                    <Text style={tw`text-[#B6B6B6] text-sm mb-[10px]`}>”</Text>
                </Pressable>
            </View>
            <View style={tw`flex-row items-center self-start mx-[5%] mt-4`}>
                <View style={tw`w-[30%]`}></View>
                <Pressable onPress={checkShortReviewSpoiler}>
                    <Image source={shortReviewCheckRectangle} style={tw`mr-2 w-[16px] h-[16px]`}></Image>
                </Pressable>
                <Text style={tw`text-[#B6B6B6] text-xs`}>스포일러 포함</Text>
            </View>
            </ScrollView>

            <View style={tw`absolute bottom-[30px] w-[90%] h-[33px] border-solid self-center`}>
            <Pressable onPress={()=>Alert.alert("긴줄평 적기 페이지로 이동")}>
                <View style={tw`w-[100%] h-[100%] shadow-sm rounded-[24px] bg-[#FFF] justify-center items-center`}>
                    <Text style={tw`text-[#191919] text-xs`}>긴줄평 적기</Text>
                </View>
            </Pressable>
            </View>
            

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FAFAFA',
    },
});
