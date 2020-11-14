import gql from 'graphql-tag';

import { VENDOR_FRAGMENT } from '../../../common/fragments.graphql';

export const GET_VENDOR = gql`
  query GetVendor($id: ID!) {
    Vendor(id: $id) {
      ...Vendors
    }
  }
  ${VENDOR_FRAGMENT}
`;