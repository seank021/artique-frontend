import React, { useState, useEffect, Fragment } from "react";
import { View, Image, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { ShortReviewFormInFeed } from "@forms/ReviewForm";

import { useNavigation, useIsFocused } from "@react-navigation/native";

import { feedReviews, thumbsUp } from "@functions/api";

export default function Feed1 ({ isCookie, memberId, setMusicalId, setReviewId, setReviewInfo, setReviewInfo2 }) {
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    const nav = useNavigation();

    const [page, setPage] = useState(0);
    const [updatePage, setUpdatePage] = useState(true);
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        if (!isFocused) {
            return;
        }
        onRefresh();
    }, [isFocused]);

    useEffect(() => {
        if (updatePage && page === 0) {
            feedReviews(page).then((newFeeds) => {
                setFeeds((prevFeeds) => [...prevFeeds, ...newFeeds.feeds]);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [page, updatePage]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        setFeeds([]);
        setPage(0);
        setUpdatePage(true);

        if (updatePage && page === 0) {
            feedReviews(page).then((newFeeds) => {
                setFeeds((prevFeeds) => [...prevFeeds, ...newFeeds.feeds]);
            }).catch((err) => {
                console.log(err);
            });
        }

        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const goToMusicalDetail1 = musicalId => {
        // console.log(musicalId);
        setMusicalId(musicalId);
        nav.navigate('MusicalDetail1');
    };

    const goToReviewDetail1 = reviewId => {
        // console.log(reviewId);
        setReviewId(reviewId);
        nav.navigate('ReviewDetail1');
    };

    const onPressThumbsUp = (reviewId, isThumbsUp) => {
        // isThumbsUp이 true: 이미 공감되어 있음 -> 공감 버튼 누른다는 것: 공감 취소
        // isThumbsUp이 false: 공감 안 되어 있음 -> 공감 버튼 누른다는 것: 공감
        thumbsUp(reviewId, !isThumbsUp).then((res) => {
            console.log(res);
            setFeeds((prevFeeds) => {
                const newFeeds = [...prevFeeds];
                const feedIndex = newFeeds.findIndex((feed) => feed.reviewId === reviewId);
                newFeeds[feedIndex].isThumbsUp = !isThumbsUp; // 프론트상에서만 바꿈 (구현 위함, 서버에서는 안 바뀜)
                return newFeeds;
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
            
            feedReviews(nextPage).then((newFeeds) => {
                setFeeds((prevFeeds) => [...prevFeeds, ...newFeeds.feeds]);
                setUpdatePage(true);
            }).catch((err) => {
                console.log(err);
            });
        }
    };

    return (        
        <SafeAreaView style={styles.container}>
            <View style={tw`ml-[5%] mt-[18px] mb-[12px] flex-col`}>
                <Image source={require("@images/logo_small_black.png")} style={tw`w-[110px] h-[37.64781px]`}></Image>
            </View>
            <View style={tw`border-[0.5px] border-[#D3D4D3]`}></View>

            <ScrollView onScroll={detectScroll} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {feeds.map((feed, index) => (
                    <Fragment key={index}>
                        <ShortReviewFormInFeed
                            reviewInfo={feed}
                            goToMusicalDetail1={() => goToMusicalDetail1(feed.musicalId)}
                            goToReviewDetail1={() => goToReviewDetail1(feed.reviewId)}
                            onPressThumbsUp={() => onPressThumbsUp(feed.reviewId, feed.isThumbsUp)}
                            isCookie={isCookie}
                            isMine={feed.memberId === memberId}
                            setReviewInfo={setReviewInfo}
                            setReviewInfo2={setReviewInfo2}
                        />
                        {index < feeds.length - 1 && (
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
