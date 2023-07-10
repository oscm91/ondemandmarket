import { useDispatch, useSelector } from 'react-redux';
import {
  Credentials,
  Skill,
  SkillStore,
  UserState,
  UserStore,
} from '@ondemandmarket/models';
import {
  addUser,
  resetSkills,
  resetUser,
  settingSkills,
} from '@ondemandmarket/reducers';
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
      user {
        id
        firstName
        lastName
        phoneNumber
        email
        userType
      }
      skills {
        id
        name
        description
        category
        price
        cities
      }
    }
  }
`;

const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      user {
        id
        firstName
        lastName
        phoneNumber
        email
        userType
      }
      skills {
        id
        name
        description
        category
        price
        cities
      }
    }
  }
`;

const UPDATE_SKILLS_MUTATION = gql`
  mutation UpdateSkills($userId: ID!, $skills: [SkillInput]!) {
    updateSkills(userId: $userId, skills: $skills) {
      id
      name
      description
      category
      price
      cities
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
  const [
    updateSkills,
    { data: skillsData, loading: skillsLoading, error: skillsError },
  ] = useMutation(UPDATE_SKILLS_MUTATION);
  const dispatch = useDispatch();
  const user = useSelector((store: { user: UserStore }) => store.user);
  const skills = useSelector((store: { skills: SkillStore }) => {
    return (store.skills.items || []).reduce((result, item) => {
      return {
        ...result,
        [item.id]: item,
      };
    }, {});
  });

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

    if (userData && userData.skills && userData.skills.length) {
      dispatch(settingSkills(userData.skills));
    }
  }, [dispatch, userData]);

  return {
    authChecking,
    signupLoading,
    loginLoading,
    skillsLoading,
    info: user,
    skills,
    register: (newUser) => {
      return signup({ variables: newUser })
        .then((response) => {
          dispatch(addUser(response.data.user));
          Cookies.set('userId', response.data.user.id);
          return response.data.user;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    logout: () => {
      Cookies.remove('userId');
      dispatch(resetSkills());
      dispatch(resetUser());
      return Promise.resolve(true);
    },
    login: (credentials: Credentials) => {
      return login({ variables: credentials })
        .then((response) => {
          dispatch(addUser(response.data.user));
          dispatch(settingSkills(response.data.skills));
          Cookies.set('userId', response.data.user.id);
          return response.data.user;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    updateSkills: (skills: Skill[]) => {
      const userId = Cookies.get('userId'); // Obtén el ID del usuario actual
      if (!userId) {
        console.error('No user ID found');
        return Promise.resolve([]);
      }

      return updateSkills({ variables: { userId, skills } }) // Envía el ID del usuario y las habilidades
        .then((response) => {
          dispatch(settingSkills(response.data.skills)); // Usa la acción para actualizar el estado
          return response.data.skills;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  };
};
