import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule, createResolveData } from '@vendure/admin-ui/core';
import { AllVendorsListComponent } from './components/all-vendors-list/all-vendors-list.component';
import { VendorDetailComponent } from './components/vendor-detail/vendor-detail.component';

import VendorDetailResolver from './providers/routing/vendor-detail/vendor-detail-resolver';
import { VendorsFragment } from './generated-types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
	{
      path: '',
      pathMatch: 'full',
      component: AllVendorsListComponent ,
      data: { breadcrumb: 'Vendors' },
    },
	{
	  path: 'create',
      component: VendorDetailComponent,
      data: {breadcrumb: [
             {
                label: 'Vendors',
                link: ['/extensions', 'vendors'],
             },
             {
                label: 'Create Vendor',
                link: [],
             }
	       ]
	     } 
	},
    {
       path: ':id',
       component: VendorDetailComponent,
       resolve: createResolveData(VendorDetailResolver),
       data: { breadcrumb: vendorDetailBreadcrumb },
    }
	]),
  ],
  declarations: [
    AllVendorsListComponent,
	VendorDetailComponent
  ],
  providers:[VendorDetailResolver],
})
export class VendorUIModule {}

export function vendorDetailBreadcrumb(resolved: { entity: Observable<VendorsFragment> }) {
	return resolved.entity.pipe(
        map(entity => [
            {
                label: 'Vendors',
                link: ['/extensions', 'vendors'],
            },
            {
                label: 'Update Vendor',
                link: [],
            },
        ]),
    );
}
