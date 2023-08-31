import React, {useEffect, useState} from 'react';
import Navigation from '@navigation/Navigation';
import Animation from '@screens/Splash';

const App = () => {
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimationFinished(true);
    }, 3000);
  }, []);

  return animationFinished ? <Navigation /> : <Animation />;
};

export default App;
