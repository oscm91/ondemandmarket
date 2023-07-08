export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
}

export interface UserStore extends User {
  _: string;
}

export interface UserState {
  info: User;
  register: (user: User) => Promise<User>;
}
export interface NavigatorState {
  pathname: string,
  goToHome: () => void;
  goToRegister: () => void;
  goToLogin: () => void;
  goToApp: () => void;
}

export interface State {
  user: UserState;
  navigator: NavigatorState;
}