import { useDispatch, useSelector } from 'react-redux';
import { UserState, UserStore } from '@cocodemy/models';
import { addUser } from '@cocodemy/reducers';

import { gql, useMutation } from '@apollo/client';

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
export const useUser = (): UserState => {
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION);
  const dispatch = useDispatch();
  const user = useSelector((store: { user: UserStore }) => store.user);

  return {
    info: user,
    register: (newUser) => {
      return signup({ variables: newUser })
        .then((response) => {
          console.log(response.data);
          dispatch(addUser(response.data.user));
          return response.data.user;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  };
};
