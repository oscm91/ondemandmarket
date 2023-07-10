import styles from "./register.module.scss";
import Signup from "../../forms/signup/signup";
import { NavigatorState, UserState } from "@cocodemy/models";

/* eslint-disable-next-line */
export interface RegisterProps {
  user: UserState;
  navigator: NavigatorState;
}

export function Register({ user, navigator }: RegisterProps) {
  return (
    <div className={styles['container']}>
      <Signup
        navigator={navigator}
        onFormSubmit={(values) => {
          user.register?.(values).then((user) => {
            if (user.userType === 'client') {
              navigator.goToProfile?.();
            } else {
              navigator.goToServices?.();
            }
          });
        }}
      />
    </div>
  );
}

export default Register;
