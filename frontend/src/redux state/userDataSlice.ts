import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserData from "../models/userModel";
import axios from "axios";
import uri from "./../utils/constants";

// interface for the userState to manage the redux state
interface UserState {
  loading: boolean;
  userData: UserData | null;
  error: string;
  isAuthenticated: boolean;
}
// initial state
const initialState: UserState = {
  loading: false,
  userData: {} as UserData,
  error: "",
  isAuthenticated: false,
};

//function to fetch the user Data if a token is present
export const fetchUserData = createAsyncThunk("user/fetchUsers", async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await axios.get(`${uri}/api/home`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
  throw new Error("No token found");
});

//slice , bloc ku similar
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //vendam
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        console.log(action.payload);
        state.isAuthenticated = true;
        state.error = "";
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch the data";
      });
  },
});

// Export the reducer to be included in the store
export default userSlice.reducer;
