import { gql } from '@apollo/client';

export const TASK_DELETE_MUTATION = gql`
    mutation DeleteTask($input: TaskSingleId!) {
        deleteTask(input: $input) {
        code
        message
        }
    }
`;
