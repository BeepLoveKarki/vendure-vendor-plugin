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
   CreateFeedback,
   FeedbacksFragment,
   UpdateFeedback,
   FeedbackAddInput,
   FeedbackUpdateInput
} from '../../generated-types';

import { CREATE_FEEDBACK,UPDATE_FEEDBACK } from './feedback-detail.graphql';

@Component({
    selector: 'vdr-feedback-detail',
    templateUrl: './feedback-detail.component.html',
    styleUrls: ['./feedback-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})

export class FeedbackDetailComponent extends BaseDetailComponent<FeedbacksFragment>
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
            name: '',
			email: '',
			phone: '',
			feedback: ['',Validators.required]
        });
		
    }
	
	ngOnInit() {
		if(this.router.url!='/extensions/feedbacks/create'){
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
                        entity: 'Feedback',
                    });
                },
                () => {
                    this.notificationService.error('common.notify-create-error', {
                        entity: 'Feedback',
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
                        entity: 'Feedback',
                    });
                },
                () => {
                    this.notificationService.error('common.notify-update-error', {
                        entity: 'Feedback',
                    });
                },
            );
    }
	
	private addNew(): Observable<boolean>{
	   if (this.detailForm.dirty) {
            const formValue = this.detailForm.value;
            const input: FeedbackAddInput = {
				name: formValue.name || "Anonymous",
                email: formValue.email || "Anonymous",
				phone: formValue.phone.toString() || "Anonymous",
				feedback: formValue.feedback
            };
            return this.dataService
                .mutate<CreateFeedback.Mutation,CreateFeedback.Variables>(CREATE_FEEDBACK, {
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
            const input: FeedbackUpdateInput = {
                id: this.id,
                name: formValue.name || "Anonymous",
                email: formValue.email || "Anonymous",
				phone: formValue.phone.toString() || "Anonymous",
				feedback: formValue.feedback
            };
            return this.dataService
                .mutate<UpdateFeedback.Mutation,UpdateFeedback.Variables>(UPDATE_FEEDBACK, {
                    input,
                })
                .pipe(mapTo(true));
        } else {
            return of(false);
        }
    }
	
	protected setFormValues(entity: FeedbacksFragment) {
		  let datas = <any>{};
		  
		  if(entity.name=="Anonymous"){
		      datas.name=""
		  }
		  
		  if(entity.email=="Anonymous"){
		      datas.email=""
		  }
		  
		  if(entity.phone=="Anonymous"){
		      datas.phone=""
		  }else{
		       datas.phone=parseInt(datas.phone)
		  }
		  
		  datas.feedback=entity.feedback;
		  this.detailForm.patchValue(datas);
	}
    
}
