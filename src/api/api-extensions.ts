import { gql } from 'apollo-server-core';

const commonExtensions = gql `
  type Feedback implements Node {
        id: ID!
		name:String
		email:String
		phone:String
		feedback: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
  input FeedbackAddInput{
	  name:String
	  email:String
      phone:String
	  feedback: String!
  }
`;

export const shopApiExtensions = gql`
    ${commonExtensions}
	
	extend type Mutation {
        addFeedback(input:FeedbackAddInput!): Feedback!
    }
	
`;

export const adminApiExtensions = gql`
	${commonExtensions}
    
	input FeedbackUpdateInput{
	  id: ID!
	  name:String
	  email:String
      phone:String
	  feedback: String!
	}
	
	type FeedbackList implements PaginatedList {
     items: [Feedback!]!
     totalItems: Int!
    }
	
    extend type Query {
        Feedbacks(options: FeedbackListOptions): FeedbackList!
		Feedback(id:ID!):Feedback
    }
	
	extend type Mutation {
        addFeedback(input:FeedbackAddInput!): Feedback!
		updateFeedback(input:FeedbackUpdateInput!): Feedback!
		deleteFeedback(id:ID!): Feedback!
		deleteAllFeedbacks: Boolean!
    }
	input FeedbackListOptions
`;


