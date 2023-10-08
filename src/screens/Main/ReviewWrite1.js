import {View, Text} from 'react-native';

import tw from 'twrnc';

export default function ReviewWrite1({isCookie, musicalId}) {
    return (
        <View style={tw`flex-1 justify-center items-center`}>
            <Text>ReviewWrite1</Text>
            <Text>{musicalId}</Text>
        </View>
    );
}
