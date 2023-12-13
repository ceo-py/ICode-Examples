import { gql } from '@apollo/client';

export const DELETE_COMMENT_MUTATION = gql`
    mutation DeleteComment($input: TaskSingleId!) {
        deleteComment(input: $input) {
        code
        message
        }
    }
`;
