// 리뷰 작성용 페이지 (수정용 페이지는 따로 만들 예정, 구조는 동일하지만 정보 채워져 있음)

import {View, Text, Image} from 'react-native';

import tw from 'twrnc';

export default function ReviewWrite1({isCookie, musicalId, musicalPoster, musicalTitle}) {
    return (
        <View style={tw`flex-1 justify-center items-center`}>
            <Text>ReviewWrite1</Text>
            <Text>{musicalId}</Text>
            <Image source={{uri: musicalPoster}} style={tw`w-32 h-32`}></Image>
            <Text>{musicalTitle}</Text>
        </View>
    );
}
