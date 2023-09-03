import react from 'react';
import { View, Text, Image } from 'react-native';

import tw from 'twrnc';

export default function makeBarChart (scoreCount) {
    let count = 0;
    
    for (let key in scoreCount) {
        count += scoreCount[key];
    }

    const height = (3 / count) * 100;

    const barStyle05 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: height * scoreCount["0.5"],};
    const barStyle10 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: height * scoreCount["1.0"],};
    const barStyle15 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: height * scoreCount["1.5"],};
    const barStyle20 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: height * scoreCount["2.0"],};
    const barStyle25 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: height * scoreCount["2.5"],};
    const barStyle30 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: height * scoreCount["3.0"],};
    const barStyle35 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: height * scoreCount["3.5"],};
    const barStyle40 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: height * scoreCount["4.0"],};
    const barStyle45 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: height * scoreCount["4.5"],};
    const barStyle50 = {...tw`w-[21px] rounded-t-xl mx-[1px] bg-[#E9494A]`, height: height * scoreCount["5.0"],};

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
            <View style={tw`border-solid border-b border-[#D9D9D9]`}></View>
            <View style={tw`flex flex-row justify-end`}>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs font-medium`}>0.5</Text></View>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#191919] text-xs font-medium`}>1.0</Text></View>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs font-medium`}>1.5</Text></View>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#191919] text-xs font-medium`}>2.0</Text></View>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs font-medium`}>2.5</Text></View>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#191919] text-xs font-medium`}>3.0</Text></View>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs font-medium`}>3.5</Text></View>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#191919] text-xs font-medium`}>4.0</Text></View>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs font-medium`}>4.5</Text></View>
                <View style={tw`w-[21px] mx-[1px] items-center`}><Text style={tw`text-[#191919] text-xs font-medium`}>5.0</Text></View>
            </View>
        </>
    );
}
