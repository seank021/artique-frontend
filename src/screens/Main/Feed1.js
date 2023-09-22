import React, { useState, useEffect, Fragment } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { ShortReviewFormInFeed } from "@forms/ReviewForm";

import { useNavigation } from "@react-navigation/native";

import { feedReviews } from "@functions/api";

export default function Feed1 ({ isCookie, setMusicalId }) {
    const nav = useNavigation();

    const [page, setPage] = useState(0);
    const [updatePage, setUpdatePage] = useState(true);
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        if (updatePage && page === 0) {
            feedReviews(page).then((newFeeds) => {
                setFeeds((prevFeeds) => [...prevFeeds, ...newFeeds.feeds]);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [page, updatePage]);

    const goToMusicalDetail1 = musicalId => {
        console.log(musicalId);
        setMusicalId(musicalId);
        nav.navigate('MusicalDetail1');
    };

    const onPressThumbsUp = reviewId => {
        console.log(reviewId);
    };

    const goToReviewDetail1 = reviewId => {
        console.log(reviewId);
        nav.navigate('ReviewDetail1');
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
            <View style={tw`ml-[5%] my-2.5`}>
                <Image source={require("@images/logo_small_black.png")} style={tw`w-[110px] h-[37.64781px]`}></Image>
            </View>
            <View style={tw`border-[0.5px] border-[#D3D4D3]`}></View>

            <ScrollView onScroll={detectScroll}>
                {feeds.map((feed, index) => (
                    <Fragment key={index}>
                        <ShortReviewFormInFeed
                            reviewInfo={feed}
                            goToMusicalDetail1={() => goToMusicalDetail1(feed.musicalId)}
                            goToReviewDetail1={() => goToReviewDetail1(feed.reviewId)}
                            onPressThumbsUp={() => onPressThumbsUp(feed.reviewId)}
                            isCookie={isCookie}
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
