import { gql } from 'apollo-server-core';

const commonExtensions = gql `
  type Vendor implements Node {
        id: ID!
		firstname:String!
		lastname:String!
		email:String!
		phone:String!
		companyname:String!
		companyaddr:String!
		companydesc:String
		companyphone:String!
		companycategory:[String!]!
		panvat:String!
		panvatnum:String!
		producttype:[String!]!
        assetid:String
        assetsource:String		
        createdAt: DateTime!
        updatedAt: DateTime!
    }
  
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
	
  input VendorAddInput{
	  firstname:String!
	  lastname:String!
	  email:String!
	  phone:String!
	  companyname:String!
	  companyaddr:String!
	  companydesc:String
	  companyphone:String!
	  companycategory:[String!]!
	  file: Upload
	  panvat:String!
	  panvatnum:String!
	  producttype:[String!]! 
  }
  
  input VendorAddInputShop{
	  firstname:String!
	  lastname:String!
	  email:String!
	  phone:String!
	  companyname:String!
	  companyaddr:String!
	  companydesc:String
	  companyphone:String!
	  companycategory:[String!]!
	  file: Upload!
	  panvat:String!
	  panvatnum:String!
	  producttype:[String!]! 
  }
  
`;

export const shopApiExtensions = gql`
    ${commonExtensions}
	
	extend type Mutation {
        addVendor(input:VendorAddInputShop!): Vendor!
    }
	
`;

export const adminApiExtensions = gql`
	${commonExtensions}
    
	input VendorUpdateInput{
	  id: ID!
	  firstname:String!
	  lastname:String!
	  email:String!
	  phone:String!
	  companyname:String!
	  companyaddr:String!
	  companydesc:String
	  companyphone:String!
	  companycategory:[String!]!
	  file: Upload
	  panvat:String!
	  panvatnum:String!
	  producttype:[String!]!
	}
	
	type VendorList implements PaginatedList {
     items: [Vendor!]!
     totalItems: Int!
    }
	
    extend type Query {
        Vendors(options: VendorListOptions): VendorList!
		Vendor(id:ID!):Vendor
    }
	
	extend type Mutation {
        addVendor(input:VendorAddInput!): Vendor!
		updateVendor(input:VendorUpdateInput!): Vendor!
		deleteVendor(id:ID!): Vendor!
		deleteAllVendors: Boolean!
    }
	input VendorListOptions
`;


