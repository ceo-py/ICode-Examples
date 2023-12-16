import { gql } from '@apollo/client';

export const CREATE_REPORT_MUTATION = gql`
    mutation CreateReport($input: CreateReportInput!) {
        createReport(input: $input) {
            message
            code
        }
    }
`;
