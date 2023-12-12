import { gql } from '@apollo/client';

export const TASK_DETAILS_QUERY = gql`
    query GetTaskSingleDetails($input: TaskSingleId!) {
        getTaskSingleDetails(input: $input) {
        like
        follow
        content
        taskName
        taskId
        icon
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
