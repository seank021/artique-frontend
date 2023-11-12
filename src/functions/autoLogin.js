import AsyncStorage from "@react-native-async-storage/async-storage";

const setAutoLogin = async (autoLogin) => { // 자동로그인 여부 저장하는 코드
    try {
        await AsyncStorage.setItem('autoLogin', autoLogin.toString());
    } catch (err) {
        console.log(err);
    }
}

const getAutoLogin = async () => { // 자동로그인 여부 가져오는 코드
    try {
        const value = await AsyncStorage.getItem('autoLogin');
        return value;
    } catch (err) {
        console.log(err);
    }
}

const removeAutoLogin = async () => { // 자동로그인 여부 삭제하는 코드
    try {
        await AsyncStorage.removeItem('autoLogin');
    } catch (err) {
        console.log(err);
    }
}

export { setAutoLogin, getAutoLogin, removeAutoLogin };