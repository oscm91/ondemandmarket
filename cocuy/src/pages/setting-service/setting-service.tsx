import styles from './setting-service.module.scss';
import { NavigatorState, UserState } from '@ondemandmarket/models';
import Services from '../../forms/services/services';
import {
  Content,
  Divider,
  Flex,
  Heading,
  IllustratedMessage,
  View,
} from '@adobe/react-spectrum';
import Upload from '@spectrum-icons/illustrations/Upload';
import { Header } from '../../components/header/header';

/* eslint-disable-next-line */
export interface SettingServiceProps {
  user: UserState;
  navigator: NavigatorState;
}

export function SettingService({ user, navigator }: SettingServiceProps) {
  return (
    <div className={styles['container']}>
      <Flex direction="column" gap="size-100">
        <View>
          <Header
            breadcrumbs={[
              { key: 'home', text: 'Home' },
              { key: 'skill', text: 'Skills' },
            ]}
            navigator={navigator}
            user={user}
          />
        </View>
        <Divider size="S"></Divider>
        <View>
          <IllustratedMessage>
            <Upload />
            <Heading>Complete Your Skill </Heading>
            <Content>Select a edit skills</Content>
          </IllustratedMessage>
        </View>
        <Services
          initialSkills={user.skills}
          onFormSubmit={(values) => {
            user.updateSkills?.(values).then((user) => {
              navigator.goToProfile?.();
            });
          }}
        />
      </Flex>
    </div>
  );
}

export default SettingService;
