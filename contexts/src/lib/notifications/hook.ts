import { gql, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { NotificationsState } from '@ondemandmarket/models';

const GET_USER_NOTIFICATIONS_QUERY = gql`
  query GetUserNotifications($userId: ID!) {
    getUserNotifications(userId: $userId) {
      serviceId
      serviceName
      serviceCategories
      serviceDate
      serviceDescription
      serviceLocation
      servicePrice
      serviceStatus
    }
  }
`;

export const useNotifications = (): NotificationsState => {
  const [notificationsList, setNotificationsList] = useState([]);
  const [
    queryUserNotifications,
    {
      data: notificationsData,
      loading: notificationsLoading,
      error: notificationsError,
    },
  ] = useLazyQuery(GET_USER_NOTIFICATIONS_QUERY);

  useEffect(() => {
    const userId = Cookies.get('userId');
    if (userId) {
      queryUserNotifications({ variables: { userId } }).then(({ data }) => {
        setNotificationsList(data.notifications || []);
      });
    }
  }, [notificationsData?.getUserNotifications, queryUserNotifications]);

  const refreshNotifications = () => {
    const userId = Cookies.get('userId');
    if (userId) {
      queryUserNotifications({ variables: { userId } }).then(({ data }) => {
        setNotificationsList(data.notifications || []);
      });
    }
  };

  return {
    list: notificationsList,
    notificationsLoading: notificationsLoading,
    refreshNotifications: refreshNotifications,
  };
};
