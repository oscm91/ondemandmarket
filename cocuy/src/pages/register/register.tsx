import styles from './register.module.scss';
import Signup from '../../forms/signup/signup';
import { UserState, NavigatorState } from '@cocodemy/models';

/* eslint-disable-next-line */
export interface RegisterProps {
  user: UserState | undefined;
  navigator: NavigatorState | undefined;
}

export function Register({ user, navigator }: RegisterProps) {
  return (
    <div className={styles['container']}>
      <Signup
        onFormSubmit={(values) => {
          console.log({
            ...values,
          });
          user?.register(values).then((user) => {
            navigator?.goToApp();
          });
        }}
      />
    </div>
  );
}

export default Register;
