import { Connection } from 'typeorm';
import { ListQueryBuilder } from '@vendure/core';
import { ListQueryOptions } from '@vendure/core/dist/common/types/common-types';
import { VendorEntity } from '../entities/vendor.entity';
import { PluginInitOptions } from '../types';
export declare class VendorService {
    private connection;
    private options;
    private listQueryBuilder;
    constructor(connection: Connection, options: PluginInitOptions, listQueryBuilder: ListQueryBuilder);
    getAllVendors(ctx: any, options?: ListQueryOptions<VendorEntity>): Promise<{
        items: VendorEntity[];
        totalItems: number;
    }>;
    getVendorById(ctx: any, data: any): Promise<VendorEntity>;
    addSingleVendor(ctx: any, data: any): Promise<VendorEntity[]>;
    updateSingleVendor(ctx: any, data: any): Promise<VendorEntity>;
    deleteSingleVendor(ctx: any, ids: any): Promise<VendorEntity>;
    deleteAllVendors(ctx: any): boolean;
}
