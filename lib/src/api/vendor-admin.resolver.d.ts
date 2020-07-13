import { VendorService } from '../service/vendor.service';
import { RequestContext } from '@vendure/core';
export declare class VendorAdminResolver {
    private vendorService;
    constructor(vendorService: VendorService);
    create_UUID(): string;
    Vendors(ctx: RequestContext, args: any): Promise<{
        items: import("../entities/vendor.entity").VendorEntity[];
        totalItems: number;
    }>;
    Vendor(ctx: RequestContext, args: any): Promise<import("../entities/vendor.entity").VendorEntity>;
    addVendor(ctx: RequestContext, args: any): Promise<import("../entities/vendor.entity").VendorEntity[]>;
    updateVendor(ctx: RequestContext, args: any): Promise<import("../entities/vendor.entity").VendorEntity>;
    deleteVendor(ctx: RequestContext, args: any): Promise<import("../entities/vendor.entity").VendorEntity>;
    deleteAllVendors(ctx: RequestContext): boolean;
}
