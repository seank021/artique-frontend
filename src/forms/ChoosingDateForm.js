import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';

import tw from 'twrnc';

export function ChooseYearForm({setYear, year_}) {
    const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995];
    const [isExpanded, setIsExpanded] = useState(false);
    if (year_ === undefined) {
        year_ = 0;
    }
    const [selectedYear, setSelectedYear] = useState(year_);

    const selectYear = (year) => {
        setSelectedYear(year);
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        setYear(selectedYear);
    }, [selectedYear]);

    return (
        <View style={tw`flex-row mr-[7px]`}>
            <View>
                <Pressable onPress={()=>setIsExpanded(!isExpanded)} style={tw`flex-row items-center justify-center`}>
                    <View style={tw`bg-[#F5F5F5] rounded-2 w-[67px] h-[28px] justify-center flex-row items-center`}>
                        <Text style={tw`mr-[7px] text-[#191919] text-sm font-medium`}>{selectedYear}</Text>
                        <Image source={isExpanded ? require('@images/chevron_up.png') : require('@images/chevron_down.png')} style={tw`w-[14.4px] h-[8px] tint-[#191919]`} />
                    </View>
                </Pressable>
                {isExpanded && (
                    <ScrollView style={tw`bg-[#F5F5F5] rounded-2 w-[67px] max-h-[150px]`}>
                        {years.map((year, index) => (
                            <Pressable key={index} onPress={() => selectYear(year)} style={tw`p-2`}>
                                <Text style={tw`text-[#191919] text-sm`}>{year}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                )}
            </View>
            <Text style={tw`ml-[4px] items-center`}>년</Text>
        </View>
    );
}

export function ChooseMonthForm({setMonth, month_}) {
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [isExpanded, setIsExpanded] = useState(false);
    if (month_ === undefined) {
        month_ = 0;
    }
    const [selectedMonth, setSelectedMonth] = useState(month_);

    const selectMonth = (month) => {
        setSelectedMonth(month);
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        setMonth(selectedMonth);
    }, [selectedMonth]);

    return (
        <View style={tw`flex-row mr-[7px]`}>
            <View>
                <Pressable onPress={()=>setIsExpanded(!isExpanded)} style={tw`flex-row items-center justify-center`}>
                    <View style={tw`bg-[#F5F5F5] rounded-2 w-[48px] h-[28px] justify-center flex-row items-center`}>
                        <Text style={tw`mr-[7px] text-[#191919] text-sm font-medium`}>{selectedMonth}</Text>
                        <Image source={isExpanded ? require('@images/chevron_up.png') : require('@images/chevron_down.png')} style={tw`w-[14.4px] h-[8px] tint-[#191919]`} />
                    </View>
                </Pressable>
                {isExpanded && (
                    <ScrollView style={tw`bg-[#F5F5F5] rounded-2 w-[48px] max-h-[150px]`}>
                        {months.map((month, index) => (
                            <Pressable key={index} onPress={() => selectMonth(month)} style={tw`p-2`}>
                                <Text style={tw`text-[#191919] text-sm`}>{month}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                )}
            </View>
            <Text style={tw`ml-[4px] items-center`}>월</Text>
        </View>
    );
}

export function ChooseDayForm({setDay, day_}) {
    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    const [isExpanded, setIsExpanded] = useState(false);
    if (day_ === undefined) {
        day_ = 0;
    }
    const [selectedDay, setSelectedDay] = useState(day_);

    const selectDay = (day) => {
        setSelectedDay(day);
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        setDay(selectedDay);
    }, [selectedDay]);

    return (
        <View style={tw`flex-row`}>
            <View>
                <Pressable onPress={()=>setIsExpanded(!isExpanded)} style={tw`flex-row items-center justify-center`}>
                    <View style={tw`bg-[#F5F5F5] rounded-2 w-[48px] h-[28px] justify-center flex-row items-center`}>
                        <Text style={tw`mr-[7px] text-[#191919] text-sm font-medium`}>{selectedDay}</Text>
                        <Image source={isExpanded ? require('@images/chevron_up.png') : require('@images/chevron_down.png')} style={tw`w-[14.4px] h-[8px] tint-[#191919]`} />
                    </View>
                </Pressable>
                {isExpanded && (
                    <ScrollView style={tw`bg-[#F5F5F5] rounded-2 w-[48px] max-h-[150px]`}>
                        {days.map((day, index) => (
                            <Pressable key={index} onPress={() => selectDay(day)} style={tw`p-2`}>
                                <Text style={tw`text-[#191919] text-sm`}>{day}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                )}
            </View>
            <Text style={tw`ml-[4px] items-center`}>일</Text>
        </View>
    );
}