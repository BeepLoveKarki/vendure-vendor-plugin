import { VendureEntity, DeepPartial } from '@vendure/core';
/**
 * Here we define a new database entity. Passing this in to the plugin's `entities` array
 * will instruct TypeORM to create the new database table and make the entity available
 * to query in your plugin code.
 */
export declare class VendorEntity extends VendureEntity {
    constructor(input?: DeepPartial<VendorEntity>);
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    companyname: string;
    companyaddr: string;
    companydesc: string;
    companyphone: string;
    companycategory: string[];
    panvat: string;
    panvatnum: string;
    producttype: string[];
    uuid: string;
}
