import React from 'react';
import { Image, Pressable, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import tw from 'twrnc';

// props: modalVisible, setModalVisible
export const TutorialModal1 = (props) => {
    const { width, height } = Dimensions.get('window');

    return (
        <Modal animationIn="slideInUp" animationOut="slideOutDown" transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.8} onBackdropPress={()=>props.setModalVisible(false)}>
            <SafeAreaView style={tw`items-center`}>
                <Pressable onPress={()=>props.setModalVisible(false)}><Image source={require("@images/tutorial.png")} style={{width: width, height: height, maxWidth: width, maxHeight: height}} resizeMode='stretch'></Image></Pressable>
            </SafeAreaView>
        </Modal>
    )
}
