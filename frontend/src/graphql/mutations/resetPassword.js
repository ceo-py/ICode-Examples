import { gql } from '@apollo/client';

export const RESET_PASSWORD_MUTATION = gql`
    mutation ResetPassword($input: resetPasswordInput!) {
        resetPassword(input: $input) {
        code
        message
        }
    }
`;

