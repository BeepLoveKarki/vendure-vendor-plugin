import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule, createResolveData } from '@vendure/admin-ui/core';
import { AllFeedbacksListComponent } from './components/all-feedbacks-list/all-feedbacks-list.component';
import { FeedbackDetailComponent } from './components/feedback-detail/feedback-detail.component';

import FeedbackDetailResolver from './providers/routing/feedback-detail/feedback-detail-resolver';
import { FeedbacksFragment } from './generated-types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
	{
      path: '',
      pathMatch: 'full',
      component: AllFeedbacksListComponent ,
      data: { breadcrumb: 'Feedbacks' },
    },
	{
	  path: 'create',
      component: FeedbackDetailComponent,
      data: {breadcrumb: [
             {
                label: 'Feedbacks',
                link: ['/extensions', 'feedbacks'],
             },
             {
                label: 'Create Feedback',
                link: [],
             }
	       ]
	     } 
	},
    {
       path: ':id',
       component: FeedbackDetailComponent,
       resolve: createResolveData(FeedbackDetailResolver),
       data: { breadcrumb: feedbackDetailBreadcrumb },
    }
	]),
  ],
  declarations: [
    AllFeedbacksListComponent,
	FeedbackDetailComponent
  ],
  providers:[FeedbackDetailResolver],
})
export class FeedbackUIModule {}

export function feedbackDetailBreadcrumb(resolved: { entity: Observable<FeedbacksFragment> }) {
	return resolved.entity.pipe(
        map(entity => [
            {
                label: 'Feedbacks',
                link: ['/extensions', 'feedbacks'],
            },
            {
                label: 'Update Feedback',
                link: [],
            },
        ]),
    );
}
