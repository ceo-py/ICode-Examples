import { gql } from '@apollo/client';

export const TASK_SEARCH_QUERY = gql`
    query GetTaskGlobal($input: TaskDetailGlobal!) {
        getTaskGlobal(input: $input) {
        result
        status {
            message
            code
        }
        }
    }
`;
