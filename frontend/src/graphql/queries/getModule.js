import { gql } from '@apollo/client';

export const GET_MODEL_QUERY = gql`
    query GetModuleExamples($input: getModuleExamplesInput!) {
        getModuleExamples(input: $input) {
            result
            status {
                message
                code
            }
        }
    }
`;





