import { gql } from '@apollo/client';

export const TASK_DETAILS_FOR_UPDATE_QUERY = gql`
    query GetTaskDetailsForUpdate($input: TaskSingleId!) {
        getTaskDetailsForUpdate(input: $input) {
        taskName
        language
        course
        module
        videoLink
        githubLink
        status {
            message
            code
        }
        }
    }
`;
