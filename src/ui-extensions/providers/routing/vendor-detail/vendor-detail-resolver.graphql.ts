import gql from 'graphql-tag';

import { FEEDBACK_FRAGMENT } from '../../../common/fragments.graphql';

export const GET_FEEDBACK = gql`
  query GetFeedback($id: ID!) {
    Feedback(id: $id) {
      ...Feedbacks
    }
  }
  ${FEEDBACK_FRAGMENT}
`;