import AsyncStorage from "@react-native-async-storage/async-storage";

const setIfCheckedContractsInSocialLogin = async (read, type) => {
    try {
        await AsyncStorage.setItem(`ifCheckedContracts${type}`, read.toString());
    } catch (e) {
        console.log(e);
    }
}

const getIfCheckedContractsInSocialLogin = async (type) => {
    try {
        const value = await AsyncStorage.getItem(`ifCheckedContracts${type}`);
        return value;
    } catch (e) {
        console.log(e);
    }
}

const removeIfCheckedContractsInSocialLogin = async (type) => {
    try {
        await AsyncStorage.removeItem(`ifCheckedContracts${type}`);
    } catch (e) {
        console.log(e);
    }
}

export { setIfCheckedContractsInSocialLogin, getIfCheckedContractsInSocialLogin, removeIfCheckedContractsInSocialLogin };