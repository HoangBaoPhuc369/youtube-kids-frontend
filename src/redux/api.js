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

export const searchVideo = (key) =>
  // search?part=snippet&order=date&q=video cho tre em&safeSearch=strict&maxResults=32&key=AIzaSyAkCm5boRgvBXioONTHkoxomRa538S5zUg&regionCode=VN
  axios.get(
    `${process.env.REACT_APP_YOUTUBE_BASE_URL}search?part=snippet&order=date&q=${key}&safeSearch=strict&maxResults=32&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&regionCode=VN`
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

export const checkVideoForChildren = (videosId) =>
  // search?part=snippet&order=date&q=video cho tre em&safeSearch=strict&maxResults=32&key=AIzaSyAkCm5boRgvBXioONTHkoxomRa538S5zUg&regionCode=VN
  axios.get(
    `${process.env.REACT_APP_YOUTUBE_BASE_URL}videos?part=snippet%2CcontentDetails%2Cstatistics%2C%20status&id=${videosId}&maxResults=50&regionCode=VN&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
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

export const updateChildrenProfileForChildren = (name, picture, id) =>
  axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/children/${id}/update-children-for-children`,
    {
      name,
      picture,
    }

    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

export const clearHistoryVideo = (id) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/children/clear-videos-history`,
    {
      childrenID: id,
    }
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

export const createSecretPasswordChildren = (childrenID, secretPassword) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/children/modify-secret-password-children`,
    {
      childrenID,
      secretPassword,
    }
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

export const deleteSecretPasswordChildren = (childrenID) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/children/delete-secret-password-children`,
    {
      childrenID,
    }
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

// --------------------------PARENT API-----------------------------------
export const createSecretPassword = (userId, secretPassword) =>
  axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/user/update-secret-password`,
    {
      userId,
      secretPassword,
    }
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
