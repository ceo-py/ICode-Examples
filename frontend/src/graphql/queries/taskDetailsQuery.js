import { gql } from '@apollo/client';

export const TASK_DETAILS_QUERY = gql`
    query GetTaskSingleDetails($input: TaskSingleId!) {
        getTaskSingleDetails(input: $input) {
        like
        likeCounter
        follow
        followCounter
        content
        taskName
        taskId
        icon
        comments
        video
        userDetails {
            id
            username
        }
        status {
            message
            code
        }
        }
    }
`;
