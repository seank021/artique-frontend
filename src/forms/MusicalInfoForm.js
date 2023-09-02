import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'twrnc';

// props: poster, title, score, date, place, duration, casting
export default function MusicalInfoForm(props) {
    return (
        <View style={tw`flex flex-row left-[5%]`}>
            <Image source={props.poster} style={tw`w-[110px] h-[158.44037px] rounded-2 mr-[11px]`}></Image>
            <View style={tw`flex-col justify-between`}>
                <Text style={tw`text-[#000] text-lg font-semibold mb-[6px]`}>{props.title}</Text>
                <View style={tw`flex-row items-center`}>
                    <Image source={require("@images/star.png")} style={tw`w-[16px] h-[16px] mr-[3px]`}></Image>
                    <Text style={tw`text-[#191919] text-sm font-medium`}>{props.score}</Text>
                </View>
                <Text style={tw`text-[#000] text-sm font-medium`}>{props.date}</Text>
                <Text style={tw`text-[#191919] text-sm font-medium`}>{props.place}</Text>
                <Text style={tw`text-[#191919] text-sm font-medium`}>{props.duration}</Text>
                <Text style={tw`text-[#191919] text-sm font-medium`}>{props.casting}</Text>
            </View>
        </View>
    )
}
