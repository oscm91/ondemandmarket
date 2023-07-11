import styles from './order-service.module.scss';
import {
  NavigatorState,
  NotificationsState,
  ServiceState,
  UserState,
} from '@ondemandmarket/models';
import Job from '../../forms/job/job';
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
export interface OrderServiceProps {
  user: UserState;
  navigator: NavigatorState;
  service: ServiceState;
  notifications: NotificationsState;
}

export function OrderService({
  user,
  navigator,
  service,
  notifications,
}: OrderServiceProps) {
  return (
    <div className={styles['container']}>
      <Flex direction="column" gap="size-100">
        <View>
          <Header
            breadcrumbs={[
              { key: 'home', text: 'Home' },
              { key: 'orders', text: 'Orders' },
            ]}
            navigator={navigator}
            user={user}
          />
        </View>
        <Divider size="S"></Divider>
        <View>
          <IllustratedMessage>
            <Upload />
            <Heading>Create a New Service Request</Heading>
            <Content>Select services</Content>
          </IllustratedMessage>
        </View>
        <Job
          service={service}
          onFormSubmit={(values) => {
            if (user.info?.id) {
              service.createServices?.(values, user.info?.id).then((user) => {
                notifications.refreshNotifications?.();
                navigator.goToNotifications?.();
              });
            }
          }}
        />
      </Flex>
    </div>
  );
}

export default OrderService;
