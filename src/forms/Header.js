import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import tw from 'twrnc';

export default function Header({ isCookie, onPressExit }) {
    return (
        <View style={tw`ml-[5%] mt-[18px] mb-[12px] flex-row items-center justify-between`}>
            <View style={tw`flex-row items-end gap-[10px]`}>
                <Image source={require("@images/logo_small_black.png")} style={tw`w-[110px] h-[37.64781px]`}></Image>
                <Text style={tw`text-xs font-semibold text-[#242844] tracking-[-0.32px] mb-[5px]`}>예술에 대한 다채로운 생각</Text>
            </View>
            {!isCookie && <Pressable onPress={onPressExit}><Text style={tw`mr-[5%] text-sm text-[#191919]`}>로그인</Text></Pressable>}
        </View>
    );
}

export function HeaderWithBorder({ isCookie, onPressExit }) {
    return (
        <>
            <View style={tw`ml-[5%] mt-[18px] mb-[12px] flex-row items-center justify-between`}>
                <View style={tw`flex-row items-end gap-[10px]`}>
                    <Image source={require("@images/logo_small_black.png")} style={tw`w-[110px] h-[37.64781px]`}></Image>
                    <Text style={tw`text-xs font-semibold text-[#242844] tracking-[-0.32px] mb-[5px]`}>예술에 대한 다채로운 생각</Text>
                </View>
                {!isCookie && <Pressable onPress={onPressExit}><Text style={tw`mr-[5%] text-sm text-[#191919]`}>로그인</Text></Pressable>}
            </View>
            <View style={tw`border-[0.5px] border-[#D3D4D3]`}></View>
        </>
    );
}

