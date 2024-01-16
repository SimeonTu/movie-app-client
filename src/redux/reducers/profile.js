import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    changeUsername: false,
    changePassword: false,
    changeEmail: false,
    changeBirthday: false,
  },
  reducers: {
    clearProfile: (state) => {
      state.changeUsername = false;
      state.changePassword = false;
      state.changeEmail = false;
      state.changeBirthday = false;
    },
    setChangeUsername: (state, action) => {
      state.changeUsername = action.payload;
    },
    setChangePassword: (state, action) => {
      state.changePassword = action.payload;
    },
    setChangeEmail: (state, action) => {
      state.changeEmail = action.payload;
    },
    setChangeBirthday: (state, action) => {
      state.changeBirthday = action.payload;
    },
  },
});

export const {
  clearProfile,
  setChangeUsername,
  setChangePassword,
  setChangeEmail,
  setChangeBirthday,
} = profileSlice.actions;
export default profileSlice.reducer;
