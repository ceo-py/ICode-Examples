import { gql } from '@apollo/client';

export const GET_USER_DETAILS = gql`
    query GetUser {
        getUser {
            userDetails {
                followers
                username
                icon
                email
                youtube
                github
                linkedin
                about
            }
            status {
                message
                code
            }
        }
    }
`;
