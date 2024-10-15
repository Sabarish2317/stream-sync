import { configureStore } from "@reduxjs/toolkit";
import profileDialoguePopupSliceReducer from "./profileDialoguePopupSlice";
import userSlice from "./userDataSlice";
import mediaControllerPopupSliceReducer from "./mediaControllerPopupSlice";
export const store = configureStore({
  reducer: {
    profileDialoguePopup: profileDialoguePopupSliceReducer,
    userData: userSlice,
    //mediaController contains both media controller and its popup state , name maatha modai ah iruku
    mediaControllerPopup: mediaControllerPopupSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
