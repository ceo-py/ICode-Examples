import { gql } from '@apollo/client';

export const PROJECT_FILE_QUERY = gql`
    query GetTaskProjectFile($input: getTaskProjectFileInput!) {
        getTaskProjectFile(input: $input) {
        content
        status {
            message
            code
        }
        }
    }
`;
