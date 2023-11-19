import React from 'react';
import { Image, StyleSheet, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import tw from 'twrnc';

// props: modalVisible, setModalVisible
export const TutorialModal1 = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <Modal animationIn="slideInUp" animationOut="slideOutDown" transparent={true} isVisible={props.modalVisible} hasBackdrop={true} backdropOpacity={0.8} onBackdropPress={()=>props.setModalVisible(false)}>
                    <Pressable onPress={()=>props.setModalVisible(false)}><Image source={require("@images/tutorial.png")} style={tw`w-full h-full`}></Image></Pressable>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});
