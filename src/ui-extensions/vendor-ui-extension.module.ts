import { NgModule } from '@angular/core';
import { SharedModule, addNavMenuSection } from '@vendure/admin-ui/core';

@NgModule({
  imports: [SharedModule],
  providers: [
    addNavMenuSection({
      id: 'feedbacks',
      label: 'Feedbacks',
      items: [{
        id: 'feedbacks',
        label: 'Feedbacks',
        routerLink: ['/extensions/feedbacks'],
        // Icon can be any of https://clarity.design/icons
        icon: 'folder-open',
      }],
    },
    // Add this section before the "settings" section
    'settings'),
  ]
})
export class FeedbackExtensionModule {}