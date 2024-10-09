import React from "react";

interface VideoFrameProps {
  isVideoOn: boolean;
  isAudioOn: boolean;
  name: string;
  streamSource: string;
}

const VideoFrame: React.FC<VideoFrameProps> = () => {
  return (
    <>
      <div
        className="video-frame"
        style={{
          backgroundColor: "#333537",
          width: "300px",
          height: "350px",
          borderRadius: "12px",
          position: "relative",
          padding: "16px 16px",
        }}
      >
        {/* <img src={test_male} alt="" /> */}
        <div
          className="media-actions row"
          style={{ position: "absolute", top: "0px", right: "0px" }}
        >
          <button className="button-xs-dark">
            <img src="/assets/icons/video-icon.webp" alt="video" />
          </button>
          <button className="button-xs-dark">
            <img src="/assets/icons/mic-icon.webp" alt="audio" />
          </button>
          <button className="button-xs-dark">
            <img src="/assets/icons/pin-icon.webp" alt="pin" />
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoFrame;
