import React, { useState, useEffect, Fragment } from "react";
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import AlertForm from "@forms/AlertForm"; 
import { ShortReviewFormInFeed } from "@forms/ReviewForm";

import { myThumbsAll, thumbsUp } from "@functions/api";
import * as Cookies from "@functions/cookie";
import { removeAutoLogin } from "@functions/autoLogin";

import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";

export default function MyThumbs({ isCookie, memberId, setMusicalId, setReviewId, setReviewInfo, setReviewInfo2, setGoToFeed }) {
  const nav = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [firstFocus, setFirstFocus] = useState(true);
  const [onRefreshWhenDelete, setOnRefreshWhenDelete] = useState(false);

  const [page, setPage] = useState(0);
  const [updatePage, setUpdatePage] = useState(true);
  const [reviews, setReviews] = useState([]);

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
  }, [onRefreshWhenDelete]);

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

  const logout = async () => {
    const currentLogin = await Cookies.getCurrentLogin();
    await Cookies.removeCookie(currentLogin);
    await removeAutoLogin();
    setGoToFeed(false);
  };

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
        myThumbsAll(otherMemberId, page).then((newReviews) => {
          setReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
        }).catch((err) => {
          console.log(err);
        }).finally(() => {
          setRefreshing(false);
        });
      } else {
        myThumbsAll(memberId, page).then((newReviews) => {
          setReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
        }).catch((err) => {
          console.log(err);
        }).finally(() => {
          setRefreshing(false);
        });
      }
    }

    setTimeout(() => {
        setRefreshing(false);
    }, 1000);
  }, [refreshing, page, updatePage, otherMemberId]);

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
      <AlertForm modalVisible={alertModalVisible} setModalVisible={setAlertModalVisible} borderColor="#F5F8F5" bgColor="#F5F8F5" image={alertImage} textColor="#191919" text={alertText}></AlertForm>
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
              setReviewInfo={setReviewInfo}
              setReviewInfo2={setReviewInfo2}
              isShortReviewSpoiler={review.reviewSpoiler}
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