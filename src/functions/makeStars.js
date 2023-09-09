import { View, Image } from 'react-native';

import tw from 'twrnc';

export default function makeStars (starRate) {
    const starRateFloat = parseFloat(starRate.split(" ")[0]);

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
