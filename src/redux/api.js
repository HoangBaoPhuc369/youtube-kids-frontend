import axios from "axios";

// -------------------------- OAUTH 2 GOOGLE -----------------------------------

export const getUser = () =>
  axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/success`, {
    withCredentials: true,
  });

// --------------------------VIDEO API-----------------------------------
export const getVideoList = () =>
  axios.get(
    `${process.env.REACT_APP_YOUTUBE_BASE_URL}videos?part=snippet%2C%20status%2C%20contentDetails&chart=mostPopular&maxResults=500&regionCode=VN&videoCategoryId=24&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
  );

export const getChannelVideo = (idChannel) =>
  axios.get(
    `${process.env.REACT_APP_YOUTUBE_BASE_URL}channels?part=snippet%2CcontentDetails%2Cstatus&part=brandingSettings&id=${idChannel}&maxResults=1&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
  );

export const searchVideo = (key) =>
  // search?part=snippet&order=date&q=video cho tre em&safeSearch=strict&maxResults=32&key=AIzaSyAkCm5boRgvBXioONTHkoxomRa538S5zUg&regionCode=VN
  axios.get(
    `${process.env.REACT_APP_YOUTUBE_BASE_URL}search?part=snippet&order=date&q=${key}&safeSearch=strict&maxResults=32&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&regionCode=VN`
  );

export const checkVideoForChildren = (videosId) =>
  // search?part=snippet&order=date&q=video cho tre em&safeSearch=strict&maxResults=32&key=AIzaSyAkCm5boRgvBXioONTHkoxomRa538S5zUg&regionCode=VN
  axios.get(
    `${process.env.REACT_APP_YOUTUBE_BASE_URL}videos?part=snippet%2CcontentDetails%2Cstatistics%2C%20status&id=${videosId}&maxResults=50&regionCode=VN&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
  );

// --------------------------Children API-----------------------------------
export const createChildren = (formData, userOauthId) =>
  axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userOauthId}/childrens`,
    {
      name: formData.kid_name,
      year: formData.age,
      month: formData.bMonth,
      content_settings: formData.content_settings,
      picture: formData.picture,
    }
  );

export const listChildrens = (userOauthId) =>
  axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userOauthId}/childrens`
  );

export const getChildren = (id, userId) =>
  axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${id}`
  );

export const updateChildrenProfileForChildren = (
  childId,
  userId,
  name,
  picture
) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}users/${userId}/childrens/${childId}/for-child`,
    {
      name,
      picture,
    }
  );

export const clearHistoryVideo = (id, userId) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${id}/clear-videos-history`,
    {
      childrenID: id,
    }
  );

export const createSecretPasswordChildren = (
  childrenID,
  userId,
  secretPassword
) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childrenID}/update-password`,
    {
      secretPassword,
    }
  );

export const updateContentChidlrenSettings = (
  childrenID,
  userId,
  contentSetting
) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childrenID}/update-content`,
    {
      contentSetting,
    }
  );

export const addVideoHistory = (
  childrenID,
  userId,
  videoId,
  thumbnail,
  title
) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childrenID}/add-video-history`,
    {
      videoId,
      thumbnail,
      title,
    }
  );

export const clearVideoHistory = (childrenID, userId) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childrenID}/clear-videos-history`
  );

// --------------------------PARENT API-----------------------------------
export const createSecretPassword = (userId, secretPassword) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/user/update-secret-password`,
    {
      userId,
      secretPassword,
    }
  );

export const updateChildrenProfileForParent = (
  childId,
  userId,
  name,
  picture,
  year,
  month
) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childId}/for-parent`,
    {
      name,
      picture,
      year,
      month,
    }
  );

export const addVideoByParent = (childId, userId, videoId, thumbnail, title) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childId}/add-video`,
    {
      videoId,
      thumbnail,
      title,
    }
  );

export const removeVideoByParent = (childId, userId, videoId) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childId}/remove-video`,
    {
      videoId,
    }
  );

export const deleteChildByParent = (childId, userId, videoId) =>
  axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}users/${userId}/childrens/${childId}`
  );

// --------------------------CHAT API-----------------------------------
export const createOrGetChatVideo = (videoId) =>
  axios.post(`${process.env.REACT_APP_BACKEND_URL}/chat`, {
    videoId,
  });

export const sendMessage = (chatId, name, picture, text) =>
  axios.post(`${process.env.REACT_APP_BACKEND_URL}/chat/${chatId}/messages`, {
    name,
    picture,
    text,
  });
