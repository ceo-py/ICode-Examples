import { gql } from '@apollo/client';

export const LIKE_NOTIFICATION_QUERY = gql`
    query GetLikeNotification {
        getLikeNotification {
        result
        status {
            message
            code
        }
        }
    }
`;
