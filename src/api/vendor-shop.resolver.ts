import { Args, Parent, Query, Resolver, Mutation } from '@nestjs/graphql';
import { VendorService } from '../service/vendor.service';
import { RequestContext, Ctx } from '@vendure/core';

@Resolver()
export class VendorShopResolver {
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

	@Mutation()
	addVendor(@Ctx() ctx: RequestContext, @Args() args: any){
	   const {input} = args;
	   input.uuid=this.create_UUID();
	   return this.vendorService.addSingleVendor(ctx,input);
	}
	
}
