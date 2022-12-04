import axios from "axios";

// -------------------------- OAUTH 2 GOOGLE -----------------------------------
// export const loginOauth2 = () =>
//   axios.get(
//     `${process.env.REACT_APP_YOUTUBE_BASE_URL}/auth/google`
//     // {
//     //   headers: {
//     //     Authorization: `Bearer ${token}`,
//     //   },
//     // }
//   );

export const getUser = () =>
  axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/auth/success`,
    { withCredentials: true }
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

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
