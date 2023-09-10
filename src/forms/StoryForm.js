import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import tw from 'twrnc';

// props: story
export default function StoryForm(props) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <View style={tw`flex flex-col w-[90%] self-center`}>
            <Text style={tw`text-[#191919] text-base font-medium mb-[10px]`}>줄거리</Text>
            {props.story ? (
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={tw`text-[#191919] text-sm text-justify leading-6`}>
                        {isExpanded ? props.story : props.story.slice(0, 100) + '···'}
                    </Text>
                    <Pressable onPress={() => { setIsExpanded(!isExpanded); }} style={tw`ml-[-20px]`}>
                        <Image
                            source={isExpanded ? require('@images/chevron_up.png') : require('@images/chevron_down.png')}
                            style={tw`w-[14.4px] h-[8px]`}
                        />
                    </Pressable>
                </View>
            ) : (
                <Text style={tw`text-[#191919] text-sm text-justify leading-6`}>
                    줄거리 정보 없음
                </Text>
            )}
        </View>
    );
}
