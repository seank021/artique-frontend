import axios from "axios";
import * as Cookies from "@functions/cookie"

async function getMemberId() {
    try {
        const cookies = await Cookies.getAllCookieStrings();
        console.log("!!!!!!!!!!!!!!!!", cookies);
        return cookies;
    } catch (err) {
        console.log(err);
        return null;
    }
}

var myHeaders = new Headers();

const feedReviews = async (page) => {
    try {
        const memberId = await getMemberId();
        myHeaders.append("Cookie", memberId);
        myHeaders.append("Content-Type", "application/json");
        console.log(myHeaders);

        const response = await axios.get(`http://3.39.145.210/feed?page=${page}&size=15`, {
            headers: myHeaders.map,
        });
        // console.log(response.data);
        // console.log(response.data.feeds);
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
};

const musicalReviewsAll = async (musicalId, page, orderBy) => {
    try {
        console.log(myHeaders);
        const response = await axios.get(`http://3.39.145.210/musical/reviews/all?musical-id=${musicalId}&page=${page}&size=10&order-by=${orderBy}`, {
            headers: myHeaders.map,
        });
        // console.log(response.data);
        // console.log(response.data.reviews);
        return response.data.reviews;
    } catch (err) {
        console.log(err.response.data);
    }
};

const musicalReviews = async (musicalId) => {
    try {
        console.log(myHeaders);
        const response = await axios.get(`http://3.39.145.210/musical/reviews?musical-id=${musicalId}`, {
            headers:  myHeaders.map,
        });
        // console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
};

const musicalDetails = async (musicalId) => {
    try {
        const response = await axios.get(`http://3.39.145.210/musical/detail?musical-id=${musicalId}`);
        // console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
};

const musicalRateStatistics = async (musicalId) => {
    try {
        const response = await axios.get(`http://3.39.145.210/musical/rate/statistics?musical-id=${musicalId}`);
        // console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
};

const thumbsUp = async (reviewId, isThumbsUp) => {
    try {
        console.log(myHeaders);
        const response = await axios.post(`http://3.39.145.210/thumbs`, {
            "reviewId": reviewId,
            "thumbsUp": isThumbsUp,
        }, {
            headers: myHeaders.map,
        });
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
};

const reviewDetail = async (reviewId) => {
    try {
        const response = await axios.get(`http://3.39.145.210/review?review-id=${reviewId}`);
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
}

const searchMusicals = async (keyword, orderBy) => {
    try {
        const response = await axios.get(`http://3.39.145.210/search?key-word=${keyword}&order-by=${orderBy}`);
        // console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
}

const memberIdInMypage = async () => {
    try {
        const response = await axios.get(`http://3.39.145.210/member/id`);
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
}

const memberSummary = async () => {
    try {   
        const memberId = await memberIdInMypage();  
        const response = await axios.get(`http://3.39.145.210/member/summary?member-id=${memberId}`);
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
}

const memberStatistics = async () => {
    try {
        const memberId = await memberIdInMypage();
        const response = await axios.get(`http://3.39.145.210/member/summary/statistics?member-id=${memberId}`);
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
}

const memberShortThumbReviews = async () => {
    try {
        const memberId = await memberIdInMypage();
        const response = await axios.get(`http://3.39.145.210/member/review/thumbs/short?member-id=${memberId}`);
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
}

export { feedReviews, musicalReviews, musicalDetails, musicalRateStatistics, musicalReviewsAll, thumbsUp, reviewDetail, searchMusicals, memberSummary, memberStatistics, memberShortThumbReviews, memberIdInMypage };
