import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, BaseEntityResolver } from '@vendure/admin-ui/core';
import { take } from 'rxjs/operators';
import { GET_FEEDBACK } from './feedback-detail-resolver.graphql';

import { 
  GetFeedbackQuery,
  FeedbacksFragment,
  GetFeedbackQueryVariables
} from '../../../generated-types';

@Injectable()
export default class FeedbackDetailResolver extends BaseEntityResolver<
  FeedbacksFragment
> {
  constructor(router: Router, dataService: DataService) {
    super(
      router,
      {
        __typename: 'Feedback',
        id: '',
		name: '',
		email: '',
		phone: '',
		feedback: '',
		createdAt: '',
		updatedAt: '',
      },
      (id) =>
        dataService.query<GetFeedbackQuery, GetFeedbackQueryVariables>(GET_FEEDBACK, {
            id: id
        })
        .mapStream((data) => data.Feedback)
    );
  }
}

