export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'doer' | 'client' | '';
}

export interface UserStore extends User {
  _: string;
}

export interface SkillStore {
  items?: Skill[];
}

export interface UserState {
  info?: User;
  authChecking: boolean;
  signupLoading: boolean;
  loginLoading: boolean;
  register?: (user: User) => Promise<User>;
  login?: (credential: Credentials) => Promise<User>;
  updateSkills?: (skills: Skill[]) => Promise<Skill[]>;
  skills?: { [key: string]: Skill };
}
export interface NavigatorState {
  pathname: string;
  goToHome?: () => void;
  goToRegister?: () => void;
  goToLogin?: () => void;
  goToApp?: () => void;
  gotoServices?: () => void;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface State {
  user: UserState;
  navigator: NavigatorState;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: string[];
  price?: number;
  cities?: string[];
}

export interface Cities {
  [key: string]: string;
}
