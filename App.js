import React, {useEffect, useState} from 'react';
import Navigation from '@navigation/Navigation';
import Animation from '@screens/Splash';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimationFinished(true);
    }, 3000);
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 500);
  // }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return animationFinished ? <Navigation /> : <Animation />;
};

export default App;
