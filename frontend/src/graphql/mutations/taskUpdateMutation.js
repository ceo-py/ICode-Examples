import { gql } from '@apollo/client';

export const TASK_UPDATE_MUTATION = gql`
    mutation UpdateTask($input: TaskDetails!) {
        updateTask(input: $input) {
        code
        message
        }
    }
`;
