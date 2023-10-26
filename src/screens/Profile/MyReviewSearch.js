import React, { useState, useEffect, Fragment } from "react";
import { View, StyleSheet, Image, TextInput, ScrollView, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc'

import { AlertFormForSort2 } from "@forms/AlertForm";

import * as Keywords from "@functions/keywords";

import { shortReviews, searchCreatedMusicals, thumbsUp } from "@functions/api";

import { useNavigation } from "@react-navigation/native";
import { ShortReviewFormInMyReviews } from "@forms/ReviewForm";

export default function MyReviewSearch({ isCookie, memberId, setMusicalId, setReviewId}) {
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
            setSearchedMusicals((prevMusicals) => {
                const newMusicals = [...prevMusicals];
                const musicalIndex = newMusicals.findIndex((musical) => musical.reviewId === reviewId);
                newMusicals[musicalIndex].isThumbsUp = !isThumbsUp;
                return newMusicals;
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
            searchCreatedMusicals(memberId, page, searchValue, orderBy).then((res) => {
                setSearchedMusicals((prevMusicals) => [...prevMusicals, ...res.musicals]);
            }).catch((err) => {
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
            setPage(page + 1);

            searchCreatedMusicals(memberId, page, searchValue, orderBy)
                .then((res) => {
                    setSearchedMusicals((prevMusicals) => [...prevMusicals, ...res.musicals]);
                    setUpdatePage(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    {/*검색 관련*/}
    const [showSearchResult, setShowSearchResult] = useState(false);

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

    const [sortModalVisible, setSortModalVisible] = useState(false);
    const [sortCriteria, setSortCriteria] = useState("최신순");
    const orderBy = sortCriteria === '최신순' ? 'DATE' : 'REVIEW';

    const [searchedMusicals, setSearchedMusicals] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    
    useEffect(() => {
        if (searchValue !== '') {
            searchCreatedMusicals(memberId, page, searchValue, orderBy)
                .then((res) => {
                    setSearchedMusicals(res.musicals);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    , [searchValue, orderBy]);

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
        setSortCriteria("최신순");
        setShowSearchResult(false);
    }

    const onPressSearch = (keyword) => {
        if (keyword !== '') {
            return;
        }
        Keywords.storeSearchKeyword(keyword);
        setShowSearchResult(false);
        setPlaceholderValue(keyword);
        setValue('');
        if (!searchHistory.includes(keyword)) {
            setSearchHistory([keyword, ...searchHistory]);

        } else { 
            setSearchHistory([keyword, ...searchHistory.filter((item) => item !== keyword)]);
        }
        setSearchValue(keyword);
    }

    const deleteKeyword = (keyword) => {
        Keywords.removeParticularKeyword(keyword);
        setSearchHistory(searchHistory.filter((item) => item !== keyword));
    }

    const deleteAllKeywords = () => {
        Keywords.removeAllKeywords();
        setSearchHistory([]);
    }

    return (
        <SafeAreaView style={styles.container}>
            {showSearchResult ?
            <>
                {/* 검색 전 상단바 */}
                <View style={tw`mx-[5%] mt-[23px] mb-[11px]`}>
                    <View style={tw`flex-row justify-between min-h-[34px] bg-[#E6E6E6] rounded-[19.5px]`}>
                        <View style={tw`flex-row w-[90%] items-center`}>
                            <Image source={require('@images/search.png')} style={tw`ml-[18px] w-[18px] h-[18px] tint-[#ABABAB]`} />
                            <TextInput ref={(text) => this.textInput = text} onChangeText={(text) => onChangeText(text)} onSubmitEditing={() => onPressSearch(value)} returnKeyType="done" placeholder='키워드를 검색해보세요' style={tw`ml-[14px]`}  />
                        </View>
                        <View style={tw`self-center`}>
                            {ifX ? <Pressable onPress={deleteTextInput}><Image source={require('@images/x.png')} style={tw`mr-[18px] w-[18px] h-[18px] tint-[#ABABAB]`} /></Pressable> : null}
                        </View>
                    </View>
                </View>
                <View style={tw`border-[0.5px] border-[#D3D4D3]`}></View>
                            
                {/*검색 기록*/}
                <View style={tw`flex-row mx-[5%] mt-4 mb-3.5`}>
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
                        <Pressable onPress={deleteAllKeywords} style={tw`text-[#191919] text-sm ml-[8px]`}>
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
                <View style={tw`flex-row items-center mx-[5%] mt-[23px] mb-[11px]`}>
                    <View style={tw`flex-row justify-between min-h-[34px] bg-[#E6E6E6] rounded-[19.5px]`}>
                        <View style={tw`flex-row w-[90%] items-center`}>
                            <Image source={require('@images/search.png')} style={tw`ml-[18px] w-[18px] h-[18px] tint-[#ABABAB]`} />
                            <TextInput style={tw`ml-[14px] font-medium`} placeholder={placeholderValue} placeholderTextColor={"#191919"} editable={false} />
                        </View>
                        <View style={tw`self-center`}>
                            {ifX ? <Pressable onPress={deleteTextInput}><Image source={require('@images/x.png')} style={tw`mr-[18px] w-[18px] h-[18px] tint-[#ABABAB]`} /></Pressable> : null}
                        </View>
                    </View>
                </View>
                <View style={tw`border-[0.5px] border-[#D3D4D3]`}></View>

                {/* 검색 결과 */}
                <View style={tw`flex-row justify-between items-center mx-[5%] mt-4 mb-3.5`}>
                    <Text style={tw`text-sm text-[#191919] font-medium`}>검색 결과 (2)</Text>
                    <Pressable style={tw`flex flex-row items-center justify-end`} onPress={() => setSortModalVisible(true)}>
                        <Text style={tw`text-[#191919] text-xs font-medium mr-[7px]`}>{sortCriteria}</Text>
                        <Image source={require('@images/chevron_down.png')} style={tw`w-[14.4px] h-[8px]`}></Image>
                    </Pressable>
                </View>
                    <AlertFormForSort2 sortModalVisible={sortModalVisible} setSortModalVisible={setSortModalVisible} sortCriteria={sortCriteria} setSortCriteria={setSortCriteria}></AlertFormForSort2>

                    {searchedMusicals.length !== 0 ?
                        <ScrollView onScroll={detectScroll} style={tw`items-center`}>
                            {searchedMusicals.map((musical, index) => {
                                <Fragment key={index}>
                                    <ShortReviewFormInMyReviews
                                        reviewInfo={musical}
                                        goToMusicalDetail1={() => goToMusicalDetail1(musical.musicalId)}
                                        goToReviewDetail1={() => goToReviewDetail1(musical.reviewId)}
                                        onPressThumbsUp={() => onPressThumbsUp(musical.reviewId, musical.isThumbsUp)}
                                        isCookie={isCookie}
                                    />
                                    {index < searchedMusicals.length - 1 && (
                                        <View style={tw`border-4 border-[#F0F0F0]`}></View>
                                    )}
                                </Fragment>
                            }
                            )}
                        </ScrollView>
                    : null}
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
