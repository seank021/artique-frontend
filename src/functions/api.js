import axios from "axios";
import * as Cookies from "@functions/cookie"

async function getMemberId() {
    try {
        const cookies = await Cookies.getCurrentLoginCookie();
        return cookies;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getHeaders = async () => {
    try {
        const myHeaders = new Headers();
        const memberId = await getMemberId();
        myHeaders.append("Cookie", memberId);
        myHeaders.append("Content-Type", "application/json");
        return myHeaders;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const feedReviews = async (page) => {
    try {
        const myHeaders = await getHeaders();
        // console.log(myHeaders.map);
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
        const myHeaders = await getHeaders();
        // console.log(myHeaders);
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
        const myHeaders = await getHeaders();
        // console.log(myHeaders);
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
        const myHeaders = await getHeaders();
        // console.log(myHeaders.map);
        const response = await axios.post(`http://3.39.145.210/thumbs`, {
            reviewId: reviewId,
            isThumbsUp: isThumbsUp,
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

export { feedReviews, musicalReviews, musicalDetails, musicalRateStatistics, musicalReviewsAll, thumbsUp, reviewDetail, searchMusicals };
