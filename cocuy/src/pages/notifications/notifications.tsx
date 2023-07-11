import {
  Button,
  ButtonGroup,
  Content,
  Divider,
  Flex,
  Grid,
  Heading,
  IllustratedMessage,
  Item,
  ListView,
  Text,
  View,
} from '@adobe/react-spectrum';
import Upload from '@spectrum-icons/illustrations/Upload';
import { Header } from '../../components/header/header';
import {
  NavigatorState,
  NotificationsState,
  ServiceState,
  UserState,
} from '@ondemandmarket/models';
import { parseDate } from '@internationalized/date';
import styles from '../notifications/notifications.module.scss';

/* eslint-disable-next-line */
export interface NotificationsProps {
  user: UserState;
  navigator: NavigatorState;
  service: ServiceState;
  notifications: NotificationsState;
}

export function Notifications({
  user,
  navigator,
  service,
  notifications,
}: NotificationsProps) {
  return (
    <div className={styles['container']}>
      <Flex direction="column" gap="size-100">
        <View>
          <Header
            breadcrumbs={[
              { key: 'home', text: 'Home' },
              { key: 'notifications', text: 'Notifications' },
            ]}
            navigator={navigator}
            user={user}
          />
        </View>
        <Divider size="S"></Divider>
        <View>
          <IllustratedMessage>
            <Upload />
            <Heading>Manage Your Notifications</Heading>
            <Content>Review and manage your notifications</Content>
          </IllustratedMessage>
        </View>
        <Grid
          columns={{
            base: ['1fr'],
            S: ['1fr', '1fr'],
          }}
          rows={['auto', 'auto']}
          justifyContent="center"
          gap="size-100"
        >
          {notifications.list.map((notification, index) => (
            <View key={index}>
              <p>Service {index + 1}</p>
              <ListView
                selectionMode="none"
                aria-label={`Notification ${index + 1}`}
              >
                <Item hasChildItems textValue={notification.serviceName}>
                  <Text>{notification.serviceName}</Text>
                  <Text slot="description">
                    {notification.serviceDescription}
                  </Text>
                </Item>
                <Item textValue={notification.serviceName}>
                  <Text>Price: {notification.servicePrice}</Text>
                </Item>
                <Item textValue={notification.serviceStatus}>
                  <Text>Status: {notification.serviceStatus}</Text>
                </Item>
                <Item textValue={notification.serviceCategories?.join(',')}>
                  <Text>
                    Categories: {notification.serviceCategories?.join(',')}
                  </Text>
                </Item>
                <Item textValue={notification.serviceLocation}>
                  <Text>City: {notification.serviceLocation}</Text>
                </Item>
                <Item textValue={notification.serviceDate.toString()}>
                  <Text>
                    Date:
                    {parseDate(
                      new Date(notification.serviceDate)
                        .toISOString()
                        .split('T')[0]
                    ).toString()}
                  </Text>
                </Item>
                {user.info?.userType === 'client' ? (
                  <Item textValue={notification.doerName}>
                    <Text>Doer: {notification.doerName}</Text>
                  </Item>
                ) : (
                  (null as any)
                )}
                {user.info?.userType === 'doer' ? (
                  <Item textValue={notification.doerName}>
                    <Text>Client: {notification.doerName}</Text>
                  </Item>
                ) : (
                  (null as any)
                )}
                <Item textValue={notification.serviceName}>
                  <ButtonGroup>
                    <Button variant="primary">Approve</Button>
                    <Button variant="negative">Reject</Button>
                  </ButtonGroup>
                </Item>
              </ListView>
            </View>
          ))}
        </Grid>
      </Flex>
    </div>
  );
}

export default Notifications;
