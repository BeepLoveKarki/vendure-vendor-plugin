import gql from 'graphql-tag';

export const VENDOR_FRAGMENT = gql`
    fragment Vendors on Vendor {
        id
		firstname
		lastname
		email
		phone
		companyname
		companyaddr
		companydesc
		companyphone
		companycategory
		panvat
		panvatnum
		producttype
        uuid		
        createdAt
        updatedAt
    }
`;
