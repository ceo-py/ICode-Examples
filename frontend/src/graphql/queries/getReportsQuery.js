import { gql } from '@apollo/client';

export const REPORT_QUERY = gql`
    query GetReport {
        getReport {
        result
        status {
            message
            code
        }
        }
    }
`;
