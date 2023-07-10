import styles from './profile.module.scss';
import { NavigatorState, UserState } from '@cocodemy/models';
import {
  ActionButton,
  Breadcrumbs,
  Content,
  Divider,
  Flex,
  Text,
  Heading,
  IllustratedMessage,
  Item,
  Menu,
  TableHeader,
  MenuTrigger,
  TableView,
  TableBody,
  Grid,
  ListView,
  Column,
  Row,
  Cell,
  View,
  Badge,
} from '@adobe/react-spectrum';
import RealTimeCustomerProfile from '@spectrum-icons/workflow/RealTimeCustomerProfile';
import ShowMenu from '@spectrum-icons/workflow/ShowMenu';
import DevicePhone from '@spectrum-icons/workflow/DevicePhone';
import EmailCheck from '@spectrum-icons/workflow/EmailCheck';
import Location from '@spectrum-icons/workflow/Location';
import UserActivity from '@spectrum-icons/workflow/UserActivity';

/* eslint-disable-next-line */
export interface ProfileProps {
  user: UserState;
  navigator: NavigatorState;
}

export function Profile({ user, navigator }: ProfileProps) {
  return (
    <div className={styles['container']}>
      <Flex direction="column" gap="size-100">
        <View>
          <Flex justifyContent="space-between">
            <Breadcrumbs>
              <Item key="home" textValue="home">Home</Item>
              <Item key="profile" textValue="profile">Profile</Item>
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
                <Item key="profile" textValue="profile">Profile</Item>
                <Item key="settingServices" textValue="settingServices">Skills</Item>
                <Item key="notifications" textValue="notifications">Notifications</Item>
                <Item key="orders" textValue="orders">Orders</Item>
                <Item key="logout" textValue="logout">Logout</Item>
              </Menu>
            </MenuTrigger>
          </Flex>
        </View>
        <Divider size="S"></Divider>
        <View>
          <IllustratedMessage>
            <RealTimeCustomerProfile size="XXL" />
            <Heading>Profile info </Heading>
          </IllustratedMessage>
        </View>
        <Grid
          areas={{
            base: ['info', 'options'],
            M: ['info', 'options'],
            L: ['info options'],
          }}
          columns={{
            L: ['1fr', '1fr'],
          }}
          rows={{
            L: ['auto', 'auto'],
          }}
          gap="size-200"
        >
          <View>
            <ListView
              selectionMode="none"
              aria-label="Static ListView items example"
            >
              <Item key="usertype" textValue="usertype">
                <UserActivity aria-label="Done" />
                <Text>{user.info?.userType}</Text>
                <Text slot="description">User Type</Text>
              </Item>
              <Item key="firstname" textValue="firstname">
                <Location aria-label="Done" />
                <Text>{user.info?.firstName}</Text>
                <Text slot="description">First Name</Text>
              </Item>
              <Item key="lastname" textValue="lastname">
                <Location aria-label="Done" />
                <Text>{user.info?.lastName}</Text>
                <Text slot="description">Last Name</Text>
              </Item>
              <Item key="email" textValue="email">
                <EmailCheck aria-label="Done" />
                <Text>{user.info?.email}</Text>
                <Text slot="description">Email</Text>
              </Item>
              <Item key="phonenumber" textValue="phonenumber">
                <DevicePhone aria-label="Done" />
                <Text>{user.info?.phoneNumber}</Text>
                <Text slot="description">Phone Number</Text>
              </Item>
            </ListView>
          </View>
          <View width="size-3000" alignSelf="center" justifySelf="center">
            <ListView
              selectionMode="none"
              aria-label="Static ListView items example"
              selectionStyle="highlight"
              isQuiet
              onAction={(key) => {
                if (key === 'profile') {
                  navigator.goToProfile?.();
                } else if (key === 'settingServices') {
                  navigator.goToServices?.();
                } else if (key === 'notifications') {
                  navigator.goToNotifications?.();
                } else if (key === 'orders') {
                  navigator.goToOrders?.();
                }
              }}
            >
              <Item key="profile" textValue="profile" hasChildItems>
                <UserActivity />
                <Text>Profile</Text>
                <Text slot="description">See my information</Text>
              </Item>
              {user.info?.userType === 'doer' ? (
                <Item key="settingServices" textValue="settingServices" hasChildItems>
                  <UserActivity />
                  <Text>Skills</Text>
                  <Text slot="description">Update my skills</Text>
                </Item>
              ) : null}
              <Item key="notifications" textValue="notifications" hasChildItems>
                <UserActivity />
                <Text>Notifications</Text>
                <Text slot="description">See my notifications</Text>
              </Item>
              {user.info?.userType === 'client' ? (
                <Item key="orders" textValue="orders" hasChildItems>
                  <UserActivity />
                  <Text>Orders</Text>
                  <Text slot="description">Create a service order</Text>
                </Item>
              ) : null}
            </ListView>
          </View>
        </Grid>
      </Flex>
    </div>
  );
}

export default Profile;
