import React, { useState, useEffect, Fragment } from "react";
import { View, Pressable, Text, Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { AlertFormForSortInMyReviews } from "@forms/AlertForm";
import { ShortReviewFormInMyReviews } from "@forms/ReviewForm";

import { memberStatistics, myReviewsAll, thumbsUp } from "@functions/api";

import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";

export default function MyReviews({isCookie, memberId, setMusicalId, setReviewId, setReviewInfo, setReviewInfo2}) {
  const nav = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [firstFocus, setFirstFocus] = useState(true);
  const [onRefreshWhenDelete, setOnRefreshWhenDelete] = useState(false);

  useEffect(() => {
    if (firstFocus) {
        setFirstFocus(false);
        return;
    }
    if (!isFocused) {
        return;
    }
    onRefresh();
}, [isFocused]);

  useEffect(() => {
      if (onRefreshWhenDelete) {
          onRefresh();
          setOnRefreshWhenDelete(false);
      }
  }, [onRefreshWhenDelete]);

  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("공감순");
  const orderBy = sortCriteria === "공감순" ? "THUMBS" : "CREATE";

  const [totalReviewCount, setTotalReviewCount] = useState(0);
  const [reviews, setReviews] = useState([]);

  const [page, setPage] = useState(0);
  const [updatePage, setUpdatePage] = useState(true);

  const goBack = () => {
    nav.goBack();
  };

  const goToMyReviewSearch = () => {
    if (route.params?.otherMemberId) {
      nav.navigate('MyReviewSearch', {otherMemberId: route.params?.otherMemberId});
    } else {
    nav.navigate('MyReviewSearch');
    } 
  }

  const goToMusicalDetail1 = (musicalId) => {
    setMusicalId(musicalId);
    nav.navigate('MusicalDetail1');
};

  const goToReviewDetail1 = (reviewId) => {
      setReviewId(reviewId);
      nav.navigate('ReviewDetail1');
  };

  const route = useRoute();
  const otherMemberId = route.params?.otherMemberId;

  useEffect(() => {
    if (otherMemberId) {
      memberStatistics(otherMemberId).then((newMemberStat) => {
        setTotalReviewCount(newMemberStat.totalReviewCount);
      }).catch((err) => {
        console.log(err);
      });
    } else {
      memberStatistics().then((newMemberStat) => {
        setTotalReviewCount(newMemberStat.totalReviewCount);
      }).catch((err) => {
        console.log(err);
      });
    }
    }, []);

  useEffect(() => {
    if (updatePage && page === 0) {
      if (otherMemberId) {
        myReviewsAll(otherMemberId, page, orderBy).then((newReviews) => {
          setReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
        }).catch((err) => {
          console.log(err);
        });
      } else {
        myReviewsAll(memberId, page, orderBy).then((newReviews) => {
          setReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
        }).catch((err) => {
          console.log(err);
        });
      }
    }
    }, [page, updatePage, orderBy, otherMemberId]);

    const onRefresh = React.useCallback(() => {
      if (refreshing) {
          return;
      }

      setRefreshing(true);

      setReviews([]);
      setPage(0);
      setUpdatePage(true);

      if (updatePage && page === 0) {
        if (otherMemberId) {
          myReviewsAll(otherMemberId, page, orderBy).then((newReviews) => {
            setReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
            setUpdatePage(true);
        }).catch((err) => {
            console.log(err);
        });
        } else {
          myReviewsAll(memberId, page, orderBy).then((newReviews) => {
            setReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
            setUpdatePage(true);
        }).catch((err) => {
            console.log(err);
        });
        }
      }

      setTimeout(() => {
          setRefreshing(false);
      }, 1000);
  }, [refreshing, page, updatePage]);

  const onPressThumbsUp = (reviewId, isThumbsUp) => {
    thumbsUp(reviewId, !isThumbsUp).then((res) => {
        console.log(res);
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
          myReviewsAll(otherMemberId, page, orderBy).then((newReviews) => {
            setReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
            setUpdatePage(true);
        }).catch((err) => {
            console.log(err);
        }
        )} else {
          myReviewsAll(memberId, page, orderBy).then((newReviews) => {
            setReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
            setUpdatePage(true);
        }).catch((err) => {
            console.log(err);
        }
        )}
    }
  };

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
        <View style={tw`flex-row w-9/10 items-center justify-between mt-4 mx-5`}>
            <Text style={tw`text-sm text-[#191919] font-medium`}>모든 리뷰 ({totalReviewCount})</Text>
            <Pressable style={tw`flex flex-row items-center`} onPress={onPressSort}>
                <Text style={tw`text-[#191919] text-xs font-medium mr-[7px]`}>{sortCriteria}</Text>
                <Image source={require('@images/chevron_down.png')} style={tw`w-[14.4px] h-[8px]`}></Image>
            </Pressable>
        </View>

        <ScrollView onScroll={detectScroll}>
          {reviews.map((review, index) => (
              <Fragment key={index}>
                  <ShortReviewFormInMyReviews
                      reviewInfo={review}
                      onPressThumbsUp={() => onPressThumbsUp(review.reviewId, review.isThumbsUp)}
                      goToMusicalDetail1={() => goToMusicalDetail1(review.musicalId)}
                      goToReviewDetail1={() => goToReviewDetail1(review.reviewId)}
                      // isShortReviewSpoiler={review.reviewSpoiler}
                      isShortReviewSpoiler={true}
                      isCookie={isCookie}
                      isMine={review.memberId === memberId}
                      setReviewInfo={setReviewInfo}
                      setReviewInfo2={setReviewInfo2}
                      setOnRefreshWhenDelete={setOnRefreshWhenDelete}
                  />
                  {index < reviews.length - 1 && (
                      <View style={tw`border-4 border-[#F0F0F0]`}></View>
                  )}
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
