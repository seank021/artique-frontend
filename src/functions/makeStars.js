import { View, Text, Image } from 'react-native';
import tw from 'twrnc';

export function makeStars (starRate) {
    let starRateFloat = 0;
    try {
        starRateFloat = parseFloat(starRate.split(" ")[0]);
    } catch (err) {
        starRateFloat = starRate;
    }

    return (
        starRateFloat === 0.5 ? (
            <View style={tw`flex flex-row`}>
                <Image source={require("@images/star_half.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
            </View>
        ) : starRateFloat === 1 ? (
            <View style={tw`flex flex-row`}>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
            </View>
        ) : starRateFloat === 1.5 ? (
            <View style={tw`flex flex-row`}>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_half.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
            </View>
        ) : starRateFloat === 2 ? (
            <View style={tw`flex flex-row`}>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
            </View>
        ) : starRateFloat === 2.5 ? (
            <View style={tw`flex flex-row`}>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_half.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
            </View>
        ) : starRateFloat === 3 ? (
            <View style={tw`flex flex-row`}>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
            </View>
        ) : starRateFloat === 3.5 ? (
            <View style={tw`flex flex-row`}>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_half.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
            </View>
        ) : starRateFloat === 4 ? (
            <View style={tw`flex flex-row`}>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_empty.png")} style={tw`w-[15px] h-[15px]`}/>
            </View>
        ) : starRateFloat === 4.5 ? (
            <View style={tw`flex flex-row`}>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star_half.png")} style={tw`w-[15px] h-[15px]`}/>
            </View>
        ) : starRateFloat === 5 ? (
            <View style={tw`flex flex-row`}>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
                <Image source={require("@images/star.png")} style={tw`w-[15px] h-[15px]`}/>
            </View>
        ) : null
    );
}

export function makeStarsForEachReview (starRate) {
    const starRateFloat2 = parseFloat(starRate);

    return (
        starRateFloat2 === 0.5 ? (
            <View style={tw`flex flex-col items-center`}>
                <Text style={tw`text-sm font-medium mb-[2px] text-[#191919]`}>많이 아쉬웠던 작품</Text>
                <View style={tw`flex flex-row`}>
                    <Image source={require("@images/star_half.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                </View>
            </View>
        ) : starRateFloat2 === 1 ? (
            <View style={tw`flex flex-col items-center`}>
                <Text style={tw`text-sm font-medium mb-[2px] text-[#191919]`}>많이 아쉬웠던 작품</Text>
                <View style={tw`flex flex-row`}>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                </View>
            </View>
        ) : starRateFloat2 === 1.5 ? (
            <View style={tw`flex flex-col items-center`}>
                <Text style={tw`text-sm font-medium mb-[2px] text-[#191919]`}>한 번은 볼만한 작품</Text>
                <View style={tw`flex flex-row`}>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_half.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                </View>
            </View>
        ) : starRateFloat2 === 2 ? (
            <View style={tw`flex flex-col items-center`}>
                <Text style={tw`text-sm font-medium mb-[2px] text-[#191919]`}>한 번은 볼만한 작품</Text>
                <View style={tw`flex flex-row`}>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                </View>
            </View>
        ) : starRateFloat2 === 2.5 ? (
            <View style={tw`flex flex-col items-center`}>
                <Text style={tw`text-sm font-medium mb-[2px] text-[#191919]`}>한 번은 볼만한 작품</Text>
                <View style={tw`flex flex-row`}>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_half.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                </View>
            </View>
        ) : starRateFloat2 === 3 ? (
            <View style={tw`flex flex-col items-center`}>
                <Text style={tw`text-sm font-medium mb-[2px] text-[#191919]`}>다시 한 번 보고 싶은 작품</Text>
                <View style={tw`flex flex-row`}>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                </View>
            </View>
        ) : starRateFloat2 === 3.5 ? (
            <View style={tw`flex flex-col items-center`}>
                <Text style={tw`text-sm font-medium mb-[2px] text-[#191919]`}>다시 한 번 보고 싶은 작품</Text>
                <View style={tw`flex flex-row`}>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_half.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                </View>
            </View>
        ) : starRateFloat2 === 4 ? (
            <View style={tw`flex flex-col items-center`}>
                <Text style={tw`text-sm font-medium mb-[2px] text-[#191919]`}>추천하고 싶은 작품</Text>
                <View style={tw`flex flex-row`}>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_empty.png")} style={tw`w-[33px] h-[33px]`}/>
                </View>
            </View>
        ) : starRateFloat2 === 4.5 ? (
            <View style={tw`flex flex-col items-center`}>
                <Text style={tw`text-sm font-medium mb-[2px] text-[#191919]`}>나의 인생작</Text>
                <View style={tw`flex flex-row`}>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star_half.png")} style={tw`w-[33px] h-[33px]`}/>
                </View>
            </View>
        ) : starRateFloat2 === 5 ? (
            <View style={tw`flex flex-col items-center`}>
                <Text style={tw`text-sm font-medium mb-[2px] text-[#191919]`}>내 인생 최고의 명작</Text>
                <View style={tw`flex flex-row`}>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                    <Image source={require("@images/star.png")} style={tw`w-[33px] h-[33px]`}/>
                </View>
            </View>
        ) : null
    );
}
