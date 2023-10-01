// TODO: order-by 넣기
// TODO: 포스터 선택 시 해당 id의 MusicalDetail1로 이동
// TODO: 검색 버튼, 포스터 간격 논의
// TODO: 포스터 마지막에 3개보다 적을 때, 간격 해결

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TextInput, ScrollView, Text, Pressable, Button, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc'

import { AlertFormForSort2 } from "@forms/AlertForm";

import * as Keywords from "@functions/keywords";

import { searchMusicals } from "@functions/api";

import { useNavigation } from "@react-navigation/native";

export default function Search1({ isCookie }) {
    const nav = useNavigation();

    const [isBeforeSearch, setIsBeforeSearch] = useState(true); // 검색 전, 후 구분

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

    // 검색을 위한 변수
    const [searchedMusicals, setSearchedMusicals] = useState([]);
    const [shouldSearch, setShouldSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    useEffect(() => {
        if (shouldSearch && searchValue !== '') {
            searchMusicals(searchValue)
                .then((res) => {
                    setSearchedMusicals(res.musicals);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        setShouldSearch(false);
    }, [value, shouldSearch]);

    // 정렬을 위한 변수
    const [sortModalVisible, setSortModalVisible] = useState(false);
    const [sortCriteria, setSortCriteria] = useState("최신순");

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

        console.log(keyword);

        Keywords.storeSearchKeyword(keyword);
        setIsBeforeSearch(false);
        setPlaceholderValue(keyword);
        setValue('');
        if (!searchHistory.includes(keyword)) {
            setSearchHistory([keyword, ...searchHistory]);
        } else {
            setSearchHistory([keyword, ...searchHistory.filter((item) => item !== keyword)]);
        }

        setSearchValue(keyword);
        setShouldSearch(true);
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
                    <View style={{ flex: 1, margin: 5 }}>
                        <Pressable style={{ flex: 1 }} onPress={() => console.log(item.musicalId + "의 MusicalDetail1으로 이동")}>
                            <Image source={{ uri: item.posterUrl }} style={{ width: 110, height: 157.90323, borderRadius: 10, marginBottom: 10.1 }} />
                            <Text style={{ width: 110, color: '#191919', fontSize: 12, marginBottom: 30 }}>
                                {item.title.length > 20 ? `${item.title.slice(0, 20)} ...` : item.title}
                            </Text>
                        </Pressable>
                    </View>
                )}
                keyExtractor={(item) => item.musicalId}
                contentContainerStyle={{ justifyContent: 'flex-start' }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {isBeforeSearch ?
                <>
                    <View style={tw`mx-[5%] mt-[17px] mb-[11px]`}>
                        <View style={tw`flex-row justify-between bg-[#E6E6E6] rounded-[19.5px]`}>
                            <View style={tw`flex-row w-[90%] items-center`}>
                                <Image source={require('@images/search.png')} style={tw`ml-[18px] w-[18px] h-[18px] tint-[#ABABAB]`} />
                                <TextInput ref={(text) => this.textInput = text} onChangeText={onChangeText} style={tw`ml-[14px]`} placeholder='작품명이나 배우를 검색해보세요' />
                            </View>
                            <View style={tw`self-center`}>
                                {ifX ? <Pressable onPress={deleteTextInput}><Image source={require('@images/x.png')} style={tw`mr-[18px] w-[18px] h-[18px] tint-[#ABABAB]`} /></Pressable> : null}
                            </View>
                        </View>
                    </View>
                    <View style={tw`border-[0.5px] border-[#D3D4D3]`}></View>

                    <View style={tw`flex-row mx-[5%] mt-[16px]`}>
                        {searchHistory.length !== 0 ? 
                            <>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {searchHistory.map((keyword, index) => {
                                        return (
                                            <View key={index} style={tw`flex-row items-center`}>
                                                <Pressable onPress={() => onPressSearch(keyword)}><Text style={tw`text-[#ABABAB] text-sm`}>{keyword}</Text></Pressable>
                                                <Pressable onPress={() => deleteKeyword(keyword)}><Image source={require('@images/x.png')} style={tw`ml-[5px] mr-[13px] w-[14px] h-[14px] tint-[#ABABAB]`} /></Pressable>
                                            </View>
                                        );
                                    })}
                                </ScrollView>
                                <View>
                                    <Pressable onPress={deleteAllKeywords}><Text style={tw`text-[#191919] text-sm ml-[8px]`}>전체 삭제</Text></Pressable>
                                </View>
                            </>
                            : <Text style={tw`text-[#ABABAB] text-sm`}>최근 검색어가 없습니다.</Text>
                        }
                    </View>

                    <View style={tw`mt-[100px]`}></View>
                    <Button onPress={() => onPressSearch(value)} title="임의로 만든 검색 버튼" />
                </>
            :
                <>
                    <View style={tw`flex-row items-center mx-[5%] mt-[17px] mb-[11px]`}>
                        <Pressable onPress={()=>setIsBeforeSearch(true)}><Image source={require('@images/chevron_left.png')} style={tw`w-[10px] h-[18px] mr-[23px] tint-[#191919]`} /></Pressable>
                        <View style={tw`flex-row w-[90%] justify-between items-center bg-[#E6E6E6] rounded-[19.5px]`}>
                            <TextInput style={tw`ml-[14px] font-medium`} placeholder={placeholderValue} placeholderTextColor={"#191919"} editable={false} />
                            <Pressable onPress={()=>setIsBeforeSearch(true)}><Image source={require('@images/x.png')} style={tw`mr-[18px] w-[18px] h-[18px] tint-[#ABABAB]`} /></Pressable>
                        </View>
                    </View>
                    <View style={tw`border-[0.5px] border-[#D3D4D3] mb-[5px]`}></View>

                    <Pressable style={tw`flex flex-row items-center justify-end mr-[5%] my-[10px]`} onPress={() => setSortModalVisible(true)}>
                        <Text style={tw`text-[#191919] text-xs font-medium mr-[7px]`}>{sortCriteria}</Text>
                        <Image source={require('@images/chevron_down.png')} style={tw`w-[14.4px] h-[8px]`}></Image>
                    </Pressable>
                    <AlertFormForSort2 sortModalVisible={sortModalVisible} setSortModalVisible={setSortModalVisible} sortCriteria={sortCriteria} setSortCriteria={setSortCriteria}></AlertFormForSort2>
                    
                    {searchedMusicals.length !== 0 ?
                        <View style={{ flex: 1 }}>
                            <MusicalsList data={searchedMusicals} />
                        </View>
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
