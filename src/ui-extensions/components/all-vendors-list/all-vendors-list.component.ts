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
  GetAllVendorsQuery,
  Vendors,
  GetAllVendorsQueryVariables,
  DeleteVendor
} from '../../generated-types';
	
import { GET_ALL_VENDORS, DELETE_VENDOR } from './all-vendors-list.graphql';

@Component({
    selector: 'vdr-all-vendors-list',
    templateUrl: './all-vendors-list.component.html',
    styleUrls: ['./all-vendors-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AllVendorsListComponent extends BaseListComponent<
    GetAllVendorsQuery,
	Vendors.Fragment,
    GetAllVendorsQueryVariables
> implements OnInit {
    searchTerm = new FormControl('');
	Vendors: any;
	routeurl: string;
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
            (...args: any[]) => this.dataService.query(GET_ALL_VENDORS,args),
            (data) => data.Vendors,
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
		this.routeurl=location.origin;
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
	  let tr = table.getElementsByTagName("tr");
	  for (let i = 0; i < tr.length; i++) {
		 
		for(let j=0;j<11;j++){
		  
		  let td = tr[i].getElementsByTagName("td")[j];
		  if (td) {
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
         query: GET_ALL_VENDORS,
		 variables: args
      }).valueChanges.subscribe((data) => {
		  CsvDataService.exportToCsv('danfe-vendors.csv', data.data.Vendors.items);
      });
	  
	   
	}
	
	deleteVendor(id: string) {
        this.modalService
            .dialog({
                title: _('vdr-vendor-plugin.confirm-delete-vendor'),
                buttons: [
                    { type: 'secondary', label: _('common.cancel') },
                    { type: 'danger', label: _('common.delete'), returnValue: true },
                ],
            })
            .pipe(
                switchMap(response => (response ? this.dataService.mutate<DeleteVendor.Mutation,DeleteVendor.Variables>(DELETE_VENDOR,{"input":id}) : EMPTY)),
            )
            .subscribe(
                () => {
                    this.notificationService.success(_('common.notify-delete-success'), {
                        entity: 'Vendor',
                    });
                    this.refresh();
                },
                err => {
                    this.notificationService.error(_('common.notify-delete-error'), {
                        entity: 'Vendor',
                    });
                },
            );
    }
}
