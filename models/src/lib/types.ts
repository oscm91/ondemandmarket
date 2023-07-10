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
  skillsLoading: boolean;
  register?: (user: User) => Promise<User>;
  login?: (credential: Credentials) => Promise<User>;
  logout?: () => Promise<boolean>;
  updateSkills?: (skills: Skill[]) => Promise<Skill[]>;
  skills?: { [key: string]: Skill };
}
export interface NavigatorState {
  pathname: string;
  goToHome?: () => void;
  goToRegister?: () => void;
  goToLogin?: () => void;
  goToApp?: () => void;
  goToServices?: () => void;
  goToProfile?: () => void;
  goToOrders?: () => void;
  goToNotifications?: () => void;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface State {
  user: UserState;
  navigator: NavigatorState;
  service: ServiceState;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: string[];
  price?: number;
  cities?: string[];
  date?: number;
  doers?: string[];
}

export interface Cities {
  [key: string]: string;
}

export interface Doer {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  price: number;
  cities: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string[];
  date: number;
  cities: string[];
  doers?: Doer[];
}

export interface ServiceState {
  services?: { [key: string]: Service };
  servicesLoading: boolean;
  getServiceBySkills?: (skills: Service[]) => Promise<Service[]>;
  createServices?: (skills: Service[]) => Promise<Service[]>;
}
