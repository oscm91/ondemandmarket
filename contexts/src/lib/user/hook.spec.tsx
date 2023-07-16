import { renderHook, act } from '@testing-library/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';
import Cookies from 'js-cookie';
import { useUser } from './hook';
import { waitFor } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual as object,
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  };
});

vi.mock('@apollo/client', async () => {
  const actual = await vi.importActual('@apollo/client');
  return {
    ...actual as object,
    useLazyQuery: vi.fn(),
    useMutation: vi.fn(),
  };
});

vi.mock('js-cookie', async () => {
  const actual = await vi.importActual('js-cookie');
  return {
    default: {
      ...actual as object,
      get: vi.fn(() => 'mockUserId'),
      set: vi.fn(),
      remove: vi.fn(),
    },
  };
});

describe('useUser', () => {
  const mockUserData = {
    id: '1',
    firstName: 'User 1',
    lastName: 'Lastname 1',
    phoneNumber: '1234567890',
    email: 'user1@example.com',
    userType: 'doer',
  };
  const mockSkillsData = [
    {
      id: '1',
      name: 'Skill 1',
      description: 'Description 1',
      category: ['Category 1'],
      price: 100,
      cities: ['City 1'],
    },
  ];
  const mockSignup = vi.fn(() =>
    Promise.resolve({
      data: { user: mockUserData },
    })
  );
  const mockLogin = vi.fn(() =>
    Promise.resolve({
      data: { user: mockUserData, skills: mockSkillsData },
    })
  );
  const mockGetUser = vi.fn(() =>
    Promise.resolve({
      data: { user: mockUserData, skills: mockSkillsData },
    })
  );
  const mockUpdateSkills = vi.fn(() =>
    Promise.resolve({
      data: { skills: mockSkillsData },
    })
  );
  const mockDispatch = vi.fn();

  beforeEach(() => {
    (useDispatch as vi.mock).mockReturnValue(mockDispatch);
    (useSelector as vi.mock).mockReturnValueOnce(mockUserData);
    (useSelector as vi.mock).mockReturnValueOnce(mockSkillsData);
    (useLazyQuery as vi.mock).mockReturnValue([mockGetUser, {}]);
    (useMutation as vi.mock).mockReturnValueOnce([mockSignup, {}]);
    (useMutation as vi.mock).mockReturnValueOnce([mockLogin, {}]);
    (useMutation as vi.mock).mockReturnValueOnce([mockUpdateSkills, {}]);
    (Cookies.get as vi.mock).mockReturnValue('1');
  });

  it('should return correct user state', async () => {
    const { result } = renderHook(() => useUser());

    await waitFor(() => new Promise((resolve) => {
      setTimeout(() => resolve(true), 2000)
    }), {
      timeout: 3000
    });

    await waitFor(() => {
      expect(result.current.authChecking).toEqual(true);
      expect(result.current.signupLoading).toEqual(undefined);
      expect(result.current.loginLoading).toEqual(undefined);
      expect(result.current.skillsLoading).toEqual(undefined);
      expect(result.current.info).toEqual(mockUserData);
      expect(result.current.skills).toEqual(mockSkillsData);
    });
  });

  it('should register user correctly', async () => {
    const { result } = renderHook(() => useUser());

    const user = await result.current.register(mockUserData);

    expect(user).toEqual(mockUserData);
    expect(mockSignup).toHaveBeenCalledWith({ variables: mockUserData });
    expect(mockDispatch).toHaveBeenCalled();
    expect(Cookies.set).toHaveBeenCalledWith('userId', mockUserData.id);
  });

  it('should login user correctly', async () => {
    const { result } = renderHook(() => useUser());

    const credentials = { email: mockUserData.email, password: 'password' };
    const user = await result.current.login(credentials);

    expect(user).toEqual(mockUserData);
    expect(mockLogin).toHaveBeenCalledWith({ variables: credentials });
    expect(mockDispatch).toHaveBeenCalled();
    expect(Cookies.set).toHaveBeenCalledWith('userId', mockUserData.id);
  });

  it('should update skills correctly', async () => {
    const { result } = renderHook(() => useUser());

    const skills = await result.current.updateSkills(mockSkillsData);

    expect(skills).toEqual(mockSkillsData);
    expect(mockUpdateSkills).toHaveBeenCalledWith({
      variables: { userId: '1', skills: mockSkillsData },
    });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should logout user correctly', () => {
    const { result } = renderHook(() => useUser());

    act(() => {
      result.current.logout();
    });

    expect(Cookies.remove).toHaveBeenCalledWith('userId');
    expect(mockDispatch).toHaveBeenCalled();
  });
});
