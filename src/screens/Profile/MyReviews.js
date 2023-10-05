import React, { useState, useEffect } from "react";
import { View, Pressable, Text, Image, ScrollView, StyleSheet, Fragment } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { AlertFormForSortInMyReviews } from "@forms/AlertForm";
import { ShortReviewFormInMyReviews } from "@forms/ReviewForm";

import { useNavigation } from "@react-navigation/native";

export default function MyReviews({isCookie}) {
  const nav = useNavigation();

  const [page, setPage] = useState(0);
  const [updatePage, setUpdatePage] = useState(true);

  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("최신순");

  const [reviewCount, setReviewCount] = useState(6);
  const [reviews, setReviews] = useState([]);

  const goBack = () => {
    nav.goBack();
  };

  const goToMyReviewSearch = () => {
    nav.navigate('MyReviewSearch');
  }

  const onPressSort = () => {
    setSortModalVisible(true);
} 

  return (
    <SafeAreaView style={styles.container}>
      <AlertFormForSortInMyReviews sortModalVisible={sortModalVisible} setSortModalVisible={setSortModalVisible} sortCriteria={sortCriteria} setSortCriteria={setSortCriteria}></AlertFormForSortInMyReviews>
      {/* 상단 바 */}
      <View style={tw`flex-row items-center justify-between mt-5 mb-[14px]`}>
                <Pressable onPress={goBack} style={tw`flex-row`}>
                    <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] w-[10px] h-[18px] mr-[7.5px] tint-[#191919]`}></Image>
                </Pressable>
                <Text style={tw`text-[#191919] text-base font-medium`}>작성한 리뷰 모아보기</Text>
                <Pressable onPress={goToMyReviewSearch} style={tw`flex-row`}>
                    <Image source={require('@images/search.png')} style={tw`mr-[20px] w-[17.5px] h-[17.5px] tint-[#191919]`}></Image>
                </Pressable>
            </View>
            <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>

      {/* 리뷰 목록*/}
      <ScrollView>
        <View style={tw`flex-row w-9/10 items-center justify-between mt-4 mx-5`}>
            <Text style={tw`text-sm text-[#191919] font-medium`}>모든 리뷰 ({reviewCount})</Text>
            <Pressable style={tw`flex flex-row items-center`} onPress={onPressSort}>
                <Text style={tw`text-[#191919] text-xs font-medium mr-[7px]`}>{sortCriteria}</Text>
                <Image source={require('@images/chevron_down.png')} style={tw`w-[14.4px] h-[8px]`}></Image>
            </Pressable>
        </View>

        {/* {reviews.map((review, index) => (
            <Fragment key={index}>
                <ShortReviewFormInMyReviews
                    reviewInfo={review}
                    onPressThumbsUp={() => onPressThumbsUp(review.reviewId)}
                    onPressArrowCircledRight={() => goToReviewDetail1(review.reviewId)}
                    isCookie={isCookie}
                />
                {index < reviews.length - 1 && (
                    <View style={tw`border-4 border-[#F0F0F0]`}></View>
                )}
            </Fragment>
        ))} */}
      </ScrollView>
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
