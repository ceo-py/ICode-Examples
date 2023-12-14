import { gql } from '@apollo/client';

export const LIKE_TASK_MUTATION = gql`
    mutation LikeTask($input: TaskSingleId!) {
        likeTask(input: $input) {
        code
        message
        }
    }
`;
