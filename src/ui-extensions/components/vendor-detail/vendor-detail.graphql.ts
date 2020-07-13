import gql from 'graphql-tag';

import { FEEDBACK_FRAGMENT } from '../../common/fragments.graphql';

export const UPDATE_FEEDBACK = gql`
    mutation UpdateFeedback($input: FeedbackUpdateInput!) {
        updateFeedback(input: $input) {
            ...Feedbacks
        }
    }
    ${FEEDBACK_FRAGMENT}
`;

export const CREATE_FEEDBACK = gql`
    mutation CreateFeedback($input: FeedbackAddInput!) {
        addFeedback(input: $input) {
            ...Feedbacks
        }
    }
    ${FEEDBACK_FRAGMENT}
`;