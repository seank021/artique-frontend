import React, { useState, useEffect, Fragment } from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import AlertForm from "@forms/AlertForm"; 
import { ShortReviewFormInFeed } from "@forms/ReviewForm";
import { HeaderWithBorder } from "@forms/Header";
import { TutorialModal1 } from "@screens/Main/Tutorial1";

import { feedReviews, thumbsUp } from "@functions/api";
import * as Cookies from "@functions/cookie";
import { removeAutoLogin } from "@functions/autoLogin";
import { getIfTutorialRead } from "@functions/tutorial";

// Feed4: 별점 5점 리뷰 - TODO: api connection
export default function Feed4({ isCookie, memberId, setMusicalId, setReviewId, setReviewInfo, setReviewInfo2, setGoToFeed }) {
    console.log("별점 5점 리뷰");
    
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();
    const [firstFocus, setFirstFocus] = useState(true);
    const [onRefreshWhenDelete, setOnRefreshWhenDelete] = useState(false);

    const nav = useNavigation();

    const [page, setPage] = useState(0);
    const [updatePage, setUpdatePage] = useState(true);
    const [feeds, setFeeds] = useState([]);
    
    const [tutorialModalVisible, setTutorialModalVisible] = useState(false);
    useEffect(() => {
        const tutorialRead = async () => {
            const ifTutorialRead = await getIfTutorialRead();
            if (ifTutorialRead === "true") {
                setTutorialModalVisible(false);
            } else {
                setTutorialModalVisible(true);
            }
        }
        tutorialRead();
    }, []);

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
        if (refreshing) {
            return;
        }

        setRefreshing(true);

        setFeeds([]);
        setPage(0);
        setUpdatePage(true);

        if (updatePage && page === 0) {
            feedReviews(page).then((newFeeds) => {
                setFeeds((prevFeeds) => [...prevFeeds, ...newFeeds.feeds]);
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setRefreshing(false);
            });
        }

        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, [refreshing, page, updatePage]);

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

    const logout = async () => {
        const currentLogin = await Cookies.getCurrentLogin();
        await Cookies.removeCookie(currentLogin);
        await removeAutoLogin();
        setGoToFeed(false);
    }

    const onPressThumbsUp = (reviewId, isThumbsUp) => {
        // isThumbsUp이 true: 이미 공감되어 있음 -> 공감 버튼 누른다는 것: 공감 취소
        // isThumbsUp이 false: 공감 안 되어 있음 -> 공감 버튼 누른다는 것: 공감
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
            setFeeds((prevFeeds) => {
                const newFeeds = [...prevFeeds];
                const feedIndex = newFeeds.findIndex((feed) => feed.reviewId === reviewId);
                newFeeds[feedIndex].isThumbsUp = !isThumbsUp;
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

    const onPressExit = () => {
        setGoToFeed(false);
    }

    const ifReviewBlocked = async (reviewId) => {
        await ifReviewBlocked(reviewId);
    }

    return (
        <SafeAreaView style={styles.container}>
            <AlertForm modalVisible={alertModalVisible} setModalVisible={setAlertModalVisible} borderColor="#F5F8F5" bgColor="#F5F8F5" image={alertImage} textColor="#191919" text={alertText}></AlertForm>
            <TutorialModal1 modalVisible={tutorialModalVisible} setModalVisible={setTutorialModalVisible}/>

            <HeaderWithBorder isCookie={isCookie} onPressExit={onPressExit} />

            <ScrollView showsVerticalScrollIndicator={false} onScroll={detectScroll} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                {feeds.map((feed, index) => (
                    // console.log(feed),
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
                            setOnRefreshWhenDelete={setOnRefreshWhenDelete}
                            isShortReviewSpoiler={feed.reviewSpoiler}
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
