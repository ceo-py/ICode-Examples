import { gql } from '@apollo/client';

export const FIND_TOKEN_QUERY = gql`
    query GetToken {
        getToken {
            username
            iconUrl
            message
            code
        }
    }
`;
