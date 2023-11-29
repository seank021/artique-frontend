import React from 'react';
import { Image, Pressable, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import { setIfTutorialRead } from '@functions/tutorial';

import tw from 'twrnc';

// props: modalVisible, setModalVisible
export const TutorialModal1 = (props) => {
    const { width, height } = Dimensions.get('window');

    const onPressTutorial = () => {
        setIfTutorialRead(true);
        props.setModalVisible(false);
    }

    return (
        <Modal animationIn="slideInUp" animationOut="slideOutDown" transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.8} onBackdropPress={onPressTutorial}>
            <SafeAreaView style={tw`items-center`}>
                <Pressable onPress={onPressTutorial}><Image source={require("@images/tutorial.png")} style={{width: width, height: height, maxWidth: width, maxHeight: height}} resizeMode='stretch'></Image></Pressable>
            </SafeAreaView>
        </Modal>
    )
}
