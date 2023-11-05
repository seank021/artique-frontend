import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import tw from 'twrnc';

import { useNavigation } from '@react-navigation/native';

import { ChooseYearForm, ChooseMonthForm, ChooseDayForm } from '@forms/ChoosingDateForm';
import MakeStarReviewForm from '@forms/MakeStarReviewForm';
import AlertForm from '@forms/AlertForm';

import { reviewDetail } from '@functions/api';
import { CastingForm, SeatForm, ShortReviewForm, LongReviewForm } from '@forms/ReviewContentsForm';

export default function ReviewUpdate1({ isCookie, reviewInfo, reviewInfo2 }) {
    const nav = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
    const [alertText, setAlertText] = useState('관람일자를 입력해주세요');

    // 추가 정보
    const [isExtraInfoExpanded, setIsExtraInfoExpanded] = useState(false);
    const [castingModalVisible, setCastingModalVisible] = useState(false); // 캐스팅 모달
    const [seatModalVisible, setSeatModalVisible] = useState(false); // 좌석 모달

    const [casting, setCasting] = useState([]); // 캐스팅 리스트
    useEffect(() => {
        if (reviewInfo2.casting) {
            reviewInfo2.casting.split(',').map((cast) => {
                setCasting((prevCasting) => [...prevCasting, cast]);
            });
        }
    }, []);
    const [seat, setSeat] = useState(reviewInfo2.seat); // 좌석

    // 관람일자
    const [year, setYear] = useState(parseInt(reviewInfo2.viewDate.substring(0, 4)));
    const [month, setMonth] = useState(parseInt(reviewInfo2.viewDate.substring(5, 7)));
    const [day, setDay] = useState(parseInt(reviewInfo2.viewDate.substring(8, 10)));

    // 별점 평가
    const [star, setStar] = useState(parseInt(reviewInfo2.rating));

    // 한줄평
    const [isShortReviewSpoiler, setIsShortReviewSpoiler] = useState(false);
    const [shortReviewCheckRectangle, setShortReviewCheckRectangle] = useState(require('@images/rectangle.png'));
    const [shortReviewModalVisible, setShortReviewModalVisible] = useState(false); // 한줄평 모달
    const [shortReview, setShortReview] = useState(reviewInfo2.shortReview);

    // 긴줄평
    const [longReviewModalVisible, setLongReviewModalVisible] = useState(false); // 긴줄평 모달
    const [longReview, setLongReview] = useState(reviewInfo2.longReview);
    const [isLongReviewSpoiler, setIsLongReviewSpoiler] = useState(false);      

    const onPressCasting = () => {
        setCastingModalVisible(!castingModalVisible);
    };

    const onPressSeat = () => {
        setSeatModalVisible(!seatModalVisible);
    };

    const onPressShortReview = () => {
        setShortReviewModalVisible(!shortReviewModalVisible);
    };

    const onPressLongReview = () => {
        setLongReviewModalVisible(!longReviewModalVisible);
    };

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

        console.log(`${casting} 캐스팅, ${seat} 좌석, ${year}년 ${month}월 ${day}일 관람, ${star}점, ${isShortReviewSpoiler ? '스포' : '비스포'}일러, ${shortReview}, ${isLongReviewSpoiler ? '스포' : '비스포'}일러, ${longReview}`);
        
        // year, month, day로 날짜 형식 맞추기 (YYYYMMDD)
        const yearString = year.toString();
        const monthString = month.toString();
        const dayString = day.toString();
        const finalYear = yearString.padStart(4, '0');
        const finalMonth = monthString.padStart(2, '0');
        const finalDay = dayString.padStart(2, '0');

        // 리뷰 업데이트 하기
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
                <Image source={{uri: reviewInfo.posterUrl}} style={tw`w-[50px] h-[72.018px] mx-[5%] mr-[10px] rounded-2`}></Image>
                <Text style={tw`text-[#000] text-base font-medium leading-[25px] w-[75%]`} numberOfLines={2}>{reviewInfo.musicalName}</Text>
            </View>

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
                            <Pressable onPress={onPressCasting}>
                                <Image source={require('@images/add_button.png')} style={tw`w-[20px] h-[20px] mr-[48px]`}></Image>
                            </Pressable>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={tw`flex-row`}>
                                {casting.map((cast, index) => (
                                    <View key={index} style={tw`flex-row mr-[4px] items-center bg-[#F5F5F5] h-[28px] rounded-[5px]`}>
                                        <Text style={tw`text-[#191919] text-xs mx-[15px]`}>{cast}</Text>
                                    </View>
                                ))}
                            </ScrollView>
                            <CastingForm modalVisible={castingModalVisible} setModalVisible={setCastingModalVisible} castings={casting} setFinalCastings={setCasting} />
                        </View>
                        <View style={tw`flex-row items-center mb-[19px]`}>
                            <Text style={tw`text-[#191919] text-sm w-[15%]`}>좌석</Text>
                            <Pressable onPress={onPressSeat}>
                                <Image source={require('@images/add_button.png')} style={tw`w-[20px] h-[20px] mr-[48px]`}></Image>
                            </Pressable>
                            {seat !== "" ?
                                <View style={tw`flex-row items-center bg-[#F5F5F5] h-[28px] rounded-[5px]`}>
                                    <Text style={tw`text-[#191919] text-xs mx-[15px]`}>{seat}</Text>
                                </View>
                            : null}
                            <SeatForm modalVisible={seatModalVisible} setModalVisible={setSeatModalVisible} seat={seat} setFinalSeat={setSeat} />
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
                <ChooseYearForm setYear={setYear} year_={year}/>
                <ChooseMonthForm setMonth={setMonth} month_={month}/>
                <ChooseDayForm setDay={setDay} day_={day}/>
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
                    <MakeStarReviewForm setStar={setStar} star_={star}/>
                </View>
            </View>
            
            <View style={tw`flex-row mx-[5%]`}>
                <View style={tw`w-[30%]`}>
                    <Text style={tw`text-[#191919] text-sm`}>한줄평 적기</Text>
                </View>
                <Pressable onPress={onPressShortReview} style={tw`border-solid border-b-[1px] border-[#CCCCCC] flex-1 justify-between flex-row`}>
                    <Text style={tw`text-[#B6B6B6] text-sm mb-[10px]`}>“</Text>
                    <Text style={tw`mx-[8px] mb-[7px] leading-[24px]`}>{shortReview}</Text>
                    <Text style={tw`text-[#B6B6B6] text-sm mb-[10px]`}>”</Text>
                </Pressable>
                <ShortReviewForm modalVisible={shortReviewModalVisible} setModalVisible={setShortReviewModalVisible} shortReview={shortReview} setFinalShortReview={setShortReview} />
            </View>
            <View style={tw`flex-row items-center self-start mx-[5%] mt-4`}>
                <View style={tw`w-[30%]`}></View>
                <Pressable onPress={checkShortReviewSpoiler}>
                    <Image source={shortReviewCheckRectangle} style={tw`mr-2 w-[16px] h-[16px]`}></Image>
                </Pressable>
                <Text style={tw`text-[#B6B6B6] text-xs`}>스포일러 포함</Text>
            </View>

            <View style={tw`absolute bottom-[20px] w-[90%] h-[33px] border-solid self-center`}>
                <Pressable onPress={onPressLongReview}>
                    <View style={tw`w-[100%] h-[100%] shadow-sm rounded-[24px] bg-[#FFF] justify-center items-center`}>
                        <Text style={tw`text-[#191919] text-xs`}>긴줄평 적기</Text>
                    </View>
                </Pressable>
                <LongReviewForm modalVisible={longReviewModalVisible} setModalVisible={setLongReviewModalVisible} longReview={longReview} setFinalLongReview={setLongReview} isLongReviewSpoiler={isLongReviewSpoiler} setIsFinalLongReviewSpoiler={setIsLongReviewSpoiler} />
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