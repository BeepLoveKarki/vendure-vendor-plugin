import { NgModule } from '@angular/core';
import { SharedModule, addNavMenuSection } from '@vendure/admin-ui/core';

@NgModule({
  imports: [SharedModule],
  providers: [
    addNavMenuSection({
      id: 'vendors',
      label: 'Vendors',
      items: [{
        id: 'vendors-list',
        label: 'Vendors',
        routerLink: ['/extensions/vendors'],
        // Icon can be any of https://clarity.design/icons
        icon: 'id-badge',
      }],
      requiresPermission: 'SuperAdmin',
	},
    // Add this section before the "settings" section
    'settings'),
  ]
})
export class VendorExtensionModule {}