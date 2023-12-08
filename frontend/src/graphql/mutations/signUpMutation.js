import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
    mutation Register($input: AuthDetailInput!) {
        register(input: $input) {
        iconUrl
        code
        isAuthenticated
        message
        }
    }
`;
