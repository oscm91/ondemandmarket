import { act } from '@testing-library/react-hooks';
import { configureStore } from '@reduxjs/toolkit';
import userSlice, { addUser, resetUser } from './reducer';
import { User, UserStore } from '@ondemandmarket/models';

// Mock data
const mockUser: User = {
  id: '1',
  firstName: 'User',
  lastName: 'One',
  phoneNumber: '1234567890',
  email: 'user1@example.com',
  password: 'password',
  confirmPassword: 'password',
  userType: 'doer',
};

describe('userSlice', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userSlice,
      },
    });
  });

  it('should add user correctly', () => {
    act(() => {
      store.dispatch(addUser(mockUser));
    });

    const state: UserStore = store.getState().user;
    expect(state).toEqual(mockUser);
  });

  it('should reset user correctly', () => {
    act(() => {
      store.dispatch(addUser(mockUser));
      store.dispatch(resetUser(undefined));
    });

    const state: UserStore = store.getState().user;
    expect(state).toEqual({} as UserStore);
  });
});