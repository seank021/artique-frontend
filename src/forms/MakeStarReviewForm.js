import React, { useState, useEffect } from 'react';
import { View, Image, Pressable } from 'react-native';

import tw from 'twrnc';

export default function MakeStarReviewForm({ setStar, star_ }) {
    if (star_ === undefined) {
        star_ = 0;
    }
    const [starCount, setStarCount] = useState(star_);
    
    const handlePress = (index) => {
        if (index <= Math.floor(starCount)) {
            setStarCount(index - 0.5);
        } else {
            setStarCount(index);
        }
    };

    useEffect(() => {
        setStar(starCount);
    }, [starCount]);

    return (
        <View style={tw`flex-row items-center justify-between mt-[11px]`}>
            {[1, 2, 3, 4, 5].map((index) => (
                <Pressable key={index} onPress={() => handlePress(index)} style={tw`flex-row items-center`}>
                    <Image
                        source={
                            index <= Math.floor(starCount)
                                ? require('@images/star.png')
                                : index - starCount === 0.5
                                ? require('@images/star_half.png')
                                : require('@images/star_empty.png')
                        }
                        style={tw`w-[37.6px] h-[37.6px]`}
                    ></Image>
                </Pressable>
            ))}
        </View>
    );
}
