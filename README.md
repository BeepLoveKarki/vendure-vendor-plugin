# Vendure Feedback Plugin

This is a plugin for the [Vendure e-commerce framework](https://www.vendure.io/) designed for recording feedback from customers.

After setting of your vendure project, you can just use this plugin via npm install:

```npm install vendure-feedback-plugin```

and then include it to vendure-config file as below:

```

import { FeedbackPlugin } from "vendure-feedback-plugin";
...
export const config: VendureConfig = {
  ...
  plugins: [
    ...,
	FeedbackPlugin
  ]
}

```

Optionally for Admin UI extensio, you may just add via following manner:

```
AdminUiPlugin.init({
  ...	
	app: compileUiExtensions({
	 outputPath: path.join(__dirname, '....'),
	 ...
	 extensions:[
		...
		 FeedbackPlugin.uiExtensions,
		...
      ]
	}),
   ...
  })

```

The types, inputs and mutations updated after installing the plugin are:

# Main Type

```
type Feedback implements Node {
  id: ID!
  name:String
  email:String
  phone:String
  feedback: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}
	
```

# Inputs

```
input FeedbackAddInput{
  name:String
  email:String
  phone:String
  feedback: String!
}
  
input FeedbackUpdateInput{
  id: ID!
  name:String
  email:String
  phone:String
  feedback: String!
}
  
input FeedbackListOptions
```

# Shop Mutation

```
extend type Mutation {
  addFeedback(input:FeedbackAddInput!): Feedback!
}	
```

# Admin Type, Query and Mutation

```
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

```
