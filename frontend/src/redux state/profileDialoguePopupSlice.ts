import { createSlice } from "@reduxjs/toolkit";

interface profileDialoguePopupState {
  isOpen: boolean;
}

const initialState: profileDialoguePopupState = {
  isOpen: false,
};

const profileDialoguePopupSlice = createSlice({
  name: "profileDialoguePopup",
  initialState,
  reducers: {
    openProfileDialoguePopup: (state) => {
      state.isOpen = true;
    },
    closeProfileDialoguePopup: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openProfileDialoguePopup, closeProfileDialoguePopup } =
  profileDialoguePopupSlice.actions;
export default profileDialoguePopupSlice.reducer;
