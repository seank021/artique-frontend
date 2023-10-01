import AsyncStorage from "@react-native-async-storage/async-storage";

const storeSearchKeyword = async (keyword) => {
    try {
        // key: 'searchKeyword'
        // value: ['keyword1', 'keyword2', ...]
        const keywords = await AsyncStorage.getItem('searchKeyword');
        if (keywords === null) {
            await AsyncStorage.setItem('searchKeyword', JSON.stringify([keyword]));
        } else {
            const parsedKeywords = JSON.parse(keywords);
            if (parsedKeywords.includes(keyword)) {
                return;
            } else {
                parsedKeywords.push(keyword);
                await AsyncStorage.setItem('searchKeyword', JSON.stringify(parsedKeywords));
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const getAllSearchKeywords = async () => {
    try {
        const keywords = await AsyncStorage.getItem('searchKeyword');
        if (keywords === null) {
            return [];
        } else {
            return JSON.parse(keywords);
        }
    } catch (err) {
        console.log(err);
    }
}

const removeParticularKeyword = async (keyword) => {
    try {
        const keywords = await AsyncStorage.getItem('searchKeyword');
        if (keywords === null) {
            return;
        } else {
            const parsedKeywords = JSON.parse(keywords);
            const index = parsedKeywords.indexOf(keyword);
            if (index > -1) {
                parsedKeywords.splice(index, 1);
            }
            await AsyncStorage.setItem('searchKeyword', JSON.stringify(parsedKeywords));
        }
    } catch (err) {
        console.log(err);
    }
}

const removeAllKeywords = async () => {
    try {
        await AsyncStorage.removeItem('searchKeyword');
    } catch (err) {
        console.log(err);
    }
}

export { storeSearchKeyword, getAllSearchKeywords, removeParticularKeyword, removeAllKeywords };
