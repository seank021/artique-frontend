// TODO: 백 연결
// TODO: 검색 시 검색어 저장 (AsyncStorage), 검색어 삭제 기능 구현

// TODO: 검색어 입력 시 x 버튼 누르면 검색어 삭제
// TODO: 나머지 스크린 구현

import React, { useState } from "react";
import { View, StyleSheet, Image, TextInput, ScrollView, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc'

export default function Search() {
    const [value, setValue] = useState('');
    const [ifX, setIfX] = useState(false);

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
    }

    console.log(value);

    return (
        <SafeAreaView style={styles.container}>
            <View style={tw`mx-[5%] mt-[17px] mb-[11px] flex-col`}>
                <View style={tw`flex-row justify-between bg-[#E6E6E6] rounded-[19.5px]`}>
                    <View style={tw`flex-row items-center`}>
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
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={tw`flex-row self-start items-center`}>
                        <Text style={tw`text-[#ABABAB] text-sm`}>지킬 앤 하이드</Text>
                        <Pressable onPress={()=>console.log("개별 삭제")}><Image source={require('@images/x.png')} style={tw`ml-[5px] mr-[13px] w-[14px] h-[14px] tint-[#ABABAB]`} /></Pressable>
                    </View>
                    <View style={tw`flex-row self-start items-center`}>
                        <Text style={tw`text-[#ABABAB] text-sm`}>Artique</Text>
                        <Pressable onPress={()=>console.log("개별 삭제")}><Image source={require('@images/x.png')} style={tw`ml-[5px] mr-[13px] w-[14px] h-[14px] tint-[#ABABAB]`} /></Pressable>
                    </View>
                    <View style={tw`flex-row self-start items-center`}>
                        <Text style={tw`text-[#ABABAB] text-sm`}>물랑루즈</Text>
                        <Pressable onPress={()=>console.log("개별 삭제")}><Image source={require('@images/x.png')} style={tw`ml-[5px] mr-[13px] w-[14px] h-[14px] tint-[#ABABAB]`} /></Pressable>
                    </View>
                    <View style={tw`flex-row self-start items-center`}>
                        <Text style={tw`text-[#ABABAB] text-sm`}>홍광호</Text>
                        <Pressable onPress={()=>console.log("개별 삭제")}><Image source={require('@images/x.png')} style={tw`ml-[5px] mr-[13px] w-[14px] h-[14px] tint-[#ABABAB]`} /></Pressable>
                    </View>
                </ScrollView>
                <View>
                    <Pressable onPress={()=>console.log("전체 삭제")}><Text style={tw`text-[#191919] text-sm ml-[8px]`}>전체 삭제</Text></Pressable>
                </View>
            </View>


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
