import axios from "axios";

// -------------------------- OAUTH 2 GOOGLE -----------------------------------

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
    `${process.env.REACT_APP_YOUTUBE_BASE_URL}videos?part=snippet%2C%20status%2C%20contentDetails&chart=mostPopular&maxResults=500&regionCode=VN&videoCategoryId=24&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

export const getChannelVideo = (idChannel) =>
  axios.get(
    `${process.env.REACT_APP_YOUTUBE_BASE_URL}channels?part=snippet%2CcontentDetails%2Cstatus&part=brandingSettings&id=${idChannel}&maxResults=1&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

export const addVideoHistory = (childrenID, videoId, thumbnail, title) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/children/add-video-history`,
    {
      childrenID,
      videoId,
      thumbnail,
      title,
    }
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

// --------------------------Children API-----------------------------------
export const createChildren = (formData, userOauthId) =>
  axios.post(`${process.env.REACT_APP_BACKEND_URL}/children/create-children`, {
    parentId: userOauthId,
    name: formData.kid_name,
    year: formData.age,
    month: formData.bMonth,
    content_settings: formData.content_settings,
    picture: formData.picture,
  });

export const listChildrens = (userOauthId) =>
  axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/children/list-childrens/${userOauthId}`
  );

// --------------------------CHAT API-----------------------------------
export const createOrGetChatVideo = (videoId) =>
  axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/chat/create-chat`,
    {
      videoId,
    }
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

export const sendMessage = (chatId, name, picture, text) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/chat/add-message-chat`,
    {
      chatId,
      name,
      picture,
      text,
    }
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

// --------------------------CHILDREN API-----------------------------------
export const getChildren = (id) =>
  axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/children/${id}`

    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
