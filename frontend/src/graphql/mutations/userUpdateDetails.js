import { gql } from '@apollo/client';

export const USER_UPDATE_MUTATION = gql`
    mutation UpdateUser($input: updateUserDetails!) {
        updateUser(input: $input) {
        code
        message
        }
    }
`;

