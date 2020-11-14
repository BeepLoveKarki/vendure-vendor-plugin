import { Args, Parent, Query, Resolver, Mutation } from '@nestjs/graphql';
import { VendorService } from '../service/vendor.service';
import { RequestContext, Ctx, Transaction } from '@vendure/core';

@Resolver()
export class VendorShopResolver {
    constructor(private vendorService: VendorService) {
    }

    @Transaction()
	@Mutation()
	addVendor(@Ctx() ctx: RequestContext, @Args() args: any){
	   const {input} = args;
	   return this.vendorService.addSingleVendor(ctx,input);
	}
	
}
