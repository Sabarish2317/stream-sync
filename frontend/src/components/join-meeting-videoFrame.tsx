import React, { useState, useEffect, useContext } from "react";
import getRandomIntInclusive from "../utils/generateRandomColor";
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
import UserData from "../models/userModel";
import AlertContext from "../contexts/alertContext";

// Things implemented
// 1. Handle user media permission : onUserMediaError (user didnt give permission or the device is not available by system settings) the mic and video cannot be unmuted ,
// the default profile will be shown in the window
// 2. If the laptop shutter is closed it shows the shutter closed icon (handled by the browser)
// 3. If user allowed both permission then video wll be shows and mic will be shown then the user can change the media-device
// 4. the default profile name is allocated by using his name fromm the props (if logged in ) else it required for a name to be given before joining the meeting

//implemented everything here abstract panna modai ah iruku
interface JoinMeetingFrameProps {
  userData: UserData;
}

const JoinMeetingFrame: React.FC<JoinMeetingFrameProps> = ({ userData }) => {
  //random color generator for the video call circles
  const colorPalette: Array<string> = [
    "#E45C3B",
    "#8A3FFC",
    "#55C37B",
    "E63946",
    "FFCA3A",
  ];
  const [color] = useState(colorPalette[getRandomIntInclusive(0, 4)]);

  //state managment from redux states
  const { isOpen, type, isMuted, isVideoOn, micDeviceId, videoDeviceId } =
    useSelector((state: RootState) => state.mediaControllerPopup); // Read the state
  const dispatch = useDispatch<AppDispatch>();

  //return type from a browser
  interface MediaDevice {
    deviceId: string;
    kind: "audioinput" | "videoinput" | "audiooutput";
    label: string;
  }
  const [availableDevices, setAvailableDevices] = useState<MediaDevice[]>([]);

  //get all the avaiable deives on the user's device and re-renders if the device list changes i.e if a new device is added
  useEffect(() => {
    getAvailableDevices()
      .then((Devices) => {
        if (Devices) {
          setAvailableDevices(Devices);
          console.log(Devices);
        }
      })
      .catch((error) => {
        console.error("Error fetching devices:", error);
      });
  }, []);

  // handle errors in getting media
  const { setAlert, setPrimaryButton } = useContext(AlertContext);
  const onUserMediaError = () => {
    //show an popup insted of error later
    //join-meeting-videoFrame.tsx:67 User media error: NotAllowedError: Permission denied
    const showMediaErrorAlert = () => {
      setAlert(
        "Allow access",
        "Coult not get permssion to access camera and mic ?",
        "error"
      );

      setPrimaryButton("Allow", async () => {});
    };

    showMediaErrorAlert();
  };

  // Dynamically handle constraints for video and audio devices
  const videoConstraints = videoDeviceId
    ? { deviceId: { exact: videoDeviceId } }
    : true; // Fallback to default if specific video device is not available

  const audioConstraints = micDeviceId
    ? { deviceId: { exact: micDeviceId } }
    : true; // Fallback to default if specific mic is not available

  return (
    <div
      className="join-meeting-frame-container"
      //to prevent border overflow cases when frame rate is low
      style={{ background: isVideoOn ? "white" : "#333537", width: "100%" }}
    >
      <div className="user-name-container">
        <h5 style={{ color: "white" }}>{userData.name}</h5>
      </div>

      <div
        className="circle-name-container"
        style={{
          background: color,
          display: isVideoOn ? "none" : "flex",
        }}
      >
        <h2 style={{ color: "white", fontWeight: 500 }}>
          {/* gives a short nick name to the user */}
          {userData.name.charAt(0).toUpperCase() +
            userData.name.charAt(1).toUpperCase()}
        </h2>
      </div>

      {/* Video feed */}
      {isVideoOn && (
        <Webcam
          className="join-meeting-frame"
          audio={isMuted} //mutes the mic
          videoConstraints={videoConstraints} // Update video constraints based on selected camera
          audioConstraints={audioConstraints} //updates the audio constraints based on selected mic
          // onUserMedia={onUserMedia}        //webRtc ku initimate panna use paniklam aprom
          onUserMediaError={onUserMediaError}
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
            <img
              src={
                type === "mic"
                  ? "/assets/icons/mic-icon-on.svg"
                  : "/assets/icons/video-icon-on.svg"
              }
              alt=""
            />
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
                }}
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
            {isOpen && type === "mic" && isMuted && (
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

          {/* <MediaSelectionButton
            buttonName="speaker"
            onIcon="/assets/icons/speaker-icon-on.svg"
            offIcon="/assets/icons/speaker-icon-off.svg"
            stateController={isAudioOn}
            isExpandable={false}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default JoinMeetingFrame;
