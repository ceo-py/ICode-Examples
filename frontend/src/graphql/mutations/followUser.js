import { gql } from '@apollo/client';

export const FOLLOW_USER_MUTATION = gql`
    mutation FollowUser($input: TaskSingleId!) {
        followUser(input: $input) {
        code
        message
        }
    }
`;
