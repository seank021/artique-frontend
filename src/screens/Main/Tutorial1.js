import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import tw from 'twrnc';

import { ShortReviewFormInTutorial1, ShortReviewFormInTutorial2 } from '@forms/ReviewForm';

// props: modalVisible, setModalVisible
export const TutorialModal1 = (props) => {
    return (
        <Modal animationIn="slideInUp" animationOut="fadeOut" transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={1.0} backdropColor='#3A3D52' onBackdropPress={()=>props.setModalVisible(false)}>
            <SafeAreaView style={styles.container}>
                <Pressable onPress={()=>props.setModalVisible(false)}><Image source={require("@images/x.png")} style={tw`w-[20px] h-[20px] my-[10px]`}></Image></Pressable>
                <View style={tw`gap-[5%]`}>
                    <View style={tw`flex-col`}>
                        <View style={tw`relative ml-[113px]`}>
                            <Image source={require("@images/arrow1.png")} style={tw`w-[30px] h-[64px] mb-[10px] mx-[10px]`}></Image>
                            <Text style={tw`text-[#FFFFFF] font-bold text-[16px] leading-[16px] mb-[10px] absolute left-[50px]`}>리뷰 상세 보기</Text>
                            <Text style={tw`text-[#FFFFFF] font-medium text-[12px] leading-[18px] absolute left-[50px] top-[25px] w-[70%]`}>티켓 우측을 눌러 자세한 리뷰와 긴줄평을 볼 수 있어요</Text>
                        </View>
                        <ShortReviewFormInTutorial1
                            musicalName = "데스노트"
                            casting = "홍광호, 김준수, 정선아"
                            starRating = {5.0}
                            shortReview = "데스노트 짱!"
                        />
                    </View>

                    <View style={tw`relative`}>
                        <ShortReviewFormInTutorial2
                            posterUrl = "http://www.kopis.or.kr/upload/pfmPoster/PF_PF219423_230531_224552.gif"
                        />
                        <View style={tw`flex-col absolute ml-[132px] mt-[10px]`}>
                            <Image source={require("@images/arrow2.png")} style={tw`w-[60px] h-[20px] my-[10px]`}></Image>
                            <Text style={tw`text-[#FFFFFF] font-bold text-[16px] leading-[16px] mb-[10px] ml-[60px]`}>작품 상세 보기</Text>
                            <Text style={tw`text-[#FFFFFF] font-medium text-[12px] leading-[18px] ml-[60px] w-[40%]`}>포스터를 눌러 작품의 정보와 평가를 볼 수 있어요</Text>
                        </View>
                    </View>

                    <View style={tw`relative ml-[50px]`}>
                        <Text style={tw`text-[#191919] text-[12px] text-center leading-[23px] w-[108px] h-[26px] border-[#FAFAFA] bg-[#FAFAFA] rounded-full`}>2023-06-02</Text>
                        <Image source={require("@images/arrow3.png")} style={tw`w-[84px] h-[20px] absolute top-[-30px] left-[54px]`}></Image>
                        <Text style={tw`text-[#FFFFFF] font-bold text-[16px] leading-[16px] mb-[10px] absolute left-[130px]`}>감상일자</Text>
                        <Text style={tw`text-[#FFFFFF] font-medium text-[12px] leading-[18px] w-[100%] absolute left-[130px] top-[25px]`}>작품을 감상한 날짜예요</Text>
                    </View>

                    <View style={tw`relative top-[10%]`}>
                        <Image source={require("@images/search_with_bg.png")} style={tw`w-[64px] h-[64px]`}></Image>
                        <Image source={require("@images/arrow4.png")} style={tw`w-[62px] h-[17.6px] absolute left-[32px] top-[-30px]`}></Image>
                        <Text style={tw`text-[#FFFFFF] font-bold text-[16px] leading-[16px] mb-[10px] absolute left-[100px]`}>작품 검색</Text>
                        <Text style={tw`text-[#FFFFFF] font-medium text-[12px] leading-[18px] w-[100%] absolute left-[100px] top-[25px]`}>원하는 작품을 검색해서 리뷰를 작성해보세요</Text>
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
        backgroundColor: '#3A3D52',
    },
});
