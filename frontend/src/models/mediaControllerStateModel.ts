interface mediaControllerPopupStateModel {
  isOpen: boolean; //state whether the popup is visible or not
  type: string; //type of the popup (video, audio, speaker)
  isMuted: boolean; //state whether the media is muted or not
  isVideoOn: boolean; //state whether the video is on or not
  isAudioOn: boolean; //state whether the audio is on or not
  micDeviceId: string; //id of the selected mic

  videoDeviceId: string; //id of the selected video
}

export default mediaControllerPopupStateModel;
