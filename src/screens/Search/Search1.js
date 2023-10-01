// TODO: 백 연결
// TODO: 나머지 스크린 구현

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TextInput, ScrollView, Text, Pressable, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc'

import * as Keywords from "@functions/keywords";

export default function Search1({isCookie}) {
    const [isBeforeSearch, setIsBeforeSearch] = useState(true); // 검색 전, 후 구분

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
        if (searchHistory.includes(keyword)) {
            return;
        }
        setSearchHistory([keyword, ...searchHistory]);
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
                    <View style={tw`border-[0.5px] border-[#D3D4D3]`}></View>

                    <Text>POSTERS</Text>
                    
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
