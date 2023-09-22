import axios from "axios";
import * as Cookies from "@functions/cookie"

async function getMemberId() {
    try {
        const cookies = await Cookies.getAllCookieStrings();
        return cookies;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const feedReviews = async (page) => {
    try {
        const memberId = await getMemberId();
        const response = await axios.get(`http://3.39.145.210/feed?page=${page}&size=15`, {
            headers: {
                'set-cookie': memberId,
            },
        });
        // console.log(response.data);
        // console.log(response.data.feeds);
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
};

// TODO: order-by 넣기
const musicalReviewsAll = async (musicalId, page) => {
    try {
        const memberId = await getMemberId();
        const response = await axios.get(`http://3.39.145.210/musical/reviews/all?musical-id=${musicalId}&page=${page}&size=10&order-by=thumbs`, {
            headers: {
                'set-cookie': memberId,
            },
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
        const memberId = await getMemberId();
        const response = await axios.get(`http://3.39.145.210/musical/reviews?musical-id=${musicalId}`, {
            headers: {
                'set-cookie': memberId,
            },
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

const reviewDetailDto = {
    memeberNickname: "어진",
    musicalTitle: "뮤지컬 지킬 앤 하이드",
    casting: "조승우, 승우조",
    seat: "B열 19번",
    rating: 2,
    shortReview: "중구난방인 서사들 사이의 허점들을 봉합하는 입체적인 캐릭터들의 안타까운 이야기",
    longReview: "서울공연으로 보고 총 마지막 공연인 여수에서 마무리 했다. 오케스트라 없이 MR공연이라 혹시나 조금 부족한 공연이면 어쩌나 했지만 음향도 좋았고 내가 좋아하는 배우의 마지막 지킬앤하이드를 볼 수 있어서 너무 좋았다. 서울공연으로 보고 총 마지막 공연인 여수에서 마무리 했다.오케스트라 없이 MR공연이라 혹시나 조금 부족한 공연이면 어쩌나 했지만 음향도 좋았고 내가 좋아하는 배우의 마지막 지킬앤하이드를 볼 수 있어서 너무 좋았다.  서울공연으로 보고 총 마지막 공연인 여수에서 마무리 했다. 오케스트라 없이 MR공연이라 혹시나 조금 부족한 공연이면 어쩌나 했지만 음향도 좋았고 내가 좋아하는 배우의 마지막 지킬앤하이드를 볼 수 있어서 너무 좋았다. 서울공연으로 보고 총 마지막 공연인 여수에서 마무리 했다.오케스트라 없이 MR공연이라 혹시나 조금 부족한 공연이면 어쩌나 했지만 음향도 좋았고 내가 좋아하는 배우의 마지막 지킬앤하이드를 볼 수 있어서 너무 좋았다.  서울공연으로 보고 총 마지막 공연인 여수에서 마무리 했다. 오케스트라 없이 MR공연이라 혹시나 조금 부족한 공연이면 어쩌나 했지만 음향도 좋았고 내가 좋아하는 배우의 마지막 지킬앤하이드를 볼 수 있어서 너무 좋았다. 서울공연으로 보고 총 마지막 공연인 여수에서 마무리 했다.오케스트라 없이 MR공연이라 혹시나 조금 부족한 공연이면 어쩌나 했지만 음향도 좋았고 내가 좋아하는 배우의 마지막 지킬앤하이드를 볼 수 있어서 너무 좋았다. ",
    viewDate: "2023-09-10",
}

export { feedReviews, musicalReviews, musicalDetails, musicalRateStatistics, musicalReviewsAll, reviewDetailDto };
