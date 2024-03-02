import React from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { makeStars } from '@functions/makeStars';
import tw from 'twrnc';

export default function MainForm({ title, onPressMore, contents, setReviewId }) {
    const nav = useNavigation();

    const goToReviewDetail1 = (reviewId) => {
        setReviewId(reviewId);
        nav.navigate('ReviewDetail1');
    };

    return (
        <View style={tw`flex flex-col`}>
            <View style={tw`flex flex-row items-center justify-between mx-[5%]`}>
                <View style={tw`flex-row items-center gap-[5px]`}>
                    <Text style={tw`text-lg font-semibold text-[#FF5C55]`}>#</Text>
                    <Text style={tw`text-lg font-semibold text-[#191919]`}>{title}</Text>
                </View>
                <Pressable style={tw`flex-row items-center gap-[6px]`} onPress={onPressMore}>
                    <Text style={tw`text-sm font-semibold text-[#3A3D52]`}>더보기</Text>
                    <Image source={require('@images/stroked_chevron.png')} style={tw`w-[7px] h-[12px]`} />
                </Pressable>
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={tw`mt-[10px] ml-[5%]`}>
                {contents.map((content, index) => (
                    <Pressable key={index} onPress={() => goToReviewDetail1(content.reviewId)} style={tw`flex flex-row items-center bg-white rounded-xl shadow-sm mb-[24px] w-[310px] px-[14px] py-[12px] mr-[10px]`}>
                        <Image source={{ uri: content.posterUrl }} style={tw`w-[101px] h-[136px] rounded-xl`} />
                        <View style={tw`flex flex-col ml-[15px] justify-between h-[136px]`}>
                            <View style={tw`flex flex-col w-[165px] gap-[5px]`}>
                                <Text style={tw`text-base font-semibold text-[#191919]`} numberOfLines={2}>{content.musicalName}</Text>
                                <View style={tw`flex flex-row items-center gap-[10px]`}>
                                    <Text style={tw`text-xs font-medium text-[#191919]`}>{content.memberNickname}</Text>
                                    <Text style={tw`text-xs font-medium text-[#ABABAB]`}>{content.viewDate}</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-[165px] gap-[5px]`}>
                                <View style={tw`flex flex-row items-center justify-between`}>
                                    <View>{makeStars(content.starRating)}</View>
                                    <Text style={tw`text-xs font-semibold text-[#191919]`}>공감 {content.thumbsCount}회</Text>
                                </View>
                                <View style={tw`bg-[#F5F5F5] rounded-md`}>
                                    <Text style={tw`text-sm font-medium text-[#191919] p-[8px]`} numberOfLines={2}>"{content.shortReview}"</Text>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    )
}

export function MainMusicalForm({ title, contents, setMusicalId }) {
    const nav = useNavigation();

    const goToMusicalDetail1 = (musicalId) => {
        setMusicalId(musicalId);
        nav.navigate('MusicalDetail1');
    };

    return (
        <View style={tw`flex flex-col my-[15px]`}>
            <View style={tw`flex-row items-center mx-[5%] gap-[7px]`}>
                <Image source={require('@images/main_artique.png')} style={tw`w-[22px] h-[31px]`} />
                <Text style={tw`text-lg font-semibold text-[#191919]`}>{title}</Text>
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={tw`mt-[18px] ml-[5%]`}>
                {contents.map((content, index) => (
                    <Pressable key={index} onPress={() => goToMusicalDetail1(content.musicalId)} style={tw`flex flex-col mb-[24px] mr-[16px]`}>
                        <Image source={{ uri: content.posterUrl }} style={tw`w-[150px] h-[225px] rounded-xl`} />
                        <Text style={tw`text-sm font-semibold text-[#191919] mt-[10px] text-center w-[120px] mx-[15px]`} numberOfLines={1}>{content.musicalName}</Text>
                        <View style={tw`flex flex-row items-center justify-center gap-[3px] mt-[2px]`}>
                            <Image source={require('@images/star.png')} style={tw`w-[16px] h-[16px]`} />
                            <Text style={tw`text-xs font-medium text-[#191919]`}>{content.starRating} ({content.reviewCnt})</Text>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    )
}
