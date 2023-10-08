import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TextInput, ScrollView, Text, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc'

import { AlertFormForSort2 } from "@forms/AlertForm";

import * as Keywords from "@functions/keywords";

import { searchMusicals } from "@functions/api";

import { useNavigation } from "@react-navigation/native";

export default function Search1({ isCookie, setMusicalId }) {
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

    // 정렬을 위한 변수
    const [sortModalVisible, setSortModalVisible] = useState(false);
    const [sortCriteria, setSortCriteria] = useState("최신순");
    const orderBy = sortCriteria === '최신순' ? 'DATE' : 'REVIEW'; // 기본 값: DATE

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

        setSortCriteria('최신순');
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

    const onPressMusical = (musicalId) => {
        setMusicalId(musicalId);
        nav.navigate('MusicalDetail1');
    }

    const MusicalsList = ({ data }) => {
        return (
            <FlatList
                data={data}
                numColumns={3}
                columnWrapperStyle={{ justifyContent: 'space-between'}}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View>
                        <Pressable onPress={() => onPressMusical(item.musicalId)}>
                            <Image source={{ uri: item.posterUrl }} style={{ width: 110, height: 157.90323, borderRadius: 10, marginBottom: 10.1 }} />
                            <Text numberOfLines={2} ellipsizeMode="tail" style={{ width: 110, color: '#191919', fontSize: 12, marginBottom: 30 }}>
                                {item.title}
                            </Text>
                        </Pressable>
                    </View>
                )}
                keyExtractor={(item) => item.musicalId}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {isBeforeSearch ?
                <>
                    <View style={tw`mx-[5%] mt-[17px] mb-[11px]`}>
                        <View style={tw`flex-row justify-between bg-[#E6E6E6] min-h-[34px] rounded-[19.5px]`}>
                            <View style={tw`flex-row w-[90%] h-[100%] items-center`}>
                                <Image source={require('@images/search.png')} style={tw`ml-[18px] w-[18px] h-[18px] tint-[#ABABAB]`} />
                                <TextInput ref={(text) => this.textInput = text} onChangeText={(text) => onChangeText(text)} onSubmitEditing={() => onPressSearch(value)} returnKeyType="done" placeholder='작품명이나 배우를 검색해보세요' style={tw`ml-[14px]`}  />
                            </View>
                            <View style={tw`self-center`}>
                                {ifX ? <Pressable onPress={deleteTextInput}><Image source={require('@images/x.png')} style={tw`mr-[12px] w-[16px] h-[16px] tint-[#ABABAB]`} /></Pressable> : null}
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
                </>
            :
                <>
                    <View style={tw`flex-row items-center mx-[5%] mt-[17px] mb-[11px]`}>
                        <Pressable onPress={()=> {setIsBeforeSearch(true); setSortCriteria('최신순'); setIfX(false);}}><Image source={require('@images/chevron_left.png')} style={tw`w-[10px] h-[18px] mr-[22.5px] tint-[#191919]`} /></Pressable>
                        <View style={tw`flex-row w-[90%] h-[100%] justify-between bg-[#E6E6E6] min-h-[34px] rounded-[19.5px]`}>
                            <View style={tw`flex-row items-center`}>
                                <TextInput style={tw`mx-[14px] font-medium`} defaultValue={placeholderValue} width="80%" onFocus={searchAgain} ref={(text) => this.textInput = text} onChangeText={(text) => onChangeText(text)} onSubmitEditing={() => onPressSearch(value)} returnKeyType="done" />
                            </View>
                            <View style={tw`self-center`}>
                                <Pressable onPress={()=> {setIsBeforeSearch(true); setSortCriteria('최신순');}}><Image source={require('@images/x.png')} style={tw`mr-[12px] w-[16px] h-[16px] tint-[#ABABAB]`} /></Pressable>
                            </View>
                        </View>
                    </View>
                    <View style={tw`border-[0.5px] border-[#D3D4D3]`}></View>

                    {searchedMusicals.length !== 0 ?
                        <>
                            <Pressable style={tw`flex flex-row items-center justify-end mr-[5%] my-[15px]`} onPress={() => setSortModalVisible(true)}>
                                <Text style={tw`text-[#191919] text-xs font-medium mr-[7px]`}>{sortCriteria}</Text>
                                <Image source={require('@images/chevron_down.png')} style={tw`w-[14.4px] h-[8px]`}></Image>
                            </Pressable>
                            <AlertFormForSort2 sortModalVisible={sortModalVisible} setSortModalVisible={setSortModalVisible} sortCriteria={sortCriteria} setSortCriteria={setSortCriteria}></AlertFormForSort2>
                        
                            <View style={{flex : 1, marginHorizontal : "2%"}}>
                                <MusicalsList data={searchedMusicals} />
                            </View>
                        </>
                        : <Text style={tw`text-[#ABABAB] text-sm mx-[5%] my-[15px]`}>검색 결과가 없습니다.</Text>
                    }
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
