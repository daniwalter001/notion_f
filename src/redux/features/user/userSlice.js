import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, user) => {
      state.user = user.payload;
    },
    deleteUser: (state) => {
      state.user = {};
    },
  },
});

export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
