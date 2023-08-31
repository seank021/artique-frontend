import React, {useEffect, useRef} from 'react';
import {Animated, View, Easing} from 'react-native';
import LottieView from 'lottie-react-native';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function Animation() {
  const animationProgress = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(animationProgress, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View>
      <AnimatedLottieView
        source={require('../../assets/animations/SplashScreen.json')}
        style={{width: '100%', height: '100%'}}
        progress={animationProgress}
      />
    </View>
  );
}
