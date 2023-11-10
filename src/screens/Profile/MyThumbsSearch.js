import React, { useState, useEffect, Fragment } from "react";
import { View, StyleSheet, Image, TextInput, ScrollView, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc'

import * as Keywords from "@functions/keywords";

import { searchThumbReviews, thumbsUp } from "@functions/api";

import { useNavigation } from "@react-navigation/native";
import { ShortReviewFormInFeed } from "@forms/ReviewForm";

export default function MyThumbsSearch({ isCookie, setMusicalId, setReviewId }) {
    {/*페이지 이동*/}
    const nav = useNavigation();

    const goToMusicalDetail1 = musicalId => {
        setMusicalId(musicalId);
        nav.navigate('MusicalDetail1');
    };

    const goToReviewDetail1 = reviewId => {
        setReviewId(reviewId);
        nav.navigate('ReviewDetail1');
    };

    {/*공감*/}
    const onPressThumbsUp = (reviewId, isThumbsUp) => {
        thumbsUp(reviewId, !isThumbsUp).then((res) => {
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
    
    useEffect(() => {
        if (updatePage && page === 0) {
            searchThumbReviews(page, searchValue).then((newReviews) => {
                setSearchedReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
            }
            ).catch((err) => {
                console.log(err);
            });
        }
    }, [page, updatePage]);

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

            searchThumbReviews(nextPage, searchValue)
                .then((newReviews) => {
                    setSearchedReviews((prevReviews) => [...prevReviews, ...newReviews.reviews]);
                    setUpdatePage(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    {/*검색 관련*/}
    const [isBeforeSearch, setIsBeforeSearch] = useState(true);

    const [value, setValue] = useState('');
    const [placeholderValue, setPlaceholderValue] = useState('');
    const [ifX, setIfX] = useState(false);

    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        const getSearchHistory = async () => {
            const searchHistory = await Keywords.getAllSearchKeywords();
            setSearchHistory(searchHistory);
        }
        getSearchHistory();
    }, []);

    const [searchedReviews, setSearchedReviews] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    
    useEffect(() => {
        if (searchValue !== '') {
            searchThumbReviews(page, searchValue)
                .then((res) => {
                    setSearchedReviews(res.reviews);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    , [searchValue, page]);

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
        Keywords.storeSearchKeyword(keyword);
        setIsBeforeSearch(false);
        setPlaceholderValue(keyword);
        setValue('');
        if (!searchHistory.includes(keyword)) {
            setSearchHistory([keyword, ...searchHistory])
        } else { 
            setSearchHistory([keyword, ...searchHistory.filter((item) => item !== keyword)]);
        }
        setSearchValue(keyword);
    }

    const deleteKeyword = (keyword) => {
        Keywords.removeParticularKeyword(keyword);
        if (searchHistory.includes(keyword)) {
            setSearchHistory(searchHistory.filter((item) => item !== keyword));
        } else {
            return;
        }
    }

    const deleteAllKeywords = () => {
        Keywords.removeAllKeywords();
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
                <View style={tw`mx-[5%] mt-[23px] mb-[11px]`}>
                    <View style={tw`flex-row justify-between min-h-[34px] bg-[#E6E6E6] rounded-[19.5px]`}>
                        <View style={tw`flex-row w-[90%] h-[100%] items-center`}>
                            <Image source={require('@images/search.png')} style={tw`ml-[18px] w-[18px] h-[18px] tint-[#ABABAB]`} />
                            <TextInput ref={(text) => this.textInput = text} onChangeText={(text) => onChangeText(text)} onSubmitEditing={() => onPressSearch(value)} returnKeyType="done" placeholder='키워드를 검색해보세요' style={tw`ml-[14px]`}  />
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
                                            <Text style={tw`text-xs text-[#ABABAB] text-sm`}>{keyword}</Text>
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
                {/* 검색 완료 상단바 */} 
                <View style={tw`flex-row items-center mx-[5%] mt-[17px] mb-[11px]`}>
                    <Pressable onPress={()=> {setIsBeforeSearch(true); setIfX(false);}}>
                        <Image source={require('@images/chevron_left.png')} style={tw`w-[10px] h-[18px] mr-[22.5px] tint-[#191919]`} />
                    </Pressable>
                    <View style={tw`flex-row justify-between min-h-[34px] bg-[#E6E6E6] rounded-[19.5px]`}>
                        <View style={tw`flex-row items-center`}>
                            <TextInput style={tw`mx-[14px] font-medium`} defaultValue={placeholderValue} width="80%" onFocus={searchAgain} ref={(text) => this.textInput = text} onChangeText={(text) => onChangeText(text)} onSubmitEditing={() => onPressSearch(value)} returnKeyType="done" />
                        </View>
                        <View style={tw`self-center`}>
                            <Pressable onPress={()=> {setIsBeforeSearch(true);}}><Image source={require('@images/x.png')} style={tw`mr-[12px] w-[16px] h-[16px] tint-[#ABABAB]`} /></Pressable>
                        </View>
                    </View>
                </View>
                <View style={tw`border-[0.5px] border-[#D3D4D3]`}></View>

                {/* 검색 결과 */}
                {searchedReviews.length !== 0 ?
                    <ScrollView onScroll={detectScroll}>
                        {searchedReviews.map((review, index) => {
                            return (
                                <Fragment key={index}>
                                    <ShortReviewFormInFeed
                                        reviewInfo={review}
                                        goToMusicalDetail1={() => goToMusicalDetail1(review.musicalId)}
                                        goToReviewDetail1={() => goToReviewDetail1(review.reviewId)}
                                        onPressThumbsUp={() => onPressThumbsUp(review.reviewId, review.isThumbsUp)}
                                        isCookie={isCookie}
                                    />
                                    {index < searchedReviews.length - 1 && (
                                        <View style={tw`border-4 border-[#F0F0F0]`}></View>
                                    )}
                                </Fragment>
                            );
                        })}
                    </ScrollView>
                :<Text style={tw`text-[#ABABAB] text-sm mx-[5%] my-[15px]`}>검색 결과가 없습니다.</Text>}
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
