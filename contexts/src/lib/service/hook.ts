import { Service, ServiceState } from '@cocodemy/models';

import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { settingSkills } from '@cocodemy/reducers';

const GET_SERVICES_BY_SKILLS_QUERY = gql`
  query GetServicesBySkills($services: [String]!) {
    getServicesBySkills(services: $services) {
      id
      name
      description
      category
      date
      cities
      doers {
        id
        firstName
        lastName
        phoneNumber
        email
        price
      }
    }
  }
`;

const CREATE_SERVICES_MUTATION = gql`
  mutation CreateServices($services: [ServiceInput]!) {
    createServices(services: $services) {
      id
      name
      description
      category
      date
      cities
      doers {
        id
        firstName
        lastName
        phoneNumber
        email
        price
      }
    }
  }
`;

export const useService = (): ServiceState => {
  const [
    queryServicesBySkills,
    { data: servicesData, loading: servicesLoading, error: servicesError },
  ] = useLazyQuery(GET_SERVICES_BY_SKILLS_QUERY);

  const [
    mutationCreateServices,
    { data: createServicesData, loading: createServicesLoading, error: createServicesError },
  ] = useMutation(CREATE_SERVICES_MUTATION);

  const getServiceBySkills = (servicesInfo: Service[]) => {
    return queryServicesBySkills({ variables: { services: servicesInfo } })
      .then((response) => {
        return response.data.services;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createServices = (services: Service[]) => {
    return mutationCreateServices({ variables: { services } })
      .then((response) => {
        return response.data.createServices;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    servicesLoading,
    getServiceBySkills,
    createServices,
  };
};
