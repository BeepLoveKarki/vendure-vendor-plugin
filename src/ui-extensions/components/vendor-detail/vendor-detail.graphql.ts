import gql from 'graphql-tag';

import { VENDOR_FRAGMENT } from '../../common/fragments.graphql';

export const UPDATE_VENDOR = gql`
    mutation UpdateVendor($input: VendorUpdateInput!) {
        updateVendor(input: $input) {
            ...Vendors
        }
    }
    ${VENDOR_FRAGMENT}
`;

export const CREATE_VENDOR = gql`
    mutation CreateVendor($input: VendorAddInput!) {
        addVendor(input: $input) {
            ...Vendors
        }
    }
    ${VENDOR_FRAGMENT}
`;

