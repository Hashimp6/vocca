import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
  },
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: action.payload.name,
          email: action.payload.email,
        })
      );
    },
    logout(state) {
      state.name = "";
      state.email = "";
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
