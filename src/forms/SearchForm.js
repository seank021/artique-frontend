import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Image, ScrollView } from "react-native";
import Modal from 'react-native-modal';

import { searchMusicals } from "@functions/api";

import tw from 'twrnc';

// 리뷰 작성 탭에서 작품 검색하는 모달
// props: modalVisible, setModalVisible, setMusicalId, setMusicalPoster, setMusicalTitle, setTitleColor
export default function SearchForm(props) {
    const [searchText, setSearchText] = useState("");
    const [searchedMusicals, setSearchedMusicals] = useState([]);
    let searchTimeout;

    useEffect(() => {
        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(() => {
            if (searchText.trim() !== "") {
                searchMusicals(searchText, 'REVIEW').then((res) => {
                    setSearchedMusicals(res.musicals);
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                setSearchedMusicals([]);
            }
        }, 500);

        return () => clearTimeout(searchTimeout);
    }, [searchText]);

    return (
        <Modal animationIn={"fadeIn"} animationOut={"fadeOut"} transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.5} onBackdropPress={() => props.setModalVisible(false)}>
            <View style={tw`flex flex-col justify-center items-center bg-white rounded-xl w-full h-[80%]`}>
                <View style={tw`flex-row justify-center items-center gap-2 py-5`}>
                    <Pressable onPress={() => props.setModalVisible(false)}>
                        <Image style={tw`w-5 h-5`} source={require('@images/search.png')} />
                    </Pressable>
                    <Text style={tw`text-center text-xl font-medium`}>작품 검색</Text>
                </View>

                <View style={tw`flex-row justify-between items-center gap-2 px-4`}>
                    <TextInput style={tw`w-full h-10 border-[1px] border-gray-400 rounded-xl px-4`} placeholder="작품명을 입력하세요." onChangeText={(text) => setSearchText(text)} />
                </View>

                <View style={tw`flex-1 w-full mt-[20px] px-5`}>
                    <Text style={tw`text-base mb-[10px]`}>검색 결과</Text>
                    <ScrollView style={tw`flex-1 w-full`}>
                        {searchedMusicals.map((musical, index) => {
                            return (
                                <Pressable key={index} onPress={() => {
                                    props.setMusicalId(musical.musicalId);
                                    props.setMusicalPoster({uri: musical.posterUrl});
                                    props.setMusicalTitle(musical.title);

                                    props.setModalVisible(false);
                                    props.setTitleColor("#000");

                                    setSearchText("");
                                    setSearchedMusicals([]);
                                }}>
                                    <View style={tw`flex-row justify-start items-center gap-3 py-2`}>
                                        <Image style={tw`w-12 h-12 rounded-xl`} source={{ uri: musical.posterUrl }} />
                                        <View style={tw`flex-col justify-center items-start`}>
                                            <Text style={tw`text-base`}>{musical.title.length > 15 ? musical.title.slice(0, 15) + "..." : musical.title}</Text>
                                            <Text style={tw`text-xs text-[#ABABAB]`}>{musical.duration}</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}


