import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Pressable, RefreshControl, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { ShortReviewFormInMypage } from "@forms/ReviewForm";
import makeBarChart from "@functions/makeBarChart";
import UserTendency from "@forms/UserTendency";
import AlertForm, { AlertFormForReportUser } from "@forms/AlertForm";

import { memberSummary, memberStatistics, memberShortThumbReviews, myReviewsAll } from "@functions/api";

import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";

export default function Mypage ({ isCookie, memberId, setReviewId, setGoToFeed }) {
  const nav = useNavigation();

  const route = useRoute();
  const otherMemberId = route.params?.otherMemberId;

  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [firstFocus, setFirstFocus] = useState(true);

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

  const onRefresh = React.useCallback(() => {
    if (refreshing) {
      return;
    }
    setRefreshing(true);

    setMemberInfo({});
    setMemberStat({});
    setWrittenReviewInfo([]);
    setShortReviewInfo([]);

    if (otherMemberId) {
      memberSummary(otherMemberId).then((newMemberInfo) => {
        setMemberInfo(() => newMemberInfo);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setRefreshing(false);
      });
    } else {
      memberSummary(memberId).then((newMemberInfo) => {
        setMemberInfo(() => newMemberInfo);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setRefreshing(false);
      });
    }

    if (otherMemberId) {
      memberStatistics(otherMemberId).then((newMemberStat) => {
        setMemberStat(() => newMemberStat);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setRefreshing(false);
      });
    } else {
      memberStatistics(memberId).then((newMemberStat) => {
        setMemberStat(() => newMemberStat);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setRefreshing(false);
      });
    }

    if (otherMemberId) {
      myReviewsAll(otherMemberId, 1, "THUMBS").then((newWrittenReviews) => {
        setWrittenReviewInfo(() => newWrittenReviews);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setRefreshing(false);
      });
    } else {
      myReviewsAll(memberId, 1, "THUMBS").then((newWrittenReviews) => {
        setWrittenReviewInfo(() => newWrittenReviews);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setRefreshing(false);
      });
    }

    if (otherMemberId) {
      memberShortThumbReviews(otherMemberId).then((newShortThumbReviews) => {
        setShortReviewInfo(() => newShortThumbReviews);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setRefreshing(false);
      });
    } else {
      memberShortThumbReviews(memberId).then((newShortThumbReviews) => {
        setShortReviewInfo(() => newShortThumbReviews);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setRefreshing(false);
      });
    }

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [refreshing, otherMemberId, memberInfo, memberStat, writtenReviewInfo, shortReviewInfo]);

  const goBack = () => {
    nav.goBack();
  }

  const goToChangeProfile = () => {
    nav.navigate('ChangeProfile');
  }

  const goToMyReviews = () => {
    if (otherMemberId) {
      nav.navigate('MyReviews', {otherMemberId: otherMemberId});
    } else {
    nav.navigate('MyReviews');
    }
  }

  const goToMyThumbs = () => {
    if (otherMemberId) {
      nav.navigate('MyThumbs', {otherMemberId: otherMemberId});
    } else {
    nav.navigate('MyThumbs');
    }
  }

  const goToMainSetting = () => {
    nav.navigate('MainSetting');
  }

  const goToReviewDetail1 = (reviewId) => {
    setReviewId(reviewId);
    nav.navigate('ReviewDetail1');
  };

  const [memberInfo, setMemberInfo] = useState({});
  const [memberStat, setMemberStat] = useState({});
  const [averageRate, setAverageRate] = useState(0);
  const [totalReviewCount, setTotalReviewCount] = useState(0);
  const [maxStarRate, setMaxStarRate] = useState(0);

  const [writtenReviewInfo, setWrittenReviewInfo] = useState([]);
  const [shortReviewInfo, setShortReviewInfo] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [alertImage, setAlertImage] = useState("@images/x_red.png");
  const [alertText, setAlertText] = useState("로그인이 필요한 서비스입니다.");
  const [reportModalVisible, setReportModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let newMemberInfo;
        let newMemberStat;
        let newShortThumbReviews;
        let otherMemberId = route.params?.otherMemberId;
  
        if (otherMemberId) {
          newMemberInfo = await memberSummary(otherMemberId);
          newMemberStat = await memberStatistics(otherMemberId);
          newWrittenReviews = await myReviewsAll(otherMemberId, 1, "THUMBS");
          newShortThumbReviews = await memberShortThumbReviews(otherMemberId);
        } else {
          newMemberInfo = await memberSummary(memberId);
          newMemberStat = await memberStatistics(memberId);
          newWrittenReviews = await myReviewsAll(memberId, 1, "THUMBS");
          newShortThumbReviews = await memberShortThumbReviews(memberId);
        }
  
        setMemberInfo(newMemberInfo);
        setMemberStat(newMemberStat);
        setWrittenReviewInfo(newWrittenReviews);
        setShortReviewInfo(newShortThumbReviews);
      } catch (err) {
        console.error(err);
      } 
    };
    fetchData();
  }, [otherMemberId]);

  useEffect(() => {
    setAverageRate(memberStat.averageRate);
    setTotalReviewCount(memberStat.totalReviewCount);
    setMaxStarRate(memberStat.maxStarRate);
  }, [memberStat]);

  const onPressReport = () => {
    if (!isCookie) {
        setModalVisible(!modalVisible);
        setAlertImage(require('@images/x_red.png'));
        setAlertText('로그인이 필요한 서비스입니다.');
        setTimeout(() => {
            setModalVisible(modalVisible);
        }, 1000);
        return;
    }
    setReportModalVisible(!reportModalVisible);
  }

  if (!memberInfo || !memberStat) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={tw`flex-row justify-between items-center mt-5 mb-[14px]`}>
            <Pressable onPress={goBack}>
                <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] mr-[20px] w-[10px] h-[18px] tint-[#191919]`}></Image>
            </Pressable>
            <Text style={tw`text-[#191919] text-base font-medium text-center`}>마이페이지</Text>
            <Pressable onPress={goToMainSetting}>
                <Image source={require('@images/settings.png')} style={tw`mr-[20px] w-[18px] h-[18px]`}></Image>
            </Pressable>
        </View>
        <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>
        <ActivityIndicator size="large" color="#000000" style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 바 */}
      {otherMemberId && (otherMemberId !== memberId) ? (
        <>
          <View style={tw`flex-row justify-between items-center mt-5 mb-[14px]`}>
              <Pressable onPress={goBack}>
                  <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] mr-[20px] w-[10px] h-[18px] tint-[#191919]`}></Image>
              </Pressable>
              <Text style={tw`text-[#191919] text-base font-medium text-center`}>{memberInfo.nickname} 님의 프로필</Text>
              <Pressable onPress={onPressReport}>
                  <Image source={require('@images/dots_more.png')} style={tw`mr-[20px] w-[30px] h-[20px]`}></Image>
              </Pressable>
          </View>
          <AlertForm modalVisible={modalVisible} setModalVisible={setModalVisible} borderColor="#F5F8F5" bgColor="#F5F8F5" image={alertImage} textColor="#191919" text={alertText}></AlertForm>
          <AlertFormForReportUser reporter={memberId} reported={otherMemberId} modalVisible={reportModalVisible} setModalVisible={setReportModalVisible} setGoToFeed={setGoToFeed}></AlertFormForReportUser>
        </>
      ) : (
        <View style={tw`flex-row justify-between items-center mx-5 my-5`}>
          <Text style={tw`text-lg text-[#191919] font-medium`}>마이페이지</Text>
          <Pressable onPress={goToMainSetting} hitSlop={20}>
            <Image source={require('@images/settings.png')} style={tw`w-[18px] h-[18px]`} />
          </Pressable>
        </View>
      )}
      <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>

      {/* 프로필 */}
      <ScrollView showsVerticalScrollIndicator={false} refreshcontrol={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <View style={tw`flex-row items-center w-[90%] mt-5 mx-[5%]`}>
          <Image source={memberInfo.imageUrl ? { uri: memberInfo.imageUrl } : require('@images/newprofile.png')} style={tw`w-[100px] h-[100px] rounded-full mr-5`}></Image>
          <View style={tw`flex-col justify-between`}>
            <Text style={tw`text-base text-[#191919] font-medium mb-5`}>{memberInfo.nickname}</Text>
            <Text style={tw`text-xs text-[#191919] font-normal w-55 leading-5`}>{memberInfo.introduce}</Text>
          </View>
        </View>
        <Pressable onPress={goToChangeProfile} style={tw`self-center w-[90%] h-[33px] mt-[15px] rounded-3xl bg-[#FFF] shadow`}>
          <Text style={tw`text-xs text-[#191919] font-normal text-center leading-[33px]`}>프로필 수정하기</Text>
        </Pressable>
          
        {/* 평점 */}
        <UserTendency
          nickname={memberInfo.nickname}
          memberStat={memberStat.statistic} 
          totalReviewCount={totalReviewCount} 
          />

        <View style={tw`w-[90%] self-center mb-8`}>
          {memberStat.statistic && makeBarChart(memberStat.statistic)}
        </View>
        <View style={tw`flex-row justify-between mx-5`}>
          <View style={tw`flex-col items-center`}>
            <Text style={tw`text-xs text-[#191919] font-normal`}>별점 평균</Text>
            <Text style={tw`text-xs text-[#191919] font-normal`}>{Math.round(averageRate * 10)/10}</Text>
          </View>
          <View style={tw`flex-col items-center`}>
            <Text style={tw`text-xs text-[#191919] font-normal`}>작성한 리뷰 수</Text>
            <Text style={tw`text-xs text-[#191919] font-normal`}>{totalReviewCount}</Text>
          </View>
          <View style={tw`flex-col items-center`}>
            <Text style={tw`text-xs text-[#191919] font-normal`}>많이 준 별점</Text>
            <Text style={tw`text-xs text-[#191919] font-normal`}>{(totalReviewCount === 0) ? 0 : maxStarRate}</Text>
          </View>
        </View>

        {/* 작성한 리뷰 */}
        <View style={tw`flex-row justify-between mt-11.5 mx-5`}>
          <Text style={tw`text-sm text-[#191919] font-medium`}>작성한 리뷰</Text>
          <Pressable onPress={goToMyReviews} style={tw`w-[50px] h-[21px]`} hitSlop={20}>
            <Text style={tw`text-xs text-[#191919] font-normal`}>전체보기</Text>
          </Pressable>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={tw`mt-3 ml-5`}>
          {writtenReviewInfo.reviews?.map((review, index) => {
            if (index < 5) {
              return (
                <ShortReviewFormInMypage 
                  key={index}
                  review={review}
                  musicalName={review.musicalName} 
                  starRating={review.starRating} 
                  shortReview={review.shortReview} 
                  onPressShortReview={() => goToReviewDetail1(review.reviewId)}
                  isShortReviewSpoiler={review.reviewSpoiler}
                  />
              )}
            }
          )}
          {writtenReviewInfo.reviews?.length === 0 && (
            <Text style={tw`text-xs text-[#ABABAB] font-normal ml-2 mb-10`}>작성한 리뷰가 없습니다.</Text>
          )}
        </ScrollView>

        {/* 공감한 한줄평 */}
        <View style={tw`flex-row justify-between mt-6 mx-5`}>
          <Text style={tw`text-sm text-[#191919] font-medium`}>공감한 한줄평</Text>
          <Pressable onPress={goToMyThumbs} style={tw`w-[50px] h-[21px]`} hitSlop={20}>
            <Text style={tw`text-xs text-[#191919] font-normal`}>전체보기</Text>
          </Pressable>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={tw`mt-3 ml-5`}>
          {shortReviewInfo.reviews?.map((review, index) => {
            if (index < 5) {
              return (
                <ShortReviewFormInMypage 
                  key={index}
                  review={review}
                  musicalName={review.musicalName} 
                  starRating={review.starRating} 
                  shortReview={review.shortReview} 
                  onPressShortReview={() => goToReviewDetail1(review.reviewId)}
                  isShortReviewSpoiler={review.reviewSpoiler}
                  />
              )}
            }
          )}
          {shortReviewInfo.reviews?.length === 0 && (
            <Text style={tw`text-xs text-[#ABABAB] font-normal ml-2 mb-10`}>공감한 한줄평이 없습니다.</Text>
          )}
        </ScrollView>
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