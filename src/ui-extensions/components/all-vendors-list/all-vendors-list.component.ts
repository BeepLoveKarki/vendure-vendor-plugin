import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseListComponent, DataService, NotificationService, ModalService  } from '@vendure/admin-ui/core';
import { merge, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { SortOrder } from '../../generated-types';
import { EMPTY, Observable } from 'rxjs';
import { debounceTime, takeUntil, switchMap } from 'rxjs/operators';
import { CsvDataService } from '../../common/export-as-csv';

import { 
  GetAllFeedbacksQuery,
  Feedbacks,
  GetAllFeedbacksQueryVariables,
  DeleteFeedback
} from '../../generated-types';

import { GET_ALL_FEEDBACKS, DELETE_FEEDBACK } from './all-feedbacks-list.graphql';

@Component({
    selector: 'vdr-all-feedbacks-list',
    templateUrl: './all-feedbacks-list.component.html',
    styleUrls: ['./all-feedbacks-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AllFeedbacksListComponent extends BaseListComponent<
    GetAllFeedbacksQuery,
	Feedbacks.Fragment,
    GetAllFeedbacksQueryVariables
> implements OnInit {
    searchTerm = new FormControl('');
	Feedbacks: any;
	private querySubscription: Subscription;

    constructor(
	   private dataService: DataService,
       private modalService: ModalService,
       private notificationService: NotificationService,
       private apollo: Apollo,	   
	   router: Router, 
	   route: ActivatedRoute,
	) {
        super(router, route);
        super.setQueryFn(
            (...args: any[]) => this.dataService.query(GET_ALL_FEEDBACKS,args),
            (data) => data.Feedbacks,
			(skip, take) => ({
                options: {
                    skip,
                    take,
					sort: {
                        updatedAt: SortOrder.Desc,
                    },
                },
            }),
        );
    }
	
	ngOnInit() {
        super.ngOnInit();
        this.searchTerm.valueChanges
            .pipe(
                debounceTime(250),
                takeUntil(this.destroy$),
            )
            .subscribe(() => {
				this.filtertable();
				//this.refresh();
			});
    }
	
	
  filtertable() {
	  let input = this.searchTerm.value;
	  let filter = input.toUpperCase();
	  let table = <HTMLElement> document.querySelector("#datatable >.table > tbody");
	  console.log(table);
	  let tr = table.getElementsByTagName("tr");
	  console.log(tr);
	  for (let i = 0; i < tr.length; i++) {
		 
		for(let j=0;j<4;j++){
		  
		  let td = tr[i].getElementsByTagName("td")[j];
          console.log(td);
		  if (td) {
			 console.log("a");
			 let txtValue = td.innerHTML;
			 console.log(txtValue);
			 if (txtValue.toUpperCase().indexOf(filter) > -1) {
				  tr[i].style.display = "";
				  break;
				} else {
					tr[i].style.display = "none";
                }
             }
		  }
       
	   }
}
	
	
	downloadcsv(){
	  let args: any[] = [];
	  this.apollo.watchQuery<any>({
         query: GET_ALL_FEEDBACKS,
		 variables: args
      }).valueChanges.subscribe((data) => {
		  CsvDataService.exportToCsv('danfe-feedbacks.csv', data.data.Feedbacks.items);
      });
	  
	   
	}
	
	deleteFeedback(id: string) {
        this.modalService
            .dialog({
                title: _('vdr-feedback-plugin.confirm-delete-feedback'),
                buttons: [
                    { type: 'secondary', label: _('common.cancel') },
                    { type: 'danger', label: _('common.delete'), returnValue: true },
                ],
            })
            .pipe(
                switchMap(response => (response ? this.dataService.mutate<DeleteFeedback.Mutation,DeleteFeedback.Variables>(DELETE_FEEDBACK,{"input":id}) : EMPTY)),
            )
            .subscribe(
                () => {
                    this.notificationService.success(_('common.notify-delete-success'), {
                        entity: 'Feedback',
                    });
                    this.refresh();
                },
                err => {
                    this.notificationService.error(_('common.notify-delete-error'), {
                        entity: 'Feedback',
                    });
                },
            );
    }
}
