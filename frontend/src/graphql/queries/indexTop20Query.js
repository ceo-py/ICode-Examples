import { gql } from '@apollo/client';

export const INDEX_TOP_20_QUERY = gql`
    query GetIndexTop20 {
        getIndexTop20 {
            python
            javascript
            csharp
            java
            cpp
            totalSolutions
            status {
                message
                code
            }
        }
    }
`;
