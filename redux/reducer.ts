import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface generalSliceType {
  user: any;
  isLogIn: boolean;
}

// Define the initial state using that type
const initialState: generalSliceType = {
  user: {},
  isLogIn: false,
};

export const generalSlice = createSlice({
  name: "general",
  initialState: initialState,
  reducers: {
    setIsLogIn: (state, action: PayloadAction<boolean>) => {
      state.isLogIn = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { setIsLogIn, setUser } = generalSlice.actions;

export default generalSlice.reducer;
