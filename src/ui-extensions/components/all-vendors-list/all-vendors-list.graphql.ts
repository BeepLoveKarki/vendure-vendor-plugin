import gql from 'graphql-tag';

import { FEEDBACK_FRAGMENT } from '../../common/fragments.graphql';

export const GET_ALL_FEEDBACKS = gql`
    query GetAllFeedbacks($options: FeedbackListOptions){
		Feedbacks(options: $options){
			items{
			...Feedbacks
			}
			totalItems
       }
    }
	${FEEDBACK_FRAGMENT}
`;


export const DELETE_FEEDBACK = gql`
   mutation DeleteFeedback($input:ID!){
      deleteFeedback(id:$input){
	     ...Feedbacks 
	  }
   }
   ${FEEDBACK_FRAGMENT}
`;