import { gql } from '@apollo/client';

export const EDIT_COMMENT_MUTATION = gql`
    mutation EditComment($input: CommentDetails!) {
        editComment(input: $input) {
        code
        message
        }
    }
`;

