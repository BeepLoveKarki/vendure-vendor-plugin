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
exports.VendorAdminResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const vendor_service_1 = require("../service/vendor.service");
const core_1 = require("@vendure/core");
let VendorAdminResolver = class VendorAdminResolver {
    constructor(vendorService) {
        this.vendorService = vendorService;
    }
    Vendors(ctx, args) {
        const { options } = args;
        return this.vendorService.getAllVendors(ctx, options || undefined);
    }
    Vendor(ctx, args) {
        const { id } = args;
        return this.vendorService.getVendorById(ctx, id);
    }
    addVendor(ctx, args) {
        const { input } = args;
        return this.vendorService.addSingleVendor(ctx, input);
    }
    updateVendor(ctx, args) {
        const { input } = args;
        return this.vendorService.updateSingleVendor(ctx, input);
    }
    deleteVendor(ctx, args) {
        return this.vendorService.deleteSingleVendor(ctx, args.id);
    }
    deleteAllVendors(ctx) {
        return this.vendorService.deleteAllVendors(ctx);
    }
};
__decorate([
    graphql_1.Query(),
    core_1.Allow(core_1.Permission.ReadSettings),
    __param(0, core_1.Ctx()), __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", void 0)
], VendorAdminResolver.prototype, "Vendors", null);
__decorate([
    graphql_1.Query(),
    core_1.Allow(core_1.Permission.ReadSettings),
    __param(0, core_1.Ctx()), __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", void 0)
], VendorAdminResolver.prototype, "Vendor", null);
__decorate([
    core_1.Transaction(),
    graphql_1.Mutation(),
    core_1.Allow(core_1.Permission.CreateSettings),
    __param(0, core_1.Ctx()), __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", void 0)
], VendorAdminResolver.prototype, "addVendor", null);
__decorate([
    core_1.Transaction(),
    graphql_1.Mutation(),
    core_1.Allow(core_1.Permission.UpdateSettings),
    __param(0, core_1.Ctx()), __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", void 0)
], VendorAdminResolver.prototype, "updateVendor", null);
__decorate([
    core_1.Transaction(),
    graphql_1.Mutation(),
    core_1.Allow(core_1.Permission.DeleteSettings),
    __param(0, core_1.Ctx()), __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", void 0)
], VendorAdminResolver.prototype, "deleteVendor", null);
__decorate([
    core_1.Transaction(),
    graphql_1.Mutation(),
    core_1.Allow(core_1.Permission.DeleteSettings),
    __param(0, core_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext]),
    __metadata("design:returntype", void 0)
], VendorAdminResolver.prototype, "deleteAllVendors", null);
VendorAdminResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [vendor_service_1.VendorService])
], VendorAdminResolver);
exports.VendorAdminResolver = VendorAdminResolver;
//# sourceMappingURL=vendor-admin.resolver.js.map