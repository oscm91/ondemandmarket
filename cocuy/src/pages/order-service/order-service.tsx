import styles from "./order-service.module.scss";
import { NavigatorState, ServiceState, UserState } from "@cocodemy/models";
import Job from "../../forms/job/job";
import { Content, Divider, Flex, Heading, IllustratedMessage, View } from "@adobe/react-spectrum";
import Upload from "@spectrum-icons/illustrations/Upload";
import { Header } from "../../components/header/header";

/* eslint-disable-next-line */
export interface OrderServiceProps {
  user: UserState;
  navigator: NavigatorState;
  service: ServiceState
}

export function OrderService({ user, navigator, service }: OrderServiceProps) {
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
            <Content>
              Select services
            </Content>
          </IllustratedMessage>
        </View>
        <Job
          service={service}
          onFormSubmit={(values) => {
            service.createServices?.(values).then((user) => {
              navigator.goToNotifications?.();
            });
          }}
        />
      </Flex>
    </div>
  );
}

export default OrderService;
