import styles from './setting-service.module.scss';
import { NavigatorState, UserState } from "@cocodemy/models";
import Services from "../../forms/services/services";
import {
  ActionButton,
  Breadcrumbs,
  Content,
  Divider,
  Flex,
  Text,
  Heading,
  IllustratedMessage,
  Item, Menu, MenuTrigger,
  View
} from "@adobe/react-spectrum";
import Upload from '@spectrum-icons/illustrations/Upload';
import ShowMenu from '@spectrum-icons/workflow/ShowMenu';

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
          <Flex justifyContent="space-between">
            <Breadcrumbs>
              <Item key="home">Home</Item>
              <Item key="skills">Skills</Item>
              <Item key="settings">Settings</Item>
            </Breadcrumbs>
            <MenuTrigger>
              <ActionButton>
                <ShowMenu></ShowMenu>
                <Text>Options</Text>
              </ActionButton>
              <Menu onAction={(key) => alert(key)}>
                <Item key="cut">Home</Item>
                <Item key="copy">Skills</Item>
                <Item key="paste">Notifications</Item>
                <Item key="replace">Orders</Item>
              </Menu>
            </MenuTrigger>
          </Flex>
        </View>
        <Divider size="S"></Divider>
        <View>
          <IllustratedMessage>
            <Upload />
            <Heading>Complete Your Skill </Heading>
            <Content>
              Select a edit skills
            </Content>
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
