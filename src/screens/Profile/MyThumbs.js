import React, { useState, useEffect, Fragment } from "react";
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { ShortReviewFormInFeed } from "@forms/ReviewForm";

import { myThumbsAll, thumbsUp } from "@functions/api";

import { useNavigation } from "@react-navigation/native";

export default function MyThumbs({ isCookie, setMusicalId, setReviewId }) {
  const nav = useNavigation();

  const [page, setPage] = useState(0);
  const [updatePage, setUpdatePage] = useState(true);
  const [reviews, setReviews] = useState([]);

  const goBack = () => {
    nav.goBack();
  };

  const goToMusicalDetail1 = (musicalId) => {
    setMusicalId(musicalId);
    nav.navigate('MusicalDetail1');
};

  const goToReviewDetail1 = (reviewId) => {
      setReviewId(reviewId);
      nav.navigate('ReviewDetail1');
  };

  const goToMyThumbsSearch = () => {
    nav.navigate('MyThumbsSearch');
  }

  useEffect(() => {
    if (updatePage && page === 0) {
      myThumbsAll(page).then((newReviews) => {
        setReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, [page, updatePage]);

  const onPressThumbsUp = (reviewId, isThumbsUp) => {
    thumbsUp(reviewId, !isThumbsUp).then((res) => {
        setReviews((prevReviews) => {
            const newReviews = [...prevReviews];
            const reviewIndex = newReviews.findIndex((review) => review.reviewId === reviewId);
            newReviews[reviewIndex].isThumbsUp = !isThumbsUp; // 프론트상에서만 바꿈 (구현 위함, 서버에서는 안 바뀜)
            return newReviews;
        });
    }).catch((err) => {
        console.log(err);
    });
  };

  const detectScroll = async (e) => {
    if (!updatePage) {
        return;
    }

    let updateScroll = e.nativeEvent.contentOffset.y;
    if (updateScroll === 0) {
        return;
    }

    let screenHeight = e.nativeEvent.layoutMeasurement.height;
    let documentHeight = e.nativeEvent.contentSize.height;
    let endPoint = 100;

    if (updateScroll + screenHeight >= documentHeight - endPoint) {
        if(!updatePage){
            return;
        };
        setUpdatePage(false);
        const nextPage = page + 1;
        setPage(nextPage);
        
        myThumbsAll(page).then((newReviews) => {
          setReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
          setUpdatePage(true);
        }).catch((err) => {
          console.log(err);
        });
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={tw`flex-row items-center justify-between mt-5 mb-[14px]`}>
        <Pressable onPress={goBack} style={tw`flex-row`}>
          <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] w-[10px] h-[18px] mr-[7.5px] tint-[#191919]`}></Image>
        </Pressable>
        <Text style={tw`text-[#191919] text-base font-medium`}>공감한 한줄평</Text>
        <Pressable onPress={goToMyThumbsSearch} style={tw`flex-row`}>
          <Image source={require('@images/search.png')} style={tw`mr-[20px] w-[17.5px] h-[17.5px] tint-[#191919]`}></Image>
        </Pressable>
      </View>
      <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>

      <ScrollView onScroll={detectScroll}>
        {reviews.map((review, index) => (
          <Fragment key={index}>
            <ShortReviewFormInFeed 
              review={review} 
              onPressThumbsUp={onPressThumbsUp} 
              goToReviewDetail1={goToReviewDetail1} 
              goToMusicalDetail1={goToMusicalDetail1}
              isCookie={isCookie}
            />
            {index < reviews.length - 1 && 
              <View style={tw`border-4 border-[#F0F0F0]`}></View>
            }
          </Fragment>
        ))}
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