import styles from './access.module.scss';
import Login from "../../forms/login/login";
import { NavigatorState, UserState } from "@cocodemy/models";

/* eslint-disable-next-line */
export interface AccessProps {
  user: UserState;
  navigator: NavigatorState;
}

export function Access({ user, navigator }: AccessProps) {
  return (
    <div className={styles['container']}>
      <Login
        onFormSubmit={(values) => {
          console.log({
            ...values,
          });
          user.login(values).then((user) => {
            navigator.goToApp();
          });
        }}
      />
    </div>
  );
}

export default Access;
