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

    const barStyle05 = {...tw`w-[23px] rounded-t-xl bg-[#E9494A]`, height: scoreCount["0.5"] > 0 ? heightRatio * scoreCount["0.5"] : 0};
    const barStyle10 = {...tw`w-[23px] rounded-t-xl bg-[#E9494A]`, height: scoreCount["1.0"] > 0 ? heightRatio * scoreCount["1.0"] : 0};
    const barStyle15 = {...tw`w-[23px] rounded-t-xl bg-[#E9494A]`, height: scoreCount["1.5"] > 0 ? heightRatio * scoreCount["1.5"] : 0}; 
    const barStyle20 = {...tw`w-[23px] rounded-t-xl bg-[#E9494A]`, height: scoreCount["2.0"] > 0 ? heightRatio * scoreCount["2.0"] : 0}; 
    const barStyle25 = {...tw`w-[23px] rounded-t-xl bg-[#E9494A]`, height: scoreCount["2.5"] > 0 ? heightRatio * scoreCount["2.5"] : 0}; 
    const barStyle30 = {...tw`w-[23px] rounded-t-xl bg-[#E9494A]`, height: scoreCount["3.0"] > 0 ? heightRatio * scoreCount["3.0"] : 0}; 
    const barStyle35 = {...tw`w-[23px] rounded-t-xl bg-[#E9494A]`, height: scoreCount["3.5"] > 0 ? heightRatio * scoreCount["3.5"] : 0}; 
    const barStyle40 = {...tw`w-[23px] rounded-t-xl bg-[#E9494A]`, height: scoreCount["4.0"] > 0 ? heightRatio * scoreCount["4.0"] : 0}; 
    const barStyle45 = {...tw`w-[23px] rounded-t-xl bg-[#E9494A]`, height: scoreCount["4.5"] > 0 ? heightRatio * scoreCount["4.5"] : 0}; 
    const barStyle50 = {...tw`w-[23px] rounded-t-xl bg-[#E9494A]`, height: scoreCount["5.0"] > 0 ? heightRatio * scoreCount["5.0"] : 0}; 

    return (
        <>
            {maxCount > 0 ?
            <>
                <View style={tw`h-[105px]`}>
                    <View style={tw`flex flex-row justify-center items-end gap-[3px]`}>
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
                    <View style={tw`flex flex-row justify-center gap-[3px]`}>
                        <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs`}>0.5</Text></View>
                        <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#191919] text-xs`}>1.0</Text></View>
                        <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs`}>1.5</Text></View>
                        <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#191919] text-xs`}>2.0</Text></View>
                        <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs`}>2.5</Text></View>
                        <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#191919] text-xs`}>3.0</Text></View>
                        <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs`}>3.5</Text></View>
                        <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#191919] text-xs`}>4.0</Text></View>
                        <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs`}>4.5</Text></View>
                        <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#191919] text-xs`}>5.0</Text></View>
                    </View>
                </View>
            </>
            : 
            <>
                <View style={tw`mt-[105px]`}></View>
                <View style={tw`flex flex-row justify-center items-end gap-[3px]`}>
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
                <View style={tw`flex flex-row justify-center gap-[3px]`}>
                    <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs`}>0.5</Text></View>
                    <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#191919] text-xs`}>1.0</Text></View>
                    <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs`}>1.5</Text></View>
                    <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#191919] text-xs`}>2.0</Text></View>
                    <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs`}>2.5</Text></View>
                    <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#191919] text-xs`}>3.0</Text></View>
                    <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs`}>3.5</Text></View>
                    <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#191919] text-xs`}>4.0</Text></View>
                    <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#FAFAFA] text-xs`}>4.5</Text></View>
                    <View style={tw`w-[23px] items-center`}><Text style={tw`text-[#191919] text-xs`}>5.0</Text></View>
                </View>
            </>}
        </>
    );
}
