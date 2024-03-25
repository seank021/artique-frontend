import axios from "axios";
import * as Cookies from "@functions/cookie"

import { getPort } from "@functions/port";

const PORT = getPort();

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
        return myHeaders;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getHomeRecentReviews = async () => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.get(`${PORT}/home/review/recent`, {
        headers: myHeaders.map,
    });
    // console.log(response.data);
    return response.data.reviews;
  } catch (err) {
    console.log(err.response.data);
  }
};

const getHomeThumbsReviews = async () => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.get(`${PORT}/home/review/many-thumbs`, {
      headers: myHeaders.map,
    });
    // console.log(response.data);
    return response.data.reviews;
  } catch (err) {
    console.log(err.response.data);
  }
};

const getHomeRecommendMusicals = async () => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.get(`${PORT}/home/recommend`, {
      headers: myHeaders.map,
    });
    // console.log(response.data);
    return response.data.recommendMusicals;
  } catch (err) {
    console.log(err.response.data);
  }
};

const getHomeLongReviews = async () => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.get(`${PORT}/home/review/long`, {
      headers: myHeaders.map,
    });
    // console.log(response.data);
    return response.data.reviews;
  } catch (err) {
    console.log(err.response.data);
  }
};

const getHomeFiveStarReviews = async () => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.get(`${PORT}/home/review/five-star-rating`, {
      headers: myHeaders.map,
    });
    // console.log(response.data);
    return response.data.reviews;
  } catch (err) {
    console.log(err.response.data);
  }
};

const getHomeBanners = async () => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.get(`${PORT}/home/banner`, {
      headers: myHeaders.map,
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

const feedReviews = async (page) => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.get(`${PORT}/feed?page=${page}&size=15`, {
        headers: myHeaders.map,
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

const musicalReviewsAll = async (musicalId, page, orderBy) => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.get(`${PORT}/musical/reviews/all?musical-id=${musicalId}&page=${page}&size=10&order-by=${orderBy}`, {
        headers: myHeaders.map,
      });
    return response.data.reviews;
  } catch (err) {
    console.log(err.response.data);
  }
};

const musicalReviews = async (musicalId) => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.get(`${PORT}/musical/reviews?musical-id=${musicalId}`, {
        headers:  myHeaders.map,
      });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

const musicalDetails = async (musicalId) => {
  try {
    const response = await axios.get(`${PORT}/musical/detail?musical-id=${musicalId}`);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

const musicalRateStatistics = async (musicalId) => {
  try {
    const response = await axios.get(`${PORT}/musical/rate/statistics?musical-id=${musicalId}`);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

const thumbsUp = async (reviewId, isThumbsUp) => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.post(`${PORT}/thumbs`, {
        reviewId: reviewId,
        thumbsUp: isThumbsUp,
      }, {
        headers: myHeaders.map,
      });
    console.log(response.data);
    return response.data;
  } catch (err) {
    if (err.response.data.message === "banned member") {
      return "banned member";
    }
    console.log(err.response.data);
  }
};

const reviewWrite = async (starRating, shortReview, longReview, casting, viewDate, seat, musicalId, shortSpoiler, longSpoiler) => {
    try {
        const myHeaders = await getHeaders();
        const response = await axios.post(`${PORT}/write/review`, {
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
    } catch (err) {
        if (err.response.data.message === "banned member") {
          return "banned member";
        }
        console.log(err.response.data);
    }
};

const reviewUpdate = async (reviewId, starRating, shortReview, longReview, casting, viewDate, seat, shortSpoiler, longSpoiler) => {
    try {
        const myHeaders = await getHeaders();
        const response = await axios.post(`${PORT}/update/review`, {
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
        if (err.response.data.message === "banned member") {
          return "banned member";
        }
        console.log(err.response.data);
    }
};

const reviewDelete = async (reviewId) => {
    try {
        const myHeaders = await getHeaders();
        const response = await axios.delete(`${PORT}/delete/review?review-id=${reviewId}`, {
            headers: myHeaders.map,
        });
    } catch (err) {
        if (err.response.data.message === "banned member") {
          return "banned member";
        }
        console.log(err.response.data);
    }
};

const reviewReport = async (reviewId, reportReason) => {
    try {
        const myHeaders = await getHeaders();
        const response = await axios.post(`${PORT}/report/review?review-id=${reviewId}&type=${reportReason}`, {}, {
            headers: myHeaders.map,
        });
        console.log(response.data);
    } catch (err) {
        if (err.response.data.message === "banned member") {
          return "banned member";
        }
        console.log(err.response.data);
    }
}

const userReport = async (reportedMemberId, reportReason) => {
  try {
      const myHeaders = await getHeaders();
      const response = await axios.post(`${PORT}/report/member?member-id=${reportedMemberId}&type=${reportReason}`, {}, {
          headers: myHeaders.map,
      });
      console.log(response.data);
  } catch (err) {
      if (err.response.data.message === "banned member") {
        return "banned member";
      }
      console.log(err.response.data);
  }
}

const reviewDetail = async (reviewId) => {
    try {
        const myHeaders = await getHeaders();
        const response = await axios.get(`${PORT}/review?review-id=${reviewId}`, {
            headers: myHeaders.map,
        });
        return response.data;
    } catch (err) {
        console.log(err.response.data);
    }
}

const searchMusicals = async (keyword, orderBy) => {
  try {
    const response = await axios.get(`${PORT}/search?key-word=${keyword}&order-by=${orderBy}`);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
}

const memberIdInMypage = async () => {
  try {
    const myHeaders = await getHeaders();
    if (myHeaders.map.authorization === "") {
      return null
    }
    const response = await axios.get(`${PORT}/member/id`, {
      headers: myHeaders.map,
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
}

const memberSummary = async (memberId) => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.get(`${PORT}/member/summary?member-id=${memberId}`, {
      headers: myHeaders.map,
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

const memberStatistics = async (memberId) => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.get(`${PORT}/member/summary/statistics?member-id=${memberId}`, {
      headers: myHeaders.map,
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

const memberShortThumbReviews = async (memberId) => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.get(`${PORT}/member/review/thumbs/short?member-id=${memberId}`, {
      headers: myHeaders.map,
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

const myReviewsAll = async (memberId, page, orderBy) => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.get(`${PORT}/member/review/create/all?member-id=${memberId}&page=${page}&size=10&order-by=${orderBy}`, {
      headers: myHeaders.map,
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

const searchCreatedReviews = async (memberId, page, keyword, orderBy) => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.get(`${PORT}/member/review/create/search?member-id=${memberId}&page=${page}&size=10&keyword=${keyword}&order-by=${orderBy}`, {
      headers: myHeaders.map,
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

const myThumbsAll = async (memberId, page) => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.get(`${PORT}/member/review/thumbs/all?member-id=${memberId}&page=${page}&size=10`, {
      headers: myHeaders.map,
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

const searchThumbReviews = async (memberId, page, keyword) => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.get(`${PORT}/member/review/thumbs/search?member-id=${memberId}&page=${page}&size=10&keyword=${keyword}`, {
      headers: myHeaders.map,
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

const profileUpload = async (formdata) => {
  try {
    const myHeaders = await getHeaders();
    const requestOptions = {
      method: 'POST',
      body: formdata,
      headers: {
        'Authorization': myHeaders.map.authorization,
        'Content-Type': 'multipart/form-data',
      },
      redirect: 'follow'
    };

    const response = await fetch("${PORT}/image", requestOptions)
      .catch(error => console.log('error', error));
    console.log("response:", response)
    const result = await response.json();
    console.log("result:", result)
    return result.url;
  } catch (err) {
    console.log("ERROR:", err)
    console.log(err.response.data);
  }
};

const updateMember = async (nickname, imageUrl, introduce) => {
  try {
    const myHeaders = await getHeaders();
    const memberId = await memberIdInMypage();
    const response = await axios.post(`${PORT}/update/member`,
      {
        memberId: memberId,
        nickname: nickname,
        profileUrl: imageUrl,
        introduce: introduce,
      },
      {
        headers: myHeaders.map,
      },
    );
    return response.data;
  } catch (err) {
    if (err.response.data.message === "banned member") {
      return "banned member";
    }
    console.log(err.response.data);
  }
};

const updatePW = async (password) => {
  try {
    const myHeaders = await getHeaders();
    const memberId = await memberIdInMypage();
    const response = await axios.post(`${PORT}/update/member`,
      {
        memberId: memberId,
        password: password,
      },
      {
        headers: myHeaders.map,
      },
    );
    return response.data;
  } catch (err) {
    if (err.response.data.message === "banned member") {
      return "banned member";
    }
    console.log(err.response.data);
  }
};

const duplicateNickname = async (nickname) => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.get(`${PORT}/member/nickname/duplicate?nickname=${nickname}`, {
      headers: myHeaders.map,
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
}

const announcementList = async () => {
  try {
    const response = await axios.get(`${PORT}/config/notice`);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
}

const currentPWCheck = async (password) => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.post(`${PORT}/validation/member/password`,
      {
        password: password
      },
      {
        headers: myHeaders.map,
      },
    );
    return response.data;
  } catch (err) {
    if (err.response.data.message === "banned member") {
      return "banned member";
    }
    console.log(err.response.data);
  }
}

const exit = async () => {
  try {
    const myHeaders = await getHeaders();
    const response = await axios.delete(`${PORT}/delete/member`, {
      headers: myHeaders.map,
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
}

export { getHomeRecentReviews, getHomeThumbsReviews, getHomeRecommendMusicals, getHomeLongReviews, getHomeFiveStarReviews, getHomeBanners, feedReviews, musicalReviews, musicalDetails, musicalRateStatistics, musicalReviewsAll, thumbsUp, reviewWrite, reviewUpdate, reviewDelete, reviewReport, userReport, reviewDetail, searchMusicals, memberSummary, memberStatistics, memberShortThumbReviews, memberIdInMypage, myReviewsAll, searchCreatedReviews, myThumbsAll, searchThumbReviews, profileUpload, updateMember, updatePW, duplicateNickname, announcementList, currentPWCheck, exit };
