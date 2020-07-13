import gql from 'graphql-tag';

import { VENDOR_FRAGMENT } from '../../common/fragments.graphql';

export const GET_ALL_VENDORS = gql`
    query GetAllVendors($options: VendorListOptions){
		Vendors(options: $options){
			items{
			...Vendors
			}
			totalItems
       }
    }
	${VENDOR_FRAGMENT}
`;


export const DELETE_VENDOR = gql`
   mutation DeleteVendor($input:ID!){
      deleteVendor(id:$input){
	     ...Vendors 
	  }
   }
   ${VENDOR_FRAGMENT}
`;