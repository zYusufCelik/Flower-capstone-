import React, { useEffect, useRef, useState } from "react";

const VideoEmbed = ({ videoId, setVideoId }) => {
  const [videoLink, setVideoLink] = useState("");
  const playerRef = useRef(null);

  const handleVideoClick = () => {
    const extractedId = extractYouTubeVideoId(videoLink);
    if (extractedId) {
      setVideoId(extractedId);
    } else {
      alert("Please enter a valid YouTube link!");
    }
  };

  const extractYouTubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // YouTube API'yi yükle ve player'ı oluştur
  useEffect(() => {
    if (!videoId) return;

    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        createPlayer();
      } else {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = createPlayer;
      }
    };

    const createPlayer = () => {
      if (playerRef.current) {
        playerRef.current.destroy?.();
      }

      playerRef.current = new window.YT.Player("yt-player", {
        height: "360",
        width: "100%",
        videoId,
      });
    };

    loadYouTubeAPI();
  }, [videoId]);

  const toggleVideo = () => {
    if (!playerRef.current) return;

    const state = playerRef.current.getPlayerState(); // 1 = playing, 2 = paused
    if (state === 1) {
      playerRef.current.pauseVideo();
    } else if (state === 2 || state === 0) {
      playerRef.current.playVideo();
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Video</h2>

      <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-2 sm:space-y-0">
        <input
          type="text"
          placeholder="Enter video link"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button
          onClick={handleVideoClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm"
        >
          Show Video
        </button>
      </div>

      {videoId && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold">Video:</h3>
          <div
            className="w-full aspect-video rounded overflow-hidden cursor-pointer"
            onClick={toggleVideo}
            title="Click to play/pause"
          >
            <div id="yt-player"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoEmbed;
