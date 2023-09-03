import React from "react";
import { View, Text, Image } from "react-native";

import tw from 'twrnc';

// props: averageScore, scoreCount
export default function AverageScoreForm(props) {
    return (
        <View style={tw`flex flex-col w-[90%] self-center`}>
            <Text style={tw`text-[#191919] text-base font-medium mb-[10px]`}>평균 별점</Text>
            <View style={tw`flex-row items-center`}>
                <Image source={require("@images/star.png")} style={tw`w-[16px] h-[16px] mr-[3px]`}></Image>
                <Text style={tw`text-[#191919] text-sm font-medium`}>{props.averageScore}</Text>
            </View>
            
        </View>
    );
}
