import styles from './access.module.scss';
import Login from '../../forms/login/login';
import { NavigatorState, UserState } from '@ondemandmarket/models';

/* eslint-disable-next-line */
export interface AccessProps {
  user: UserState;
  navigator: NavigatorState;
}

export function Access({ user, navigator }: AccessProps) {
  return (
    <div className={styles['container']}>
      <Login
        navigator={navigator}
        onFormSubmit={(values) => {
          user.login?.(values).then((user) => {
            navigator.goToProfile?.();
          });
        }}
      />
    </div>
  );
}

export default Access;
