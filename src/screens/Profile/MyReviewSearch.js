import React, { useState, useEffect, Fragment } from "react";
import { View, StyleSheet, Image, TextInput, ScrollView, Text, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc'

import { AlertFormForSort2 } from "@forms/AlertForm";

import * as Keywords from "@functions/keywords";

import { searchMusicals } from "@functions/api";

import { useNavigation } from "@react-navigation/native";

export default function MyReviewSearch({ isCookie }) {
    const nav = useNavigation();

    const [page, setPage] = useState(0);
    const [updatePage, setUpdatePage] = useState(true);

    useEffect(() => {
        if (updatePage && page === 0) {
            feedReviews(page).then((newFeeds) => {
                setFeeds((prevFeeds) => [...prevFeeds, ...newFeeds.feeds]);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [page, updatePage]);

    const [showSearchResult, setShowSearchResult] = useState(true);

    const [value, setValue] = useState('');
    const [placeholderValue, setPlaceholderValue] = useState('');
    const [ifX, setIfX] = useState(false);
    
    // 검색 기록을 위한 변수
    const [searchHistory, setSearchHistory] = useState([]);
    useEffect(() => {
        const getSearchHistory = async () => {
            const searchHistory = await Keywords.getAllSearchKeywords();
            setSearchHistory(searchHistory);
        }
        getSearchHistory();
    }, []);

    // 정렬을 위한 변수
    const [sortModalVisible, setSortModalVisible] = useState(false);
    const [sortCriteria, setSortCriteria] = useState("최신순");
    const orderBy = sortCriteria === '최신순' ? 'DATE' : 'REVIEW'; // 백 연결 후 LIKE로 바꿔야됨

    // 검색을 위한 변수
    const [searchedMusicals, setSearchedMusicals] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (searchValue !== '') {
            searchMusicals(searchValue, orderBy)
                .then((res) => {
                    setSearchedMusicals(res.musicals);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [searchValue, orderBy]);

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
        setSortCriteria('최신순');
        setShowSearchResult(true);
    }

    const onPressSearch = (keyword) => {
        if (keyword === '') {
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

    const MusicalsList = ({ data }) => {
        return (
            <FlatList
                data={data}
                numColumns={3}
                renderItem={({ item }) => (
                    <View style={{ marginHorizontal: 5, justifyContent: "flex-start"}}>
                        <Pressable onPress={() => console.log(item.musicalId + "의 MusicalDetail1으로 이동")}>
                            <Image source={{ uri: item.posterUrl }} style={{ width: 110, height: 157.90323, borderRadius: 10, marginBottom: 10.1 }} />
                            <Text numberOfLines={2} ellipsizeMode="tail" style={{ width: 110, color: '#191919', fontSize: 12, marginBottom: 30 }}>
                                {item.title}
                            </Text>
                        </Pressable>
                    </View>
                )}
                keyExtractor={(item) => item.musicalId}
                contentContainerStyle={{ justifyContent: 'flex-start' }}
            />
        );
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
                        <ScrollView style={tw`items-center`}>
                            <MusicalsList data={searchedMusicals} />
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
