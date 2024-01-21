import React, { useState, useEffect } from 'react';
import Navigation from '@navigation/Navigation';
import Animation from '@screens/Splash';
import SplashScreen from 'react-native-splash-screen';
import VersionCheck from 'react-native-version-check';

import { AlertFormForUpdate } from '@forms/AlertForm';

const App = () => {
  const [animationFinished, setAnimationFinished] = useState(false);

  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [version, setVersion] = useState("");
  const [newVersion, setNewVersion] = useState("");
  const [linkingURL, setLinkingURL] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setAnimationFinished(true);
    }, 3000);
  }, []);

  useEffect(() => {
    SplashScreen.hide();

    VersionCheck.needUpdate()
    .then(async res => {
      setVersion(res.currentVersion);
      setNewVersion(res.latestVersion);
      setLinkingURL(res.storeUrl);
      if (res.isNeeded) {
        setAlertModalVisible(true);
      }
    });

  }, []);

  return (
    animationFinished 
      ? <>
          <AlertFormForUpdate modalVisible={alertModalVisible} setModalVisible={setAlertModalVisible} version={version} newVersion={newVersion} text="추가된 기능: 업데이트 알림" linkingURL={linkingURL} />
          <Navigation />
        </>
      : <Animation />
  )
};

export default App;
