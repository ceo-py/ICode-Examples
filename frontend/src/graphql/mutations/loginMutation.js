import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      iconUrl
      username
      message
      isAuthenticated
      code
    }
  }
`;
