import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

import tw from 'twrnc';

// props: nickname, memberStat, totalReviewCount
export default function UserTendency(props) {
  const [upper, setUpper] = useState(0);
  const [middle, setMiddle] = useState(0);
  const [lower, setLower] = useState(0);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [maxUpper, setMaxUpper] = useState(0);
  const [maxMiddle, setMaxMiddle] = useState(0);
  const [maxLower, setMaxLower] = useState(0);

  useEffect(() => {
    const memberStat = props.memberStat || {};

    setUpper((memberStat['5.0'] ?? 0) + (memberStat['4.5'] ?? 0) + (memberStat['4.0'] ?? 0));
    setMiddle((memberStat['2.0'] ?? 0) + (memberStat['2.5'] ?? 0) + (memberStat['3.0'] ?? 0) + (memberStat['3.5'] ?? 0));
    setLower((memberStat['0.5'] ?? 0) + (memberStat['1.0'] ?? 0) + (memberStat['1.5'] ?? 0));
    setMaxUpper(Math.max(memberStat['5.0'] ?? 0, memberStat['4.5'] ?? 0, memberStat['4.0'] ?? 0));
    setMaxMiddle(Math.max(memberStat['2.0'] ?? 0, memberStat['2.5'] ?? 0, memberStat['3.0'] ?? 0, memberStat['3.5'] ?? 0));
    setMaxLower(Math.max(memberStat['0.5'] ?? 0, memberStat['1.0'] ?? 0, memberStat['1.5'] ?? 0));
  }, []);

  useEffect(() => {
    if (props.totalReviewCount > 0) {
      const upperPercentage = upper / props.totalReviewCount;
      const lowerPercentage = lower / props.totalReviewCount;

      {/*A 후하다*/}
      if (upperPercentage >= 0.33 && lowerPercentage < 0.33) {
        if (maxUpper < maxMiddle && maxUpper < maxLower || maxMiddle === maxLower && maxMiddle > maxUpper) {
          setName('미식가 관객');
          setDescription('좋은 작품을 제대로 즐길 줄 아는');
        } else if (maxMiddle < maxUpper && maxMiddle < maxLower || maxUpper === maxLower && maxUpper > maxMiddle) {
          setName('미식가 관객');
          setDescription('좋은 작품에는 그만한 이유가 있다');
        } else if (maxLower < maxUpper && maxLower < maxMiddle || maxLower === maxUpper && maxLower === maxMiddle || maxUpper === maxMiddle && maxUpper > maxLower) {
          setName('박애주의자 관객');
          setDescription('세상에 좋은 작품이 너무 많아');
        }
      {/*B 신중하다*/}
      } else if (upperPercentage < 0.33 && lowerPercentage < 0.33) {
        // Update state based on conditions for B
        if (maxUpper < maxMiddle && maxUpper < maxLower || maxUpper === maxMiddle && maxUpper === maxLower || maxMiddle === maxLower && maxMiddle > maxUpper) {
          setName('신중한 관객');
          setDescription('균형잡힌 시선으로 작품을 보는 평가자');
        } else if (maxMiddle < maxUpper && maxMiddle < maxLower || maxUpper === maxLower && maxUpper > maxMiddle) {
          setName('신중한 관객');
          setDescription('나만의 취향을 만들어가는 중');
        } else if (maxLower < maxUpper && maxLower < maxMiddle || maxUpper === maxMiddle && maxUpper > maxLower) {
          setName('신중한 관객');
          setDescription('균형잡힌 시선으로 작품을 보는 평가자');
        }
      {/*C 극단적이다*/}
      } else if (upperPercentage >= 0.33 && lowerPercentage >= 0.33) {
        // Update state based on conditions for C
        if (maxUpper < maxMiddle && maxUpper < maxLower || maxMiddle === maxLower && maxMiddle > maxUpper) {
          setName('소신 있는 관객');
          setDescription('아쉬운 작품에는 솔직하게 평가하는');
        } else if (maxMiddle < maxUpper && maxMiddle < maxLower || maxMiddle === maxUpper && maxMiddle === maxLower || maxUpper === maxLower && maxUpper > maxMiddle) {
          setName('소신 있는 관객');
          setDescription('내 평가에 망설임은 없다');
        } else if (maxLower < maxUpper && maxLower < maxMiddle) {
          setName('소신 있는 관객');
          setDescription('호불호가 명확한 편');
        }
      {/*D 짜다*/}
      } else if (upperPercentage < 0.33 && lowerPercentage >= 0.33) {
        // Update state based on conditions for D
        if (maxUpper < maxMiddle && maxUpper < maxLower || maxUpper === maxMiddle && maxUpper === maxLower || maxMiddle === maxLower && maxMiddle > maxUpper) {
          setName('날카로운 관객');
          setDescription('작품 평가는 날카롭고 꼼꼼하게');
        } else if (maxMiddle < maxUpper && maxMiddle < maxLower || maxUpper === maxLower && maxUpper > maxMiddle) {
          setName('날카로운 관객');
          setDescription('좋아하는 포인트가 확실한 편');
        } else if (maxLower < maxUpper && maxLower < maxMiddle || maxUpper === maxMiddle && maxUpper > maxLower) {
          setName('날카로운 관객');
          setDescription('매의 눈으로 작품을 보는 평가자');
        }
      } else {
        setName('평가자');
        setDescription('이런저런 작품을 평가하는');
      }
    }
  }, [upper, middle, lower, maxUpper, maxMiddle, maxLower, props.totalReviewCount]);

  return (
    <View style={tw`mt-7.5 ml-5 mb-[33px]`}>
      <Text style={tw`mb-2`}>
        <Text style={tw`text-sm text-[#191919] font-medium`}>{props.nickname}</Text>
        <Text style={tw`text-sm text-[#191919] font-normal`}> 님은</Text>
      </Text>
      <Text style={tw`items-center`}>
        <Text style={tw`text-sm text-[#191919] font-medium`}>'{name}'</Text>
        <Text style={tw`text-xs text-[#191919] font-normal`}>_{description}</Text>
      </Text>
    </View>
  );
}
