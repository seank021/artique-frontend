import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'twrnc';

// props: poster, title, score, date, place, casting
export default function MusicalInfoForm(props) {
    return (
        <View style={tw`flex flex-row w-[90%] self-center`}>
            <Image source={{uri: props.poster}} style={tw`w-[110px] h-[158.44037px] rounded-2 mr-[11px]`}></Image>
            <View style={tw`flex-col justify-between`}>
                <View>
                    <Text numberOfLines={2} style={tw`text-[#000] text-lg font-medium mb-[6px] mr-[35%]`}>{props.title}</Text>
                </View>
                <View style={tw`gap-[4px]`}>
                    <View style={tw`flex-row items-center`}>
                        <Image source={require("@images/star.png")} style={tw`w-[16px] h-[16px] mr-[4px]`}></Image>
                        <Text style={tw`text-[#191919] text-sm`}>{props.score}</Text>
                    </View>
                    {props.date ? (
                        <Text numberOfLines={1} style={tw`text-[#000] text-sm mr-[35%]`}>{props.date}</Text>
                    ) : (
                        <Text style={tw`text-[#B6B6B6] text-sm`}>날짜 정보 없음</Text>
                    )}
                    {props.place ? (
                        <Text numberOfLines={1} style={tw`text-[#191919] text-sm mr-[35%]`}>
                            {props.place}
                        </Text>
                    ) : (
                        <Text style={tw`text-[#B6B6B6] text-sm`}>장소 정보 없음</Text>
                    )}
                    {props.casting ? (
                        <Text numberOfLines={1} style={tw`text-[#191919] text-sm mr-[35%]`}>{props.casting}</Text>
                    ) : (
                        <Text style={tw`text-[#B6B6B6] text-sm`}>캐스팅 정보 없음</Text>
                    )}
                </View>
            </View>
        </View>
    )
}
