import { gql } from '@apollo/client';

export const NAV_MENU_QUERY = gql`
    query GetUser {
        getUser {
            userDetails {
                username
                icon
            }
        }
    }
`;
