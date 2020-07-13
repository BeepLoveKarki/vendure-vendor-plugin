import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    BaseDetailComponent,
    DataService,
    NotificationService,
    ServerConfigService,
} from '@vendure/admin-ui/core';
import { Observable, of } from 'rxjs';
import { filter, map, mapTo, switchMap } from 'rxjs/operators';

import { 
   CreateVendor,
   VendorsFragment,
   UpdateVendor,
   VendorAddInput,
   VendorUpdateInput
} from '../../generated-types';

import { CREATE_VENDOR,UPDATE_VENDOR } from './vendor-detail.graphql';

@Component({
    selector: 'vdr-vendor-detail',
    templateUrl: './vendor-detail.component.html',
    styleUrls: ['./vendor-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})

export class VendorDetailComponent extends BaseDetailComponent<VendorsFragment>
    implements OnInit, OnDestroy {
    detailForm: FormGroup;
	which = false;
	
	constructor(
        route: ActivatedRoute,
        router: Router,
        serverConfigService: ServerConfigService,
        private formBuilder: FormBuilder,
        protected dataService: DataService,
        private changeDetector: ChangeDetectorRef,
        private notificationService: NotificationService,
    ) {
        super(route, router, serverConfigService, dataService);
        
		this.detailForm = this.formBuilder.group({
			firstname:['',Validators.required],
			lastname:['',Validators.required],
			email:['',Validators.required],
			phone:['',Validators.required],
			companyname:['',Validators.required],
			companyaddr:['',Validators.required],
			companydesc:'',
			companyphone:['',Validators.required],
			companycategory:['',Validators.required],
			panvat:['',Validators.required],
			panvatnum:['',Validators.required],
			producttype:['',Validators.required]
        });
		
    }
	
	ngOnInit() {
		if(this.router.url!='/extensions/vendors/create'){
		  this.which=false;
		  this.init();
		}else{
		   this.which=true;
		}
    }
	
	ngOnDestroy() {
      this.destroy();
    }
	
	create(){
	   this.addNew()
            .pipe(filter(result => !!result))
            .subscribe(
                () => {
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.notificationService.success('common.notify-create-success', {
                        entity: 'Vendor',
                    });
                },
                () => {
                    this.notificationService.error('common.notify-create-error', {
                        entity: 'Vendor',
                    });
                },
            );
	}
	
	save() {
        this.saveChanges()
            .pipe(filter(result => !!result))
            .subscribe(
                () => {
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.notificationService.success('common.notify-update-success', {
                        entity: 'Vendor',
                    });
                },
                () => {
                    this.notificationService.error('common.notify-update-error', {
                        entity: 'Vendor',
                    });
                },
            );
    }
	
	private addNew(): Observable<boolean>{
	   if (this.detailForm.dirty) {
            const formValue = this.detailForm.value;
            const input: VendorAddInput = {
				firstname:formValue.firstname,
				lastname:formValue.lastname,
				email:formValue.email,
				phone:formValue.phone.toString(),
				companyname:formValue.companyname,
				companyaddr:formValue.companyaddr,
				companydesc:formValue.companydesc||"",
				companyphone:formValue.companyphone.toString(),
				companycategory:formValue.companycategory,
				panvat:formValue.panvat,
				panvatnum:formValue.panvatnum,
				producttype:formValue.producttype
            };
            return this.dataService
                .mutate<CreateVendor.Mutation,CreateVendor.Variables>(CREATE_VENDOR, {
                    input,
                })
                .pipe(mapTo(true));
        } else {
            return of(false);
        }
	}
	
	private saveChanges(): Observable<boolean> {
        if (this.detailForm.dirty) {
            const formValue = this.detailForm.value;
            const input: VendorUpdateInput = {
                id: this.id,
				firstname:formValue.firstname,
				lastname:formValue.lastname,
				email:formValue.email,
				phone:formValue.phone.toString(),
				companyname:formValue.companyname,
				companyaddr:formValue.companyaddr,
				companydesc:formValue.companydesc||"",
				companyphone:formValue.companyphone.toString(),
				companycategory:formValue.companycategory,
				panvat:formValue.panvat,
				panvatnum:formValue.panvatnum,
				producttype:formValue.producttype
            };
            return this.dataService
                .mutate<UpdateVendor.Mutation,UpdateVendor.Variables>(UPDATE_VENDOR, {
                    input,
                })
                .pipe(mapTo(true));
        } else {
            return of(false);
        }
    }
	
	protected setFormValues(entity: VendorsFragment) {
		  console.log(entity.uuid);
		  this.detailForm.patchValue({
			 firstname:entity.firstname,
			 lastname:entity.lastname,
			 email:entity.email,
			 phone:parseInt(entity.phone),
			 companyname:entity.companyname,
			 companyaddr:entity.companyaddr,
			 companydesc:entity.companydesc||"",
			 companyphone:parseInt(entity.companyphone),
			 companycategory:entity.companycategory,
			 panvat:entity.panvat,
			 panvatnum:entity.panvatnum,
			 producttype:entity. producttype,
		  });
	}
    
}
