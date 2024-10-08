import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import "./components.css";
import MediaSelectionButton from "./buttons/button-with-device-selection";
import getAvailableDevices from "../utils/getAvailableMediaDevices";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleMediaControllerPopup,
  setMediaControllerId,
} from "../redux state/mediaControllerPopupSlice";
import { AppDispatch, RootState } from "../redux state/store";

// Things implemented
// 1. Handle user media permission : onUserMediaError (user didnt give permission or the device is not available by system settings) the mic and video cannot be unmuted ,
// the default profile will be shown in the window
// 2. If the laptop shutter is closed it shows the shutter closed icon (handled by the browser)
// 3. If user allowed both permission then video wll be shows and mic will be shown then the user can change the media-device
// 4. the default profile name is allocated by using his name fromm the props (if logged in ) else it required for a name to be given before joining the meeting

const JoinMeetingFrame: React.FC = () => {
  const webcamRef = useRef<Webcam>(null); // reference for the webcam element
  const {
    isOpen,
    type,
    isMuted,
    isVideoOn,
    isAudioOn,
    micDeviceId,
    videoDeviceId,
  } = useSelector((state: RootState) => state.mediaControllerPopup); // Read the state
  const dispatch = useDispatch<AppDispatch>();

  //get all the avaiable deives on the user's device
  const [availableDevices, setAvailableDevices] = useState<MediaDevice[]>([]);
  interface MediaDevice {
    //return type from a browser
    deviceId: string;
    kind: "audioinput" | "videoinput" | "audiooutput";
    label: string;
  }

  useEffect(() => {
    getAvailableDevices()
      .then((Devices) => {
        if (Devices) {
          setAvailableDevices(Devices);
        }
      })
      .catch((error) => {
        console.error("Error fetching devices:", error);
      });
  }, []);

  // Handle errors in getting media
  const onUserMediaError = (error: string) => {
    //show an popup insted of error later
    console.error("User media error:", error);
  };
  // Set the audio output device (speaker) for the media stream

  // Dynamically handle constraints for video and audio devices
  const videoConstraints = videoDeviceId
    ? { deviceId: { exact: videoDeviceId } }
    : true; // Fallback to default if specific video device is not available

  const audioConstraints = micDeviceId
    ? { deviceId: { exact: micDeviceId } }
    : true; // Fallback to default if specific mic is not available

  return (
    <div className="join-meeting-frame-container">
      {/* Video feed */}
      {isVideoOn && (
        <Webcam
          className="join-meeting-frame"
          audio={isAudioOn}
          ref={webcamRef}
          videoConstraints={videoConstraints} // Update video constraints based on selected camera
          audioConstraints={audioConstraints} //updates the audio constraints based on selected mic
          // onUserMedia={onUserMedia}
          onUserMediaError={(error) => onUserMediaError(error.toString())}
          mirrored={true}
        />
      )}

      {/* contianer to hold popup controller and array */}
      <div className="media-buttons-controller">
        {/* popup controller to show the device seleciton dropdown */}

        <div
          className="media-controller-popup"
          style={{
            display: isOpen ? "flex" : "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "#494b4d",
            }}
          >
            <img src="/assets/icons/video-icon-on.svg" alt="" />
            {/* CAMERA selection dropdown */}
            {isOpen && type === "camera" && (
              <select
                className="dropdown"
                value={videoDeviceId}
                onChange={(e) => {
                  dispatch(
                    setMediaControllerId({
                      deviceType: "videoDeviceId",
                      deviceId: e.target.value,
                    })
                  );
                  dispatch(toggleMediaControllerPopup());
                }} // Update selected camera
              >
                {availableDevices
                  .filter((device) => device.kind === "videoinput")
                  .map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Camera ${device.deviceId}`}
                    </option>
                  ))}
              </select>
            )}
            {/* mic selection dropdown */}
            {isOpen && type === "mic" && (
              <select
                value={micDeviceId}
                onChange={(e) => {
                  dispatch(
                    setMediaControllerId({
                      deviceType: "micDeviceId",
                      deviceId: e.target.value,
                    })
                  );
                  dispatch(toggleMediaControllerPopup());
                }}
                onSelect={() => {
                  dispatch(toggleMediaControllerPopup());
                }}
                // Update selected microphone
              >
                {availableDevices
                  .filter((device) => device.kind === "audioinput")
                  .map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Microphone ${device.deviceId}`}
                    </option>
                  ))}
              </select>
            )}
          </div>
        </div>
        {/* container to hold the buttons row */}

        <div className="media-buttons-array dim-button">
          {/*Buttons array */}
          <MediaSelectionButton
            buttonName="camera"
            onIcon="/assets/icons/video-icon-on.svg"
            offIcon="/assets/icons/video-icon-off.svg"
            stateController={isVideoOn}
          />
          <MediaSelectionButton
            buttonName="mic"
            onIcon="/assets/icons/mic-icon-on.svg"
            offIcon="/assets/icons/mic-icon-off.svg"
            stateController={isMuted}
          />
          <MediaSelectionButton
            buttonName="speaker"
            onIcon="/assets/icons/speaker-icon-on.svg"
            offIcon="/assets/icons/speaker-icon-off.svg"
            stateController={isAudioOn}
            isExpandable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default JoinMeetingFrame;
