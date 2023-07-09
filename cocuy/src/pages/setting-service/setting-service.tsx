import styles from './setting-service.module.scss';
import { NavigatorState, UserState } from "@cocodemy/models";
import Services from "../../forms/services/services";

/* eslint-disable-next-line */
export interface SettingServiceProps {
  user: UserState;
  navigator: NavigatorState;
}

export function SettingService({ user, navigator }: SettingServiceProps) {
  return (
    <div className={styles['container']}>
      <Services
        onFormSubmit={(values) => {
          console.log({
            ...values,
          });
          debugger
          /*user.settingServices?.(values).then((user) => {
            navigator.goToApp?.();
          });*/
        }}
      />
    </div>
  );
}

export default SettingService;
