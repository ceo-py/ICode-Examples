import { gql } from '@apollo/client';

export const CREATE_COMMENT_MUTATION = gql`
    mutation CreateComment($input: CommentDetails!) {
        createComment(input: $input) {
        code
        message
        }
    }
`;
