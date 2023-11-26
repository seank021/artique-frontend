import React, { useState, useEffect, Fragment } from "react";
import { View, StyleSheet, Image, TextInput, ScrollView, Text, Pressable, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc'

import AlertForm from "@forms/AlertForm"; 
import { ShortReviewFormInMyReviews } from "@forms/ReviewForm";

import * as Keywords from "@functions/keywords";
import { searchCreatedReviews, thumbsUp } from "@functions/api";
import * as Cookies from "@functions/cookie";
import { removeAutoLogin } from "@functions/autoLogin";

import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";

export default function MyReviewSearch({ isCookie, memberId, setMusicalId, setReviewId, setReviewInfo, setReviewInfo2, setGoToFeed }) {
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

    const onRefresh = React.useCallback(() => {
        if (refreshing) {
            return;
        }

        setRefreshing(true);
        
        setPage(0);
        setUpdatePage(true);
        setSearchedReviews([]);

        if (updatePage && page === 0 ) {
            if (searchValue !== '') {
                if (otherMemberId) {
                    searchCreatedReviews(otherMemberId, page, searchValue, orderBy).then((newReviews) => {
                        setSearchedReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
                    }).catch((err) => {
                        console.log(err);
                    }).finally(() => {
                        setRefreshing(false);
                    });
                } else {
                    searchCreatedReviews(memberId, page, searchValue, orderBy).then((newReviews) => {
                        setSearchedReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
                    }).catch((err) => {
                        console.log(err);
                    }).finally(() => {
                        setRefreshing(false);
                    });
                }
            }
        }
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, [refreshing, page, updatePage, searchValue, otherMemberId]);

    {/*페이지 이동*/}
    const nav = useNavigation();

    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
    const [alertText, setAlertText] = useState('신고 누적으로 사용이 정지된 회원입니다.');

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

    const logout = async () => {
        const currentLogin = await Cookies.getCurrentLogin();
        await Cookies.removeCookie(currentLogin);
        await removeAutoLogin();
        setGoToFeed(false);
    }

    const route = useRoute();
    const otherMemberId = route.params?.otherMemberId;

    {/*공감*/}
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
            setSearchedReviews((prevReviews) => {
                const newReviews = [...prevReviews];
                const reviewIndex = newReviews.findIndex((review) => review.reviewId === reviewId);
                newReviews[reviewIndex].isThumbsUp = !isThumbsUp;
                return newReviews;
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    {/*스크롤 관련 관련*/}
    const [page, setPage] = useState(0);
    const [updatePage, setUpdatePage] = useState(true);

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
            if(!updatePage) {
                return;
            };
            setUpdatePage(false);
            const nextPage = page + 1;
            setPage(nextPage);
            
            if (otherMemberId) {
                searchCreatedReviews(otherMemberId, nextPage, searchValue, orderBy).then((newReviews) => {
                    setSearchedReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
                    setUpdatePage(true);
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                searchCreatedReviews(memberId, nextPage, searchValue, orderBy).then((newReviews) => {
                    setSearchedReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
                    setUpdatePage(true);
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    }

    const [searchedReviews, setSearchedReviews] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    
    useEffect(() => {
        if (updatePage && page === 0) {
            if (searchValue !== '') {
                if (otherMemberId) {
                    searchCreatedReviews(otherMemberId, page, searchValue, orderBy)
                        .then((res) => {
                            setSearchedReviews((prevReviews) => [...prevReviews, ...res.reviews]);
                        }).catch((err) => {
                            console.log(err);
                        });
                } 
                else {
                    searchCreatedReviews(memberId, page, searchValue, orderBy)
                        .then((res) => {
                            setSearchedReviews((prevReviews) => [...prevReviews, ...res.reviews]);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }
        }
    }
    , [page, updatePage, searchValue, otherMemberId]);

    {/*검색 관련*/}
    const [isBeforeSearch, setIsBeforeSearch] = useState(true);

    const [value, setValue] = useState('');
    const [placeholderValue, setPlaceholderValue] = useState('');
    const [ifX, setIfX] = useState(false);

    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        const getSearchHistory = async () => {
            const searchHistory = await Keywords.getAllSearchKeywordsMyPage();
            setSearchHistory(searchHistory);
        }
        getSearchHistory();
    }, []);

    const [orderBy, setOrderBy] = useState('CREATE');

    const onChangeText = (text) => {
        setValue(text);
        if (text === '') {
            setIfX(false);
        } else {
            setIfX(true);
        }
    }

    const deleteTextInput = () => {
        setValue('');
        this.textInput.clear();
        setIfX(false);
        setIsBeforeSearch(true);
    }

    const onPressSearch = (keyword) => {
        if (keyword === '') {
            return;
        }
        Keywords.storeSearchKeywordMyPage(keyword);
        setIsBeforeSearch(false);
        setPlaceholderValue(keyword);
        setSearchedReviews([]);
        setUpdatePage(true);
        setPage(0);
        if (!searchHistory.includes(keyword)) {
            setSearchHistory([keyword, ...searchHistory]);
        } else { 
            setSearchHistory([keyword, ...searchHistory.filter((item) => item !== keyword)]);
        }
        setSearchValue(keyword);
    }

    const deleteKeyword = (keyword) => {
        Keywords.removeParticularKeywordMyPage(keyword);
        if (searchHistory.includes(keyword)) {
            setSearchHistory(searchHistory.filter((item) => item !== keyword));
        } else {
            return;
        }
    }

    const deleteAllKeywords = () => {
        Keywords.removeAllKeywordsMyPage();
        setSearchHistory([]);
    }

    const searchAgain = () => {
        setSearchValue('');
        setValue('');
    }

    return (
        <SafeAreaView style={styles.container}>
            {isBeforeSearch ?
            <>
                {/* 검색 전 상단바 */}
                <View style={tw`flex flex-row items-center mx-[5%] mt-[17px] mb-[11px]`}>
                    <Pressable onPress={goBack}>
                        <Image source={require('@images/chevron_left.png')} style={tw`w-[10px] h-[18px] mr-[22.5px] tint-[#191919]`} />
                    </Pressable>
                    <View style={tw`flex-row w-[90%] h-[100%] justify-between min-h-[34px] bg-[#E6E6E6] rounded-[19.5px]`}>
                        <View style={tw`flex-row items-center`}>
                            <Image source={require('@images/search.png')} style={tw`ml-[18px] w-[18px] h-[18px] tint-[#ABABAB]`} />
                            <TextInput 
                                ref={(text) => this.textInput = text} 
                                onChangeText={(text) => onChangeText(text)} 
                                onSubmitEditing={() => onPressSearch(value)} 
                                returnKeyType="done" 
                                placeholder='키워드를 검색해보세요' 
                                style={tw`ml-[14px]`}  
                                />
                        </View>
                        <View style={tw`self-center`}>
                            {ifX ? <Pressable onPress={deleteTextInput}><Image source={require('@images/x.png')} style={tw`mr-[12px] w-[16px] h-[16px] tint-[#ABABAB]`} /></Pressable> : null}
                        </View>
                    </View>
                </View>
                <View style={tw`border-[0.5px] border-[#D3D4D3]`}></View>
                            
                {/*검색 기록*/}
                <View style={tw`flex-row mx-[5%] mt-4`}>
                    {searchHistory.length !== 0 ?
                    <>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {searchHistory.map((keyword, index) => {
                                return (
                                    <View key={index} style={tw`flex-row items-center`}>
                                        <Pressable onPress={() => onPressSearch(keyword)}>
                                            <Text style={tw`text-sm text-[#ABABAB]`}>{keyword}</Text>
                                        </Pressable>
                                        <Pressable onPress={() => deleteKeyword(keyword)}>
                                            <Image source={require('@images/x.png')} style={tw`ml-[5px]  mr-[13px] w-[14px] h-[14px] tint-[#ABABAB]`} />
                                        </Pressable>
                                    </View>
                                    )
                                })}
                        </ScrollView>
                        <Pressable onPress={deleteAllKeywords}>
                            <Text style={tw`text-[#191919] text-sm ml-[8px]`}>전체 삭제</Text>
                        </Pressable>
                    </>
                        : <Text style={tw`text-[#ABABAB] text-sm`}>최근 검색어가 없습니다.</Text>
                    }
                </View>
                </>
            :
                <>
                <AlertForm modalVisible={alertModalVisible} setModalVisible={setAlertModalVisible} borderColor="#F5F8F5" bgColor="#F5F8F5" image={alertImage} textColor="#191919" text={alertText}></AlertForm>
                {/* 검색 완료 상단바 */} 
                <View style={tw`flex-row items-center mx-[5%] mt-[17px] mb-[11px]`}>
                    <Pressable onPress={()=> {setIsBeforeSearch(true); setIfX(false); setValue(''); setSearchValue('');}}>
                        <Image source={require('@images/chevron_left.png')} style={tw`w-[10px] h-[18px] mr-[22.5px] tint-[#191919]`} />
                    </Pressable>
                    <View style={tw`flex-row w-[90%] h-[100%] justify-between min-h-[34px] bg-[#E6E6E6] rounded-[19.5px]`}>
                        <View style={tw`flex-row items-center`}>
                            <TextInput 
                                style={tw`ml-[14px] font-medium`} 
                                defaultValue={placeholderValue} 
                                width="80%" onFocus={searchAgain} 
                                ref={(text) => this.textInput = text} 
                                onChangeText={(text) => onChangeText(text)} 
                                onSubmitEditing={() => onPressSearch(value)} 
                                returnKeyType="done"   
                                />
                        </View>
                        <View style={tw`self-center`}>
                            <Pressable onPress={()=> {setIsBeforeSearch(true); setValue(''); setSearchValue('');}}><Image source={require('@images/x.png')} style={tw`mr-[12px] w-[16px] h-[16px] tint-[#ABABAB]`} /></Pressable>
                        </View>
                    </View>
                </View>
                <View style={tw`border-[0.5px] border-[#D3D4D3]`}></View>

                {/* 검색 결과 */}
                <View style={tw`flex-row justify-between items-center mx-[5%] mt-4 mb-3.5`}>
                    <Text style={tw`text-sm text-[#191919] font-medium`}>검색 결과 ({searchedReviews.length})</Text>
                </View>

                    {searchedReviews.length !== 0 ?
                        <ScrollView onScroll={detectScroll} showsVerticalScrollIndicator={false} onRefresh={onRefresh} >
                            {searchedReviews.map((review, index) => {
                                return (
                                    <Fragment key={index}>
                                        <ShortReviewFormInMyReviews
                                            reviewInfo={review}
                                            goToMusicalDetail1={() => goToMusicalDetail1(review.musicalId)}
                                            goToReviewDetail1={() => goToReviewDetail1(review.reviewId)}
                                            onPressThumbsUp={() => onPressThumbsUp(review.reviewId, review.isThumbsUp)}
                                            isCookie={isCookie}
                                            isMine={review.memberId === memberId}
                                            setReviewInfo={setReviewInfo}
                                            setReviewInfo2={setReviewInfo2}
                                            isShortReviewSpoiler={review.reviewSpoiler}
                                            setGoToFeed={setGoToFeed}
                                            setOnRefreshWhenDelete={setOnRefreshWhenDelete}
                                        />
                                    </Fragment>
                                );
                            })}
                        </ScrollView>
                    : <Text style={tw`text-[#ABABAB] text-sm mx-[5%] my-[15px]`}>검색 결과가 없습니다.</Text>}
            </>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FAFAFA',
    },
});
