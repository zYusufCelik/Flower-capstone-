import React, { useState } from "react";

const VideoEmbed = () => {
  const [videoLink, setVideoLink] = useState("");
  const [videoId, setVideoId] = useState("");

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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-center text-sm whitespace-normal sm:whitespace-nowrap"
        >
          Show Video
        </button>
      </div>

      {videoId && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Video:</h3>
          <iframe
            className="w-full h-64 rounded-lg border"
            src={`https://www.youtube.com/embed/${videoId}`}
            allowFullScreen
            title="Embedded Video"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoEmbed;
