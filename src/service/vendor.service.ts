import { Injectable, Inject } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { ListQueryBuilder,getEntityOrThrow } from '@vendure/core';

import { ListQueryOptions } from '@vendure/core/dist/common/types/common-types';

import { FeedbackEntity } from '../entities/feedback.entity';
import { PLUGIN_INIT_OPTIONS } from '../constants';
import { PluginInitOptions } from '../types';

@Injectable()
export class FeedbackService {

    constructor(@InjectConnection() private connection: Connection,
                @Inject(PLUGIN_INIT_OPTIONS) private options: PluginInitOptions,
				private listQueryBuilder: ListQueryBuilder) {}

    async getAllFeedbacks(ctx,options?: ListQueryOptions<FeedbackEntity>) {
        return this.listQueryBuilder
		.build(FeedbackEntity, options)
		.getManyAndCount()
		.then(([feedbacks, totalItems]) => {
			return {
				items: feedbacks,
				totalItems
			 };
		 });
    }
	
	async getFeedbackById(ctx,data){
	   return getEntityOrThrow(this.connection, FeedbackEntity, data);
	}
	
	async addSingleFeedback(ctx,data){
	   const createdVariant = this.connection.getRepository(FeedbackEntity).create(data);
	   const savedVariant = await this.connection.getRepository(FeedbackEntity).save(createdVariant);
	   return savedVariant;
	}
	
	async updateSingleFeedback(ctx,data){
	   const createdVariant = await this.connection.getRepository(FeedbackEntity).update(data.id,{
		   name: data.name || "Anonymous",
		   email: data.email || "Anonymous",
		   phone: data.phone || "Anonymous",
		   feedback: data.feedback
	   });
	   return getEntityOrThrow(this.connection, FeedbackEntity, data.id);
	}
	
	async deleteSingleFeedback(ctx,ids){
	   const Variants = await getEntityOrThrow(this.connection, FeedbackEntity, ids);
	   this.connection.getRepository(FeedbackEntity).delete(ids);
	   return Variants;
	}
	
	deleteAllFeedbacks(ctx){
	   this.connection.getRepository(FeedbackEntity).clear();
	   return true;
	}
	
}
