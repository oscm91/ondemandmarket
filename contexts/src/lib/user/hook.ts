import { useDispatch, useSelector } from 'react-redux';
import { UserState, UserStore, Credentials } from '@cocodemy/models';
import { addUser } from '@cocodemy/reducers';
import Cookies from 'js-cookie';

import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

const SIGNUP_MUTATION = gql`
  mutation Signup(
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $email: String!
    $password: String!
    $userType: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      email: $email
      password: $password
      userType: $userType
    ) {
      id
      firstName
      lastName
      phoneNumber
      email
      userType
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
      phoneNumber
      email
      userType
    }
  }
`;

const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      phoneNumber
      email
      userType
    }
  }
`;

export const useUser = (): UserState => {
  const [authChecking, setAuthChecking] = useState(true);
  const [signup, { data, loading: signupLoading, error }] =
    useMutation(SIGNUP_MUTATION);
  const [login, { data: loginData, loading: loginLoading, error: loginError }] =
    useMutation(LOGIN_MUTATION);
  const [getUser, { data: userData }] = useLazyQuery(USER_QUERY);
  const dispatch = useDispatch();
  const user = useSelector((store: { user: UserStore }) => store.user);

  useEffect(() => {
    const userId = Cookies.get('userId');
    if (userId) {
      // Si hay un userId, realizar la consulta para obtener la información del usuario
      getUser({ variables: { id: userId } }).then();
    } else {
      setAuthChecking(false);
    }
  }, [getUser]);

  useEffect(() => {
    if (userData && userData.user) {
      dispatch(addUser(userData.user));
      setAuthChecking(false);
    }
  }, [dispatch, userData]);

  return {
    authChecking,
    signupLoading,
    loginLoading,
    info: user,
    register: (newUser) => {
      return signup({ variables: newUser })
        .then((response) => {
          console.log(response.data);
          dispatch(addUser(response.data.user));
          Cookies.set('userId', response.data.user.id);
          return response.data.user;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    login: (credentials: Credentials) => {
      return login({ variables: credentials })
        .then((response) => {
          console.log(response.data);
          dispatch(addUser(response.data.login));
          Cookies.set('userId', response.data.login.id);
          return response.data.login;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  };
};
