import { gql } from '@apollo/client';

export const GET_USER_DETAILS = gql`
    query GetUser {
        getUser {
            userDetails {
                username
                email
                icon
                youtube
                github
                linkedin
                about
                followers
            }
            status {
                message
                code
            }
        }
    }
`;
