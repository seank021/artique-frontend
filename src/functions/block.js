import AsyncStorage from "@react-native-async-storage/async-storage";

export const addReviewBlock = async (reviewId) => {
    try {
        const blockList = await AsyncStorage.getItem('blockList');
        if (blockList !== null) {
            const newBlockList = JSON.parse(blockList);
            if (newBlockList.includes(reviewId)) {
                return;
            }
            newBlockList.push(reviewId);
            await AsyncStorage.setItem('blockList', JSON.stringify(newBlockList));
        } else {
            const newBlockList = [reviewId];
            await AsyncStorage.setItem('blockList', JSON.stringify(newBlockList));
        }
    } catch (err) {
        console.log(err);
    }
}

export const printReviewBlock = async () => { // for debugging
    try {
        const blockList = await AsyncStorage.getItem('blockList');
        if (blockList !== null) {
            console.log(JSON.parse(blockList));
        } else {
            console.log('null');
        }
    } catch (err) {
        console.log(err);
    }
}

export const removeReviewBlock = async (reviewId) => { // 후에 차단 풀기 기능 추가한다면 사용
    try {
        const blockList = await AsyncStorage.getItem('blockList');
        if (blockList !== null) {
            const newBlockList = JSON.parse(blockList);
            const index = newBlockList.indexOf(reviewId);
            if (index > -1) {
                newBlockList.splice(index, 1);
            }
            await AsyncStorage.setItem('blockList', JSON.stringify(newBlockList));
        } else {
            console.log('null');
        }
    } catch (err) {
        console.log(err);
    }
}

export const clearBlockList = async () => { // for debugging
    try {
        await AsyncStorage.removeItem('blockList');
    } catch (err) {
        console.log(err);
    }
}

export const ifReviewBlocked = async (reviewId) => {
    try {
        const blockList = await AsyncStorage.getItem('userblockList');
        if (blockList !== null) {
            const newBlockList = JSON.parse(blockList);
            if (newBlockList.includes(reviewId)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
}

export const addUserBlock = async (memberId) => {
    try {
        const blockList = await AsyncStorage.getItem('userblockList');
        if (blockList !== null) {
            const newBlockList = JSON.parse(blockList);
            if (newBlockList.includes(memberId)) {
                return;
            }
            newBlockList.push(memberId);
            await AsyncStorage.setItem('userblockList', JSON.stringify(newBlockList));
        } else {
            const newBlockList = [memberId];
            await AsyncStorage.setItem('userblockList', JSON.stringify(newBlockList));
        }
    } catch (err) {
        console.log(err);
    }
}

export const printUserBlock = async () => { // for debugging
    try {
        const blockList = await AsyncStorage.getItem('userblockList');
        if (blockList !== null) {
            console.log(JSON.parse(blockList));
        } else {
            console.log('null');
        }
    } catch (err) {
        console.log(err);
    }
}

export const removeUserBlock = async (memberId) => { // 후에 차단 풀기 기능 추가한다면 사용
    try {
        const blockList = await AsyncStorage.getItem('userblockList');
        if (blockList !== null) {
            const newBlockList = JSON.parse(blockList);
            const index = newBlockList.indexOf(memberId);
            if (index > -1) {
                newBlockList.splice(index, 1);
            }
            await AsyncStorage.setItem('userblockList', JSON.stringify(newBlockList));
        } else {
            console.log('null');
        }
    } catch (err) {
        console.log(err);
    }
}

export const ifUserBlocked = async (memberId) => {
    try {
        const blockList = await AsyncStorage.getItem('userblockList');
        if (blockList !== null) {
            const newBlockList = JSON.parse(blockList);
            if (newBlockList.includes(memberId)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
}

export const clearUserBlockList = async () => { // for debugging
    try {
        await AsyncStorage.removeItem('userblockList');
    } catch (err) {
        console.log(err);
    }
}

export const clearWholeBlockList = async () => { // for debugging
    try {
        await AsyncStorage.removeItem('blockList');
        await AsyncStorage.removeItem('userblockList');
    } catch (err) {
        console.log(err);
    }
}

