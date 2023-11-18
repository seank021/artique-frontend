import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import tw from 'twrnc';

import { ShortReviewFormInTutorial1, ShortReviewFormInTutorial2 } from '@forms/ReviewForm';

// props: modalVisible, setModalVisible
export const TutorialModal1 = (props) => {
    const onPressX = async () => {
        props.setModalVisible(false);
    }

    return (
        <Modal animationIn="fadeIn" animationOut="fadeOut" transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.8} onBackdropPress={onPressX}>
            <SafeAreaView style={styles.container}>
                <Pressable onPress={onPressX}><Image source={require("@images/x.png")} style={tw`w-[30px] h-[30px]`}></Image></Pressable>
                <View style={tw`items-center`}>
                    <View style={tw`flex-row ml-[30%] mb-[5px]`}>
                        <Image source={require("@images/arrow1.png")} style={tw`w-[30px] h-[64px] mb-[10px] mx-[10px]`}></Image>
                        <View style={tw`flex-col w-[70%]`}>
                            <Text style={tw`text-[#FFFFFF] font-bold text-[16px] leading-[16px] mb-[10px]`}>리뷰 상세 보기</Text>
                            <Text style={tw`text-[#FFFFFF] font-medium text-[12px] leading-[18px]`}>티켓 우측을 눌러 자세한 리뷰와 긴줄평을 볼 수 있어요</Text>
                        </View>
                    </View>
                    <ShortReviewFormInTutorial1
                        musicalName = "데스노트"
                        casting = "홍광호, 김준수, 정선아"
                        starRating = {5.0}
                        shortReview = "데스노트 짱!"
                    />
                    <View style={tw`flex-row mt-[100px]`}>
                        <ShortReviewFormInTutorial2
                            posterUrl = "http://www.kopis.or.kr/upload/pfmPoster/PF_PF219423_230531_224552.gif"
                        />
                        <Image source={require("@images/arrow2.png")} style={tw`w-[60px] h-[20px] absolute left-[137px] top-[10px] mb-[10px]`}></Image>
                        <Text style={tw`text-[#FFFFFF] font-bold text-[16px] leading-[16px] mb-[10px] absolute left-[190px] top-[40px] mb-[10px]`}>작품 상세 보기</Text>
                        <Text style={tw`text-[#FFFFFF] font-medium text-[12px] leading-[18px] absolute left-[190px] top-[66px] mb-[10px] w-[40%]`}>포스터를 눌러 작품의 정보와 평가를 볼 수 있어요</Text>
                    </View>

                    <View style={tw`absolute left-[30%] bottom-[-13%]`}>
                        <Text style={tw`text-[#191919] text-[12px] text-center leading-[23px] w-[108px] h-[26px] border-[#FAFAFA] bg-[#FAFAFA] rounded-[20px]`}>2023-06-02</Text>
                        <Image source={require("@images/arrow3.png")} style={tw`w-[84px] h-[20px] absolute left-[50%] top-[-120%] mb-[10px]`}></Image>
                        <Text style={tw`text-[#FFFFFF] font-bold text-[16px] leading-[16px] mb-[10px] absolute left-[120%] mb-[10px]`}>감상일자</Text>
                        <Text style={tw`text-[#FFFFFF] font-medium text-[12px] leading-[18px] absolute left-[120%] top-[25px] mb-[10px] w-[100%]`}>작품을 감상한 날짜예요</Text>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
});
