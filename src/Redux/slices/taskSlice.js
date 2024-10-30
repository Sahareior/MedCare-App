import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null, // Store user information here
};

const taskSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload; // Store user data in `currentUser`
    },
  },
});

export const { setUser } = taskSlice.actions;
export default taskSlice.reducer;
