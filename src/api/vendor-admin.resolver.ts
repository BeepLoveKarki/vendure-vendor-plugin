import { Args, Parent, Query, Resolver, Mutation } from '@nestjs/graphql';
import { FeedbackService } from '../service/feedback.service';
import { RequestContext, Ctx, Allow, Permission } from '@vendure/core';

@Resolver()
export class FeedbackAdminResolver {
    constructor(private feedbackService: FeedbackService) {
    }

    @Query()
	@Allow(Permission.ReadSettings)
    Feedbacks(@Ctx() ctx: RequestContext, @Args() args: any) {
		const {options} = args;
        return this.feedbackService.getAllFeedbacks(ctx,options || undefined);
    }
	
	@Query()
	@Allow(Permission.ReadSettings)
    Feedback(@Ctx() ctx: RequestContext, @Args() args: any) {
		const {id} = args;
        return this.feedbackService.getFeedbackById(ctx,id);
    }
	
	@Mutation()
	@Allow(Permission.CreateSettings)
	addFeedback(@Ctx() ctx: RequestContext, @Args() args: any){
	   const {input} = args;
	   return this.feedbackService.addSingleFeedback(ctx,input);
	}
	
	
	@Mutation()
	@Allow(Permission.UpdateSettings)
	updateFeedback(@Ctx() ctx: RequestContext, @Args() args: any){
	   const {input} = args;
	   return this.feedbackService.updateSingleFeedback(ctx,input);
	}
	
	@Mutation()
	@Allow(Permission.DeleteSettings)
	deleteFeedback(@Ctx() ctx: RequestContext, @Args() args: any){
	   return this.feedbackService.deleteSingleFeedback(ctx,args.id);
	}
	
	@Mutation()
	@Allow(Permission.DeleteSettings)
	deleteAllFeedbacks(@Ctx() ctx: RequestContext){
	   return this.feedbackService.deleteAllFeedbacks(ctx);
	}
	
}
