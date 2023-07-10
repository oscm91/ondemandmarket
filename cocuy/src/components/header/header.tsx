import React from 'react';
import { NavigatorState, UserState } from '@ondemandmarket/models';
import {
  ActionButton,
  Breadcrumbs,
  Flex,
  Item,
  Menu,
  MenuTrigger,
  Text,
} from '@adobe/react-spectrum';
import ShowMenu from '@spectrum-icons/workflow/ShowMenu';

export interface HeaderProps {
  breadcrumbs: { key: string; text: string }[];
  user: UserState;
  navigator: NavigatorState;
}

export const Header: React.FC<HeaderProps> = ({
  breadcrumbs,
  navigator,
  user,
}) => {
  return (
    <Flex justifyContent="space-between">
      <Breadcrumbs>
        {breadcrumbs.map(({ key, text }) => (
          <Item key={key} textValue={key}>
            {text}
          </Item>
        ))}
      </Breadcrumbs>
      <MenuTrigger>
        <ActionButton>
          <ShowMenu></ShowMenu>
          <Text>Options</Text>
        </ActionButton>
        <Menu
          onAction={(key) => {
            if (key === 'profile') {
              navigator.goToProfile?.();
            } else if (key === 'settingServices') {
              navigator.goToServices?.();
            } else if (key === 'notifications') {
              navigator.goToNotifications?.();
            } else if (key === 'orders') {
              navigator.goToOrders?.();
            } else if (key === 'logout') {
              user.logout?.().then(() => {
                navigator.goToHome?.();
              });
            }
          }}
        >
          <Item key="profile" textValue="profile">
            Profile
          </Item>
          {user.info?.userType === 'doer' ? (
            <Item key="settingServices" textValue="settingServices">
              Skills
            </Item>
          ) : (
            (null as any)
          )}

          <Item key="notifications" textValue="notifications">
            Notifications
          </Item>
          {user.info?.userType === 'client' ? (
            <Item key="orders" textValue="orders">
              Orders
            </Item>
          ) : (
            (null as any)
          )}

          <Item key="logout" textValue="logout">
            Logout
          </Item>
        </Menu>
      </MenuTrigger>
    </Flex>
  );
};

export default Header;
