import { gql } from '@apollo/client';

export const FOLLOW_NOTIFICATION_QUERY = gql`
    query GetFollowNotification {
        getFollowNotification {
        result
        status {
            message
            code
        }
        }
    }
`;
