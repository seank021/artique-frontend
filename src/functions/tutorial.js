import AsyncStorage from "@react-native-async-storage/async-storage";

const setIfTutorialRead = async (read) => {
    try {
        await AsyncStorage.setItem('ifTutorialRead', read.toString());
    } catch (e) {
        console.log(e);
    }
}

const getIfTutorialRead = async () => {
    try {
        const value = await AsyncStorage.getItem('ifTutorialRead');
        return value;
    } catch (e) {
        console.log(e);
    }
}

const removeTutorialRead = async () => {
    try {
        await AsyncStorage.removeItem('ifTutorialRead');
    } catch (e) {
        console.log(e);
    }
}

export { setIfTutorialRead, getIfTutorialRead, removeTutorialRead };