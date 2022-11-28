import axios from "axios";

// --------------------------VIDEO API-----------------------------------
export const getVideoList = () =>
  axios.get(
    `${process.env.REACT_APP_YOUTUBE_BASE_URL}?part=snippet%2C%20status%2C%20contentDetails&chart=mostPopular&maxResults=500&regionCode=VN&videoCategoryId=24&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
