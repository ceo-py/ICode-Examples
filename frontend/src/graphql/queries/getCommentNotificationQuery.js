import { gql } from '@apollo/client';

export const COMMENT_NOTIFICATION_QUERY = gql`
    query GetCommentNotification {
        getCommentNotification {
        result
        status {
            message
            code
        }
        }
    }
`;
