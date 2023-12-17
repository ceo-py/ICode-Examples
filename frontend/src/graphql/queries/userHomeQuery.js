import { gql } from '@apollo/client';

export const GET_USER_HOME_DETAILS = gql`
    query GetUserHome($input: getUserHomeUsername!) {
        getUserHome(input: $input) {
            languages {
                status {
                    message
                    code
                }
                python
                javascript
                csharp
                java
            }
            details {
                followers
                username
                email
                icon
                youtube
                github
                linkedin
                about
            }
            totalSolutions
        }
    }
`;
