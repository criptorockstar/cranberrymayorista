import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  id?: number;
  username?: string;
  email?: string;
}

const initialState: IUserState = {
  id: undefined,
  username: undefined,
  email: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action: PayloadAction<Partial<IUserState>>) => {
      return { ...state, ...action.payload };
    },
    setEmailState: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUsernameState: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    clearUserState: (state) => {
      state.id = undefined;
      state.email = undefined;
      state.username = undefined;
    },
  },
});

export const { setUserState, setEmailState, setUsernameState, clearUserState } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
