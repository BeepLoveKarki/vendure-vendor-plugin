# Vendure Vendor Plugin

This is a plugin for the [Vendure e-commerce framework](https://www.vendure.io/) designed for recording data of vendors.

After setting of your vendure project, you can just use this plugin via npm install:

```npm install vendure-vendor-plugin```

and then include it to vendure-config file as below:

```

import { VendorPlugin } from "vendure-vendor-plugin";
...
export const config: VendureConfig = {
  ...
  plugins: [
    ...,
	VendorPlugin
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
		 VendorPlugin.uiExtensions,
		...
      ]
	}),
   ...
  })

```

The types, inputs and mutations updated after installing the plugin are:

# Main Type

```
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
```

# Inputs

```
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
  
input VendorListOptions
```

# Shop Mutation

```
extend type Mutation {
  addVendor(input:VendorAddInputShop!): Vendor!
}	
```

# Admin Type, Query and Mutation

```
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

```
