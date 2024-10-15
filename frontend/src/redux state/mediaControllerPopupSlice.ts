import { createSlice } from "@reduxjs/toolkit";
import mediaControllerPopupStateModel from "../models/mediaControllerStateModel";

//This controller is used to control the media controller popup
//it is used in the videoFrame component
//It manages the popup and the buttons used to control the media

const initialState: mediaControllerPopupStateModel = {
  isOpen: false,
  type: "",
  isMuted: false,
  isVideoOn: false,
  isAudioOn: true,
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
