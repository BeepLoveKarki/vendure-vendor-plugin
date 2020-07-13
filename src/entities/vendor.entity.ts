import { Entity, Column } from 'typeorm';
import { VendureEntity, DeepPartial } from '@vendure/core';

/**
 * Here we define a new database entity. Passing this in to the plugin's `entities` array
 * will instruct TypeORM to create the new database table and make the entity available
 * to query in your plugin code.
 */
@Entity()
export class FeedbackEntity extends VendureEntity {

    constructor(input?: DeepPartial<FeedbackEntity>) {
        super(input);
    }

    @Column({default:"Anonymous"})
    name: string;
	
	@Column({default:"Anonymous"})
    email: string;
	
	@Column({default:"Anonymous"})
    phone: string;
	
	@Column()
    feedback: string;
}
