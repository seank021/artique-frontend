import AsyncStorage from "@react-native-async-storage/async-storage";

const setCookie = async (key, cookie) => { // 쿠키 저장하는 코드
    try {
        const stringCookie = cookie.toString();
        await AsyncStorage.setItem(key, stringCookie);
    } catch (err) {
        console.log(err);
    }
}

const getCookieWithKey = async (key) => { // 특정 쿠키 가져오는 코드
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (err) {
        console.log(err);
    }
}

const getCurrentLoginCookie = async () => { // 현재 로그인한 방식의 session-id를 가져오는 코드
    try {
        const currentLogin = await getCurrentLogin();
        const keys = await AsyncStorage.getAllKeys();
        const values = await AsyncStorage.multiGet(keys);
        var memberId = '';
        for (let i = 0; i < values.length; i++) {
            if (values[i][0] === currentLogin) {
                memberId = values[i][1];
                break;
            }
        }
        return memberId;
    } catch (err) {
        console.log(err);
    }
}

const getCurrentLogin = async () => { // 현재 어떤 방식의 로그인을 사용하고 있는지 확인하는 코드 (general, kakao, google, apple)
    try {
        const keys = await AsyncStorage.getAllKeys();
        const values = await AsyncStorage.multiGet(keys);
        var currentLogin = '';
        for (let i = 0; i < values.length; i++) {
            if (values[i][0] === 'currentLogin') {
                currentLogin = values[i][1];
                break;
            }
        }
        return currentLogin;
    } catch (err) {
        console.log(err);
    }
}

const removeCookie = async (key) => { // 특정 쿠키 삭제 코드
    try {
        await AsyncStorage.removeItem(key);
    } catch (err) {
        console.log(err);
    }
}

const clearCookie = async () => { // 모든 쿠키 삭제 코드
    try {
        await AsyncStorage.clear();
    } catch (err) {
        console.log(err);
    }
}

const ifLoginCookieExists = async () => { // 로그인 여부 확인 코드 (둘러보기 기능 위함)
    try {
        const keys = await AsyncStorage.getAllKeys();
        const values = await AsyncStorage.multiGet(keys);
        var currentLogin = '';
        for (let i = 0; i < values.length; i++) {
            if (values[i][0] === 'currentLogin') {
                currentLogin = values[i][1];
                break;
            }
        }
        if (currentLogin !== '') {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
}

export { setCookie, getCookieWithKey, getCurrentLoginCookie, getCurrentLogin, removeCookie, clearCookie, ifLoginCookieExists }
