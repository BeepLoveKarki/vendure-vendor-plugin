import { Args, Parent, Query, Resolver, Mutation } from '@nestjs/graphql';
import { VendorService } from '../service/vendor.service';
import { RequestContext, Ctx, Allow, Permission } from '@vendure/core';

@Resolver()
export class VendorAdminResolver {
    constructor(private vendorService: VendorService) {
    }
	
	create_UUID(){
		let dt = new Date().getTime();
		let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			let r = (dt + Math.random()*16)%16 | 0;
			dt = Math.floor(dt/16);
			return (c=='x' ? r :(r&0x3|0x8)).toString(16);
         });
        return uuid;
    }

    @Query()
	@Allow(Permission.ReadSettings)
    Vendors(@Ctx() ctx: RequestContext, @Args() args: any) {
		const {options} = args;
        return this.vendorService.getAllVendors(ctx,options || undefined);
    }
	
	@Query()
	@Allow(Permission.ReadSettings)
    Vendor(@Ctx() ctx: RequestContext, @Args() args: any) {
		const {id} = args;
        return this.vendorService.getVendorById(ctx,id);
    }
	
	@Mutation()
	@Allow(Permission.CreateSettings)
	addVendor(@Ctx() ctx: RequestContext, @Args() args: any){
	   const {input} = args;
	   input.uuid=this.create_UUID();
	   return this.vendorService.addSingleVendor(ctx,input);
	}
	
	
	@Mutation()
	@Allow(Permission.UpdateSettings)
	updateVendor(@Ctx() ctx: RequestContext, @Args() args: any){
	   const {input} = args;
	   return this.vendorService.updateSingleVendor(ctx,input);
	}
	
	@Mutation()
	@Allow(Permission.DeleteSettings)
	deleteVendor(@Ctx() ctx: RequestContext, @Args() args: any){
	   return this.vendorService.deleteSingleVendor(ctx,args.id);
	}
	
	@Mutation()
	@Allow(Permission.DeleteSettings)
	deleteAllVendors(@Ctx() ctx: RequestContext){
	   return this.vendorService.deleteAllVendors(ctx);
	}
	
}
