// TODO: Bar 작아져도 round 유지되게 수정

import { View, Text } from 'react-native';

import tw from 'twrnc';

export default function makeBarChart (scoreCount) {
    const maxCount = Math.max(
        scoreCount["0.5"],
        scoreCount["1.0"],
        scoreCount["1.5"],
        scoreCount["2.0"],
        scoreCount["2.5"],
        scoreCount["3.0"],
        scoreCount["3.5"],
        scoreCount["4.0"],
        scoreCount["4.5"],
        scoreCount["5.0"]
    );

    const heightRatio = 100 / maxCount;

    const barStyle05 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: heightRatio * scoreCount["0.5"],};
    const barStyle10 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: heightRatio * scoreCount["1.0"],};
    const barStyle15 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: heightRatio * scoreCount["1.5"],};
    const barStyle20 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: heightRatio * scoreCount["2.0"],};
    const barStyle25 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: heightRatio * scoreCount["2.5"],};
    const barStyle30 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: heightRatio * scoreCount["3.0"],};
    const barStyle35 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: heightRatio * scoreCount["3.5"],};
    const barStyle40 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: heightRatio * scoreCount["4.0"],};
    const barStyle45 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: heightRatio * scoreCount["4.5"],};
    const barStyle50 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: heightRatio * scoreCount["5.0"],};

    return (
        <>
            <View style={tw`flex flex-row justify-end items-end`}>
                <View style={barStyle05}></View>
                <View style={barStyle10}></View>
                <View style={barStyle15}></View>
                <View style={barStyle20}></View>
                <View style={barStyle25}></View>
                <View style={barStyle30}></View>
                <View style={barStyle35}></View>
                <View style={barStyle40}></View>
                <View style={barStyle45}></View>
                <View style={barStyle50}></View>
            </View>
            <View style={tw`border-solid border-b-2 border-[#D9D9D9]`}></View>
            <View style={tw`flex flex-row justify-end`}>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs`}>0.5</Text></View>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#191919] text-xs`}>1.0</Text></View>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs`}>1.5</Text></View>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#191919] text-xs`}>2.0</Text></View>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs`}>2.5</Text></View>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#191919] text-xs`}>3.0</Text></View>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs`}>3.5</Text></View>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#191919] text-xs`}>4.0</Text></View>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs`}>4.5</Text></View>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#191919] text-xs`}>5.0</Text></View>
            </View>
        </>
    );
}
