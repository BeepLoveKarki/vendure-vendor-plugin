import { VendorService } from '../service/vendor.service';
import { RequestContext } from '@vendure/core';
export declare class VendorShopResolver {
    private vendorService;
    constructor(vendorService: VendorService);
    create_UUID(): string;
    addVendor(ctx: RequestContext, args: any): Promise<import("../entities/vendor.entity").VendorEntity[]>;
}
