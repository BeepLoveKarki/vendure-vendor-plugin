import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, BaseEntityResolver } from '@vendure/admin-ui/core';
import { take } from 'rxjs/operators';
import { GET_VENDOR } from './vendor-detail-resolver.graphql';

import { 
  GetVendorQuery,
  VendorsFragment,
  GetVendorQueryVariables
} from '../../../generated-types';

@Injectable()
export default class VendorDetailResolver extends BaseEntityResolver<
  VendorsFragment
> {
  constructor(router: Router, dataService: DataService) {
    super(
      router,
      {
        __typename: 'Vendor',
        id: '',
		firstname:'',
	    lastname:'',
	    email:'',
	    phone:'',
	    companyname:'',
		companyaddr:'',
		companydesc:'',
		companyphone:'',
		companycategory:[''],
		panvat:'',
		panvatnum:'',
		producttype:[''],
		uuid:'',
		createdAt:'',
		updatedAt:''
      },
      (id) =>
        dataService.query<GetVendorQuery, GetVendorQueryVariables>(GET_VENDOR, {
            id: id
        })
        .mapStream((data) => data.Vendor)
    );
  }
}

