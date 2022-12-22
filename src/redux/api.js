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

export const relatedToVideos = (videoId) =>
  axios.get(
    `${process.env.REACT_APP_YOUTUBE_BASE_URL}search?part=snippet&maxResults=32&order=date&relatedToVideoId=${videoId}&safeSearch=strict&type=video&videoDuration=medium&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
  );

export const getChannelVideo = (idChannel) =>
  axios.get(
    `${process.env.REACT_APP_YOUTUBE_BASE_URL}channels?part=snippet%2Cstatistics%2CcontentDetails%2Cstatus&part=brandingSettings&id=${idChannel}&maxResults=1&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
  );

export const getPlaylistChannelVideos = (idPlaylist) =>
  axios.get(
    `${process.env.REACT_APP_YOUTUBE_BASE_URL}playlistItems?part=snippet%2CcontentDetails%2Cstatus&maxResults=50&playlistId=${idPlaylist}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
  );

export const searchVideo = (key) =>
  axios.get(
    `${process.env.REACT_APP_YOUTUBE_BASE_URL}search?part=snippet&order=date&q=${key}&safeSearch=strict&maxResults=32&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&regionCode=VN`
  );

export const checkVideoForChildren = (videosId) =>
  axios.get(
    `${process.env.REACT_APP_YOUTUBE_BASE_URL}videos?part=snippet%2CcontentDetails%2Cstatistics%2C%20status&id=${videosId}&maxResults=50&regionCode=VN&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
  );

// --------------------------Children API-----------------------------------
export const createChildren = (formData, userOauthId) =>
  axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userOauthId}/childrens`,
    formData
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
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childId}/for-child`,
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
  channelId,
  thumbnail,
  title
) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childrenID}/add-video-history`,
    {
      videoId,
      channelId,
      thumbnail,
      title,
    }
  );

export const clearVideoHistory = (childrenID, userId) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childrenID}/clear-videos-history`
  );

// --------------------------PARENT API-----------------------------------
export const createSecretPassword = (userId, password) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/update-secret-password`,
    {
      password,
    }
  );

export const updateChildrenProfileForParent = (childId, userId, formData) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childId}/for-parent`,
    formData
  );

export const addVideoByParent = (
  childId,
  userId,
  videoId,
  channelId,
  thumbnail,
  title
) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childId}/add-video`,
    {
      videoId,
      channelId,
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

export const deleteChildByParent = (childId, userId) =>
  axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childId}`
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

export const getMessageChat = (videoId) =>
  axios.get(`${process.env.REACT_APP_BACKEND_URL}/chat/${videoId}`);

export const updateMessage = (chatId, messageId, name, picture, text) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/chat/${chatId}/messages/${messageId}`,
    {
      name,
      picture,
      text,
    }
  );

export const deleteMessage = (chatId, messageId) =>
  axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/chat/${chatId}/messages/${messageId}`
  );

export const updateKidActivity = (userId, activity) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/kid-activity`,
    activity
  );

export const blockVideo = (childId, userId, videoId) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childId}/block-video`,
    {
      videoId,
    }
  );

export const clearBlockVideo = (childId, userId) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childId}/clear-block-video`
  );

export const blockSearch = (childId, userId) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childId}/block-search`
  );

export const allowSearch = (childId, userId) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childId}/allow-search`
  );

export const subscribeChannel = (childId, userId, channelId, title, picture) =>
  axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childId}/subscriptions`,
    {
      channelId,
      title,
      picture,
    }
  );

export const unSubscribeChannel = (childId, userId, channelId) =>
  axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childId}/subscriptions/${channelId}`
  );

export const blockChannel = (childId, userId, channelId) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childId}/block-channel`,
    {
      channelId,
    }
  );

export const clearBlockChannel = (childId, userId) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childId}/clear-block-channel`
  );

export const blockChat = (childId, userId) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childId}/block-chat`
  );

export const allowChat = (childId, userId) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/childrens/${childId}/allow-chat`
  );

export const getKidActivity = (userId) =>
  axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/kids-activity`
  );
