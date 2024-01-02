import { gql } from '@apollo/client';

export const RESET_PASSWORD = gql`
    query GetUsernameAndEmail($input: UsernameAndEmail!) {
        getUsernameAndEmail(input: $input) {
            message
            code
        }
    }
`;




