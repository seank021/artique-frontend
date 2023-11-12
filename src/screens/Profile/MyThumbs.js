import React, { useState, useEffect, Fragment } from "react";
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { ShortReviewFormInFeed } from "@forms/ReviewForm";

import { myThumbsAll, thumbsUp } from "@functions/api";

import { useNavigation, useIsFocused, useRoute } from "@react-navigation/native";

export default function MyThumbs({ isCookie, memberId, setMusicalId, setReviewId }) {
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
    if (otherMemberId) {
      nav.navigate('MyThumbsSearch', {otherMemberId: otherMemberId});
    } else {
    nav.navigate('MyThumbsSearch');
    }
  }

  const route = useRoute();
  const otherMemberId= route.params?.otherMemberId;

  useEffect(() => {
    if (updatePage && page === 0) {
      if (otherMemberId) {
        myThumbsAll(otherMemberId, page).then((newReviews) => {
          setReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
        }).catch((err) => {
          console.log(err);
        });
      } else {
      myThumbsAll(memberId, page).then((newReviews) => {
        setReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
      }).catch((err) => {
        console.log(err);
      });
    }
    }
  }, [page, updatePage, reviews]);

  const onPressThumbsUp = (reviewId, isThumbsUp) => {
    thumbsUp(reviewId, !isThumbsUp).then((res) => {
        console.log(res)
        setReviews((prevReviews) => {
            const newReviews = [...prevReviews];
            const reviewIndex = newReviews.findIndex((review) => review.reviewId === reviewId);
            newReviews[reviewIndex].isThumbsUp = !isThumbsUp;
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
        
        if (otherMemberId) {
          myThumbsAll(otherMemberId, nextPage).then((newReviews) => {
            setReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
            setUpdatePage(true);
          }).catch((err) => {
            console.log(err);
          }
        )} else {
        myThumbsAll(memberId, nextPage).then((newReviews) => {
          setReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
          setUpdatePage(true);
        }).catch((err) => {
          console.log(err);
        });
      }
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

      <ScrollView showsVerticalScrollIndicator={false} onScroll={detectScroll}>
        {reviews?.map((review, index) => (
          <Fragment key={index}>
            <ShortReviewFormInFeed 
              reviewInfo={review} 
              onPressThumbsUp={() => onPressThumbsUp(review.reviewId, review.isThumbsUp)} 
              goToReviewDetail1={() => goToReviewDetail1(review.reviewId)} 
              goToMusicalDetail1={() => goToMusicalDetail1(review.musicalId)}
              isCookie={isCookie}
              isMine={review.memberId === memberId}
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