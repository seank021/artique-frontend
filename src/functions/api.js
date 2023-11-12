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
        myHeaders.append("Authorization", memberId);
        myHeaders.append("Content-Type", "application/json");
        // console.log(myHeaders.map)
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
        // console.log(reviewId);
        const response = await axios.post(`http://3.39.145.210/thumbs`, {
            reviewId: reviewId,
            thumbsUp: isThumbsUp,
        }, {
            headers: myHeaders.map,
        });
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
};

const reviewWrite = async (starRating, shortReview, longReview, casting, viewDate, seat, musicalId, shortSpoiler, longSpoiler) => {
    try {
        const myHeaders = await getHeaders();
        // console.log(myHeaders.map);
        const response = await axios.post(`http://3.39.145.210/write/review`, {
            starRating: starRating,
            shortReview: shortReview,
            longReview: longReview,
            casting: casting,
            viewDate: viewDate,
            seat: seat,
            musicalId: musicalId,
            shortSpoiler: shortSpoiler,
            longSpoiler: longSpoiler,
        }, {
            headers: myHeaders.map,
        });
        // console.log(response.data);
    } catch (err) {
        console.log(err.response.data);
    }
};

const reviewUpdate = async (reviewId, starRating, shortReview, longReview, casting, viewDate, seat, shortSpoiler, longSpoiler) => {
    try {
        const myHeaders = await getHeaders();
        // console.log(myHeaders.map);
        const response = await axios.post(`http://3.39.145.210/update/review`, {
            reviewId: reviewId,
            starRating: starRating,
            shortReview: shortReview,
            longReview: longReview,
            casting: casting,
            viewDate: viewDate,
            seat: seat,
            shortSpoiler: shortSpoiler,
            longSpoiler: longSpoiler,
        }, {
            headers: myHeaders.map,
        });
        console.log(response.data);
    } catch (err) {
        console.log(err.response.data);
    }
};

const reviewDelete = async (reviewId) => {
    try {
        const myHeaders = await getHeaders();
        const response = await axios.delete(`http://3.39.145.210/delete/review?review-id=${reviewId}`, {
            headers: myHeaders.map,
        });
        // console.log(response.data);
    } catch (err) {
        console.log(err.response.data);
    }
};

const reviewReport = async (reviewId, reportReason) => {
    try {
        const myHeaders = await getHeaders();
        // console.log(myHeaders.map)
        const response = await axios.post(`http://3.39.145.210/report?review-id=${reviewId}&type=${reportReason}`, {}, {
            headers: myHeaders.map,
        });
        console.log(response.data);
    } catch (err) {
        console.log(err.response.data);
    }
}

const reviewDetail = async (reviewId) => {
    try {
        const response = await axios.get(`http://3.39.145.210/review?review-id=${reviewId}`);
        // console.log(response.data);
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
        const myHeaders = await getHeaders();
        const response = await axios.get(`http://3.39.145.210/member/id` , {
            headers: myHeaders.map,
        });
        console.log(response.data)
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

const myReviewsAll = async (page, orderBy) => {
    try {
        const memberId = await memberIdInMypage();
        const response = await axios.get(`http://3.39.145.210/member/review/create/all?member-id=${memberId}&page=${page}&size=10&order-by=${orderBy}`);
        console.log("MYREVIEWS", response.data);
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
}

const searchCreatedReviews = async (page, keyword, orderBy) => {
    try {
        const memberId = await memberIdInMypage();
        const response = await axios.get(`http://3.39.145.210/member/review/create/search?member-id=${memberId}&page=${page}&size=10&keyword=${keyword}&order-by=${orderBy}`);
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
}

const myThumbsAll = async (page) => {
    try {
        const memberId = await memberIdInMypage();
        const response = await axios.get(`http://3.39.145.210/member/review/thumbs/all?member-id=${memberId}&page=${page}&size=10`);
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
}

const searchThumbReviews = async (page, keyword) => {
    try {
        const memberId = await memberIdInMypage();
        const response = await axios.get(`http://3.39.145.210/member/review/thumbs/search?member-id=${memberId}&page=${page}&size=10&keyword=${keyword}`);
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
}

const profileUpload = async (imageUrl) => {
    try {
        const memberId = await memberIdInMypage();
        const response = await axios.post(`http://3.39.145.210/image`, {
            "memberId": memberId,
            "file": imageUrl,
        }, {
            headers: myHeaders.map,
        });
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
}

const updateMember = async (nickname, imageUrl, introduce) => {
    try {
        const memberId = await memberIdInMypage();
        const response = await axios.post(`http://3.39.145.210/update/member`, {
            "memberId": memberId,
            "nickname": nickname,
            "profileUrl": imageUrl,
            "introduce": introduce,
            // "password": ""
        }, {
            headers: myHeaders.map,
        });
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
}

const duplicateNickname = async (nickname) => {
    try {
        const response = await axios.get(`http://3.39.145.210/member/nickname/duplicate?nickname=${nickname}`);
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
}

export { feedReviews, musicalReviews, musicalDetails, musicalRateStatistics, musicalReviewsAll, thumbsUp, reviewWrite, reviewUpdate, reviewDelete, reviewReport, reviewDetail, searchMusicals, memberSummary, memberStatistics, memberShortThumbReviews, memberIdInMypage, myReviewsAll, searchCreatedReviews, myThumbsAll, searchThumbReviews, profileUpload, updateMember, duplicateNickname};
