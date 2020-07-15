"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const core_1 = require("@vendure/core");
const vendor_entity_1 = require("../entities/vendor.entity");
const constants_1 = require("../constants");
let VendorService = class VendorService {
    constructor(connection, options, listQueryBuilder, assetService) {
        this.connection = connection;
        this.options = options;
        this.listQueryBuilder = listQueryBuilder;
        this.assetService = assetService;
    }
    async getAllVendors(ctx, options) {
        return this.listQueryBuilder
            .build(vendor_entity_1.VendorEntity, options)
            .getManyAndCount()
            .then(([vendors, totalItems]) => {
            return {
                items: vendors,
                totalItems
            };
        });
    }
    async getVendorById(ctx, data) {
        return core_1.getEntityOrThrow(this.connection, vendor_entity_1.VendorEntity, data);
    }
    async addSingleVendor(ctx, data) {
        if (data.file) {
            const asset = await this.assetService.create(ctx, data);
            data.assetid = asset.id;
            data.assetsource = asset.source;
            delete data.file;
        }
        else {
            data.assetid = "";
            data.assetsource = "";
        }
        const createdVariant = this.connection.getRepository(vendor_entity_1.VendorEntity).create(data);
        const savedVariant = await this.connection.getRepository(vendor_entity_1.VendorEntity).save(createdVariant);
        return savedVariant;
    }
    async updateSingleVendor(ctx, data) {
        let details;
        if (data.file) {
            const asset = await this.assetService.create(ctx, data);
            data.assetid = asset.id;
            data.assetsource = asset.source;
            delete data.file;
            details = {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
                companyname: data.companyname,
                companyaddr: data.companyaddr,
                companydesc: data.companydesc || "",
                companyphone: data.companyphone,
                companycategory: data.companycategory,
                panvat: data.panvat,
                panvatnum: data.panvatnum,
                producttype: data.producttype,
                assetid: data.assetid,
                assetsource: data.assetsource
            };
        }
        else {
            details = {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
                companyname: data.companyname,
                companyaddr: data.companyaddr,
                companydesc: data.companydesc || "",
                companyphone: data.companyphone,
                companycategory: data.companycategory,
                panvat: data.panvat,
                panvatnum: data.panvatnum,
                producttype: data.producttype
            };
        }
        const createdVariant = await this.connection.getRepository(vendor_entity_1.VendorEntity).update(data.id, details);
        return core_1.getEntityOrThrow(this.connection, vendor_entity_1.VendorEntity, data.id);
    }
    async deleteSingleVendor(ctx, ids) {
        const Variants = await core_1.getEntityOrThrow(this.connection, vendor_entity_1.VendorEntity, ids);
        this.connection.getRepository(vendor_entity_1.VendorEntity).delete(ids);
        return Variants;
    }
    deleteAllVendors(ctx) {
        this.connection.getRepository(vendor_entity_1.VendorEntity).clear();
        return true;
    }
};
VendorService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectConnection()),
    __param(1, common_1.Inject(constants_1.PLUGIN_INIT_OPTIONS)),
    __metadata("design:paramtypes", [typeorm_2.Connection, Object, core_1.ListQueryBuilder,
        core_1.AssetService])
], VendorService);
exports.VendorService = VendorService;
//# sourceMappingURL=vendor.service.js.map