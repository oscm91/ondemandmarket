import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserStore } from '@ondemandmarket/models';

export const userSlice = createSlice({
  name: 'user',
  initialState: {} as UserStore,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      return {
        ...user,
        ...state,
      };
    },
    resetUser: (state, action: PayloadAction<undefined>) => {
      return {} as UserStore;
    },
  },
});

export const { addUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
