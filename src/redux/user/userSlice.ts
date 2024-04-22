import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    }
  }
});

export const { addUser, removeUser } = counterSlice.actions;

export default counterSlice.reducer;