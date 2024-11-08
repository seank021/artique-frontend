import React, { useState, useEffect, Fragment } from "react";
import { View, Pressable, Text, Image, ScrollView, StyleSheet, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import AlertForm from "@forms/AlertForm";
import { AlertFormForSortInMyReviews } from "@forms/AlertForm";
import { ShortReviewFormInMyReviews } from "@forms/ReviewForm";

import { memberStatistics, myReviewsAll, thumbsUp } from "@functions/api";
import * as Cookies from "@functions/cookie";
import { removeAutoLogin } from "@functions/autoLogin";

import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";

export default function MyReviews({isCookie, memberId, setMusicalId, setReviewId, setReviewInfo, setReviewInfo2, setGoToFeed}) {
  const nav = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [firstFocus, setFirstFocus] = useState(true);
  const [onRefreshWhenDelete, setOnRefreshWhenDelete] = useState(false);
  const [onRefreshWhenSort, setOnRefreshWhenSort] = useState(false);

  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
  const [alertText, setAlertText] = useState('신고 누적으로 사용이 정지된 회원입니다.');

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
    if (onRefreshWhenSort) {
      onRefresh();
      setOnRefreshWhenSort(false);
    }
  }, [onRefreshWhenDelete, onRefreshWhenSort]);

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

  const logout = async () => {
    const currentLogin = await Cookies.getCurrentLogin();
    await Cookies.removeCookie(currentLogin);
    await removeAutoLogin();
    setGoToFeed(false);
  }

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
      memberStatistics(memberId).then((newMemberStat) => {
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
  }, [page, updatePage, otherMemberId]);

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
        }).catch((err) => {
          console.log(err);
        }).finally(() => {
          setRefreshing(false);
        });
      } else {
        myReviewsAll(memberId, page, orderBy).then((newReviews) => {
          setReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
        }).catch((err) => {
          console.log(err);
        }).finally(() => {
          setRefreshing(false);
        });
      }
    }

    if (otherMemberId) {
      memberStatistics(otherMemberId).then((newMemberStat) => {
        setTotalReviewCount(newMemberStat.totalReviewCount);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setRefreshing(false);
      });
    } else {
      memberStatistics(memberId).then((newMemberStat) => {
        setTotalReviewCount(newMemberStat.totalReviewCount);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setRefreshing(false);
      });
    }

    setTimeout(() => {
        setRefreshing(false);
    }, 1000);
  }, [refreshing, page, updatePage, orderBy, otherMemberId]);

  const onPressThumbsUp = (reviewId, isThumbsUp) => {
    thumbsUp(reviewId, !isThumbsUp).then((res) => {
        if (res === "banned member") {
          setAlertModalVisible(!alertModalVisible);
          setAlertImage(require('@images/x_red.png'));
          setAlertText('신고 누적으로 사용이 정지된 회원입니다.');
          setTimeout(() => {
              setAlertModalVisible(alertModalVisible);
          }, 1000);
          setTimeout(() => {
              logout();
          }, 2000);
          return;
      }
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
          myReviewsAll(otherMemberId, nextPage, orderBy).then((newReviews) => {
            setReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
            setUpdatePage(true);
        }).catch((err) => {
            console.log(err);
        }
        )} else {
          myReviewsAll(memberId, nextPage, orderBy).then((newReviews) => {
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
      <AlertForm modalVisible={alertModalVisible} setModalVisible={setAlertModalVisible} borderColor="#F5F8F5" bgColor="#F5F8F5" image={alertImage} textColor="#191919" text={alertText}></AlertForm>
      <AlertFormForSortInMyReviews sortModalVisible={sortModalVisible} setSortModalVisible={setSortModalVisible} sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} setOnRefreshWhenSort={setOnRefreshWhenSort}></AlertFormForSortInMyReviews>
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

        <ScrollView onScroll={detectScroll} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
          {/* 리뷰 목록*/}
          <View style={tw`flex-row w-9/10 items-center justify-between mt-4 mb-2 mx-5`}>
              <Text style={tw`text-sm text-[#191919] font-medium`}>모든 리뷰 ({totalReviewCount})</Text>
              <Pressable style={tw`flex flex-row items-center`} onPress={onPressSort}>
                  <Text style={tw`text-[#191919] text-xs font-medium mr-[7px]`}>{sortCriteria}</Text>
                  <Image source={require('@images/chevron_down.png')} style={tw`w-[14.4px] h-[8px]`}></Image>
              </Pressable>
          </View>
          
          {reviews.map((review, index) => (
              <Fragment key={index}>
                  <ShortReviewFormInMyReviews
                      reviewInfo={review}
                      onPressThumbsUp={() => onPressThumbsUp(review.reviewId, review.isThumbsUp)}
                      goToMusicalDetail1={() => goToMusicalDetail1(review.musicalId)}
                      goToReviewDetail1={() => goToReviewDetail1(review.reviewId)}
                      isShortReviewSpoiler={review.reviewSpoiler}
                      isCookie={isCookie}
                      isMine={review.memberId === memberId}
                      setReviewInfo={setReviewInfo}
                      setReviewInfo2={setReviewInfo2}
                      setOnRefreshWhenDelete={setOnRefreshWhenDelete}
                      setGoToFeed={setGoToFeed}
                  />
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
