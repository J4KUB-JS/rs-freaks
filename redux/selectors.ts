import { RootState } from "./store";

export const getIsLogIn = (state: RootState) => state.generalSlice.isLogIn;
export const getUser = (state: RootState) => state.generalSlice.user;
