import { createSlice } from "@reduxjs/toolkit";

//This controller is used to control the media controller popup
//it is used in the videoFrame component
//It manages the popup and the buttons used to control the media
interface mediaControllerPopupState {
  isOpen: boolean; //state whether the popup is visible or not
  type: string; //type of the popup (video, audio, speaker)
  isMuted: boolean; //state whether the media is muted or not
  isVideoOn: boolean; //state whether the video is on or not
  isAudioOn: boolean; //state whether the audio is on or not
  micDeviceId: string; //id of the selected mic

  videoDeviceId: string; //id of the selected video
}

const initialState: mediaControllerPopupState = {
  isOpen: false,
  type: "",
  isMuted: false,
  isVideoOn: false,
  isAudioOn: false,
  micDeviceId: "default",
  videoDeviceId: "",
};

const mediaControllerPopupState = createSlice({
  name: "mediaControllerPopup",
  initialState,
  reducers: {
    //toggle the media controller popup
    toggleMediaControllerPopup: (state) => {
      state.isOpen = !state.isOpen;
    },
    //set the state of the media controller popup after the user has given permission with default devices fetched
    setMediaControllerId: (state, action) => {
      const { deviceType, deviceId } = action.payload;

      switch (deviceType) {
        case "micDeviceId":
          state.micDeviceId = deviceId;
          console.log(state.micDeviceId);
          break;

        case "videoDeviceId":
          state.videoDeviceId = deviceId;
          break;
        default:
          break;
      }
    },
    //toggle the button on the media controller popup (video, audio, speaker)
    toggleButton: (state, action) => {
      switch (action.payload) {
        case "mic":
          state.isMuted = !state.isMuted;
          break;
        case "camera":
          state.isVideoOn = !state.isVideoOn;
          break;
        case "speaker":
          state.isAudioOn = !state.isAudioOn;
          break;
        default:
          break;
      }
    },
    //set the type of the media controller popup (video, audio, speaker) and based on the state the component is conditional rendered
    //the rendered component is used to change the state of the media controller popup of its type
    setMediaControllerPopupType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const {
  toggleMediaControllerPopup,
  setMediaControllerId,
  toggleButton,
  setMediaControllerPopupType,
} = mediaControllerPopupState.actions;
export default mediaControllerPopupState.reducer;
