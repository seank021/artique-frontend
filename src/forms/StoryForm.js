import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import tw from 'twrnc';

// TODO: chevron_down 누르면 줄거리 전체 보이게 하기

// props: story
export default function MusicalInfoForm(props) {
    return (
        <View style={tw`flex flex-col left-[5%]`}>
            <Text style={tw`text-[#191919] text-base font-medium mb-[6px]`}>줄거리</Text>
            <ScrollView style={tw`w-[90%] h-[72px]`}>
                <Text style={tw`text-[#191919] text-sm font-medium`}>
                    {props.story}
                </Text>
            </ScrollView>
        </View>
    )
}
