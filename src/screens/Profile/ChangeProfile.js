import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { useNavigation } from '@react-navigation/native';

import { profileUpload, memberSummary, updateMember, duplicateNickname } from "@functions/api";

import { NicknameInputForm, IntroduceInputForm } from '@forms/InputForm';
import AlertForm, { ProfileChangeForm } from '@forms/AlertForm';

export default function ChangeProfile({isCookie}) {
    {/*뒤로가기*/}
    const nav = useNavigation();

    const goBack = () => {
        nav.goBack();
    };

    {/*profile 불러오기 및 수정*/}
    const [imageFile, setImageFile] = useState(null);
    const [profileImage, setProfileImage] = useState('');
    const [nickname, setNickname] = useState('');
    const [introduce, setIntroduce] = useState('');

    useEffect (() => {
        memberSummary().then((newMemberInfo) => {
            setProfileImage(() => newMemberInfo.imageUrl);
            setNickname(() => newMemberInfo.nickname);
            setIntroduce(() => newMemberInfo.introduce);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        setImageChangeModalVisible(false);
    }, [profileImage]);
    
    const onPressProfileChange = () => {
        profileUpload(imageFile).then((newProfileImage) => {
            setProfileImage(() => newProfileImage);
            setImageChangeModalVisible(!imageChangeModalVisible);
        }).catch((err) => {
            console.log(err);
        });
    }

    const onPressSave = async () => {
        if (!ifCheckNickname) {
            setModalVisible(!modalVisible);
            setAlertImage(require('@images/x_red.png'));
            setAlertText('닉네임 중복 확인을 해주세요.');
            setTimeout(() => {
                setModalVisible(modalVisible);
            }, 1000);
        return;
        } else {
            updateMember(nickname, profileImage, introduce).then((req) => {
                console.log(req);
                if (req.success) {
                    setModalVisible(!modalVisible);
                    setAlertImage(require('@images/check.png'));
                    setAlertText('저장되었습니다');
                    setTimeout(() => {
                        setModalVisible(modalVisible);
                    }, 1000);
                    nav.navigate('Mypage');
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    };

    {/*input창 속성들 관리*/}
    const [modalVisible, setModalVisible] = useState(false);
    const [imageChangeModalVisible, setImageChangeModalVisible] = useState(false);

    const [borderColor, setBorderColor] = useState('#B6B6B6');
    const [buttonColor, setButtonColor] = useState('#FFF');
    const [buttonTextColor, setButtonTextColor] = useState('#B6B6B6');
    const [buttonText, setButtonText] = useState('중복확인');
    const [ifButtonID, setIfButtonID] = useState(true);

    const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
    const [alertText, setAlertText] = useState('사용 불가한 닉네임입니다.');

    const [ifCheckNickname, setIfCheckNickname] = useState(false);

    const [ifWriting, setIfWriting] = useState({
            nickname: false,
            introduce: false,
        });

    const [inputSizeColor, setInputSizeColor] = useState({
        nickname: '#B6B6B6',
        introduce: '#B6B6B6',
        });

    const [inputSize, setInputSize] = useState({
            nickname: 0,
            introduce: 0,
        });

    const [maxLength, setMaxLength] = useState({
        nickname: 10,
        introduce: 50,
        });

    const inputCount = (text, field) => {
        setInputSize(prevInputSize => ({
            ...prevInputSize,
            [field]: text.length,
        }));

        if (text.length > 0) {
            setIfWriting(prevIfWriting => ({
            ...prevIfWriting,
            [field]: true,
            }));
            setInputSizeColor(prevInputSizeColor => ({
                ...prevInputSizeColor,
                [field]: '#B6B6B6',
                }));

            if (text.length === maxLength[field]) {
            setInputSizeColor(prevInputSizeColor => ({
                ...prevInputSizeColor,
                [field]: '#E94A4B',
                }));
            }
        } else {
            setIfWriting(prevIfWriting => ({
            ...prevIfWriting,
            [field]: false,
            }));
        }
    }

    const reappearButton = () => {
        setBorderColor('#ABABAB');
        setIfButtonID(true);
    };

    {/*닉네임 중복 확인*/}
    let ifDuplicate = false;
    const checkDuplicate = async () => {
        duplicateNickname(nickname).then((res) => {
            ifDuplicate = res.unique;
        }).catch((err) => {
            console.log(err);
        });

        if (ifDuplicate) {
            setModalVisible(!modalVisible);
            setAlertImage(require('@images/x_red.png'));
            setAlertText('이미 사용중인 닉네임입니다.');
            setTimeout(() => {
            setModalVisible(modalVisible);
            }, 1000);
        } else {
            setModalVisible(!modalVisible);
            setAlertImage(require('@images/check.png'));
            setAlertText('사용 가능한 닉네임입니다.');
            setTimeout(() => {
            setModalVisible(modalVisible);
            }, 1000);
            setIfCheckNickname(true);
            setIfButtonID(false);

            setIfWriting(prevIfWriting => ({
                ...prevIfWriting,
                nickname: true,
            }));

            setBorderColor('#B6B6B6');
            setButtonColor('#FFF');
            setButtonTextColor('#191919');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <AlertForm
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                borderColor="#F5F8F5"
                bgColor="#FAFAFA"
                image={alertImage}
                textColor="#191919"
                text={alertText}>
            </AlertForm>

            <ProfileChangeForm
                modalVisible={imageChangeModalVisible}
                setModalVisible={setImageChangeModalVisible}
                setImage={setProfileImage}>
            </ProfileChangeForm>

            {/* 상단 바 */}
            <View style={tw`flex-row items-center justify-between mt-5 mb-[14px]`}>
                <Pressable onPress={goBack} style={tw`flex-row`}>
                    <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] mr-[8px] w-[10px] h-[18px] tint-[#191919]`}></Image>
                    <View style={tw`ml-[20px]`}></View>
                </Pressable>
                <Text style={tw`text-[#191919] text-base font-medium`}>프로필 수정</Text>
                <Pressable onPress={onPressSave} style={tw`flex-row`}>
                    <Text style={tw`text-[#191919] text-sm font-normal`}>저장</Text>
                    <View style={tw`mr-[20px]`}></View>
                </Pressable>
            </View>
            <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>

            <Pressable onPress={onPressProfileChange}>
                <Image 
                    source={profileImage ? { uri: profileImage } : require('@images/newprofile.png')}
                    style={tw`w-[100px] h-[100px] rounded-full mx-auto mt-[20px] mb-[64px]`}>
                </Image>
            </Pressable>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <NicknameInputForm
                    image={require('@images/nickname.png')}
                    placeholder={nickname ? nickname : '닉네임을 설정해주세요'}
                    setValue={setNickname}
                    reappearButton={reappearButton}
                    inputCount={inputCount}
                    inputSize={inputSize.nickname}
                    inputSizeColor={inputSizeColor.nickname}
                    ifWriting={ifWriting.nickname}
                    ifButton={ifButtonID}
                    borderColor={borderColor}
                    buttonColor={buttonColor}
                    buttonTextColor={buttonTextColor}
                    buttonText={buttonText}
                    onPressButton={checkDuplicate}
                    ifCheck={ifCheckNickname}>
                </NicknameInputForm>
                <View style={tw`h-[20px]`}></View>
                <IntroduceInputForm
                    image={require('@images/write_gray.png')}
                    placeholder={introduce ? introduce : '소개글을 입력해주세요'}
                    setValue={setIntroduce}
                    inputSize={inputSize.introduce}
                    inputSizeColor={inputSizeColor.introduce}
                    inputCount={inputCount}
                    ifWriting={ifWriting.introduce}>
                </IntroduceInputForm>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#FAFAFA',
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: '90%',
    },
});