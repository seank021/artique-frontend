import react from 'react';
import { View, Text } from 'react-native';

import tw from 'twrnc';

// props: shortReview
export function ShortReviewForm(props) {
    return (
        <View style={tw``}>
            <Text style={tw`text-[#191919] text-base font-medium mb-[10px]`}>{props.shortReview}</Text>
        </View>
    )
}
