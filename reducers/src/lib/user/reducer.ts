import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserStore } from '@cocodemy/models';

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
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
