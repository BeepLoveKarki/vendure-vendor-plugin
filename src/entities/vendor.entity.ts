import { Entity, Column } from 'typeorm';
import { VendureEntity, DeepPartial } from '@vendure/core';

/**
 * Here we define a new database entity. Passing this in to the plugin's `entities` array
 * will instruct TypeORM to create the new database table and make the entity available
 * to query in your plugin code.
 */
@Entity()
export class VendorEntity extends VendureEntity {

    constructor(input?: DeepPartial<VendorEntity>) {
        super(input);
    }

    @Column()
    firstname: string;
	
	@Column()
    lastname: string;
	
	@Column()
    email: string;
	
	@Column()
    phone: string;
	
	@Column()
    companyname: string; //company name
	
	@Column()
    companyaddr: string; //company address
	
	@Column({default:""})
    companydesc: string; //company description
	
	@Column()
    companyphone: string;
	
	@Column("simple-array")
    companycategory: string[]; //type of company category
	
	@Column()
	panvat: string; //pan or vat
	
	@Column()
    panvatnum: string; //pan or vat number
	
	@Column("simple-array")
    producttype: string[]; //producttheysell
	
	//for file, fileToUpload;File
	
	@Column()
	uuid: string;
}
