import { gql } from '@apollo/client';

export const USER_DELETE_MUTATION = gql`
  mutation DeleteUser {
    deleteUser {
      message
      code
    }
  }
`;
