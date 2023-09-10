import AsyncStorage from "@react-native-async-storage/async-storage";

const setCookie = async (key, cookie) => {
    try {
        const stringCookie = JSON.stringify(cookie);
        await AsyncStorage.setItem(key, stringCookie);
    } catch (err) {
        console.log(err);
    }
}

const getCookieWithKey = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (err) {
        console.log(err);
    }
}

const getAllCookieStrings = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const values = await AsyncStorage.multiGet(keys);
        const memberId = values[0][1].substring(2, values[0][1].length - 2).toString();
        return memberId;
    } catch (err) {
        console.log(err);
    }
}

const removeCookie = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (err) {
        console.log(err);
    }
}

const clearCookie = async () => {
    try {
        await AsyncStorage.clear();
    } catch (err) {
        console.log(err);
    }
}

const getAllCookies = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        return keys;
    } catch (err) {
        console.log(err);
    }
}

const ifCookieExists = async () => {
    try {
        const keys = await getAllCookies();
        if (keys.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
}

export { setCookie, getCookieWithKey, getAllCookieStrings, removeCookie, clearCookie, ifCookieExists }
