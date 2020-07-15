"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminApiExtensions = exports.shopApiExtensions = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const commonExtensions = apollo_server_core_1.gql `
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
exports.shopApiExtensions = apollo_server_core_1.gql `
    ${commonExtensions}
	
	extend type Mutation {
        addVendor(input:VendorAddInputShop!): Vendor!
    }
	
`;
exports.adminApiExtensions = apollo_server_core_1.gql `
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
//# sourceMappingURL=api-extensions.js.map