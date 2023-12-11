import { gql } from '@apollo/client';

export const TASK_DETAILS_QUERY = gql`
    query GetTaskSingleDetails($input: TaskSingleId!) {
        getTaskSingleDetails(input: $input) {
        content
        status {
            message
            code
        }
        }
    }
`;
