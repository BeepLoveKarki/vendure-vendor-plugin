import gql from 'graphql-tag';

export const FEEDBACK_FRAGMENT = gql`
    fragment Feedbacks on Feedback {
        id
		name
	    email
        phone
	    feedback
        createdAt
        updatedAt
    }
`;
