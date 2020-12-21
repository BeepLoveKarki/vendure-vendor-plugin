import { Args, Parent, Query, Resolver, Mutation } from '@nestjs/graphql';
import { VendorService } from '../service/vendor.service';
import { RequestContext, Ctx, Allow, Permission, Transaction } from '@vendure/core';

@Resolver()
export class VendorAdminResolver {
	
	static assetId:string;
	static assetsource:string;
	
    constructor(private vendorService: VendorService) {
    }
	
	
    @Query()
	@Allow(Permission.SuperAdmin)
    Vendors(@Ctx() ctx: RequestContext, @Args() args: any) {
		const {options} = args;
        return this.vendorService.getAllVendors(ctx,options || undefined);
    }

	@Query()
	@Allow(Permission.SuperAdmin)
    Vendor(@Ctx() ctx: RequestContext, @Args() args: any) {
		const {id} = args;
        return this.vendorService.getVendorById(ctx,id);
    }
	
	@Transaction()
	@Mutation()
	@Allow(Permission.CreateSettings)
	addVendor(@Ctx() ctx: RequestContext, @Args() args: any){
	   const {input} = args;
       return this.vendorService.addSingleVendor(ctx,input);
	}
	
	@Transaction()
	@Mutation()
	@Allow(Permission.UpdateSettings)
	updateVendor(@Ctx() ctx: RequestContext, @Args() args: any){
	   const {input} = args;
	   return this.vendorService.updateSingleVendor(ctx,input);
	}
	
	@Transaction()
	@Mutation()
	@Allow(Permission.DeleteSettings)
	deleteVendor(@Ctx() ctx: RequestContext, @Args() args: any){
	   return this.vendorService.deleteSingleVendor(ctx,args.id);
	}
	
	@Transaction()
	@Mutation()
	@Allow(Permission.DeleteSettings)
	deleteAllVendors(@Ctx() ctx: RequestContext){
	   return this.vendorService.deleteAllVendors(ctx);
	}
	
}
