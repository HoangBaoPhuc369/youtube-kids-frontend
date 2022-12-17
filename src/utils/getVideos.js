import axios from "axios";

// const youtubeAPIKey = "AIzaSyA94eWKSDCMfZ9L-4LG5J-2nAJeQdkvbzA";
// const key = "chương trình trẻ em";

export const getVideos = async (key, nextPage = "", videos = []) => {
  const videoIds = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&q=${key}&safeSearch=strict&maxResults=50&key=${process.env.REACT_APP_YOUTUBE_API_KEY}${nextPage}`
  );
  const videosSearch = videoIds.data.items.map((x) => x.id.videoId).join("%2C");
  const videoList = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2C%20status&id=${videosSearch}&maxResults=50&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
  );
  const videoForChildren = videoList.data.items.filter(
    (video) => video.status.madeForKids === true
  );
  const slice = 32 - videos.length;
  if (videoIds.data.nextPageToken && slice > 0) {
    if (slice >= videoForChildren.length) {
      return getVideos(
        key,
        `&pageToken=${videoIds.data.nextPageToken}`,
        videos.concat(videoForChildren)
      );
    } else {
      return getVideos(
        key,
        `&pageToken=${videoIds.data.nextPageToken}`,
        videos.concat(videoForChildren.slice(0, slice))
      );
    }
  } else {
    if (slice >= videoForChildren.length) {
      return videos.concat(videoForChildren);
    } else {
      return videos.concat(videoForChildren.slice(0, slice));
    }
  }
};
