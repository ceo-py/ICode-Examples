import { gql } from '@apollo/client';

export const TASK_CREATE_MUTATION = gql`
    mutation UploadTask($input: TaskDetails!) {
        uploadTask(input: $input) {
        code
        message
        }
    }
`;
