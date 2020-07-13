"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var VendorPlugin_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorPlugin = void 0;
const core_1 = require("@vendure/core");
const constants_1 = require("./constants");
const vendor_entity_1 = require("./entities/vendor.entity");
const vendor_service_1 = require("./service/vendor.service");
const api_extensions_1 = require("./api/api-extensions");
const vendor_shop_resolver_1 = require("./api/vendor-shop.resolver");
const vendor_admin_resolver_1 = require("./api/vendor-admin.resolver");
const path_1 = __importDefault(require("path"));
/**
 * An example Vendure plugin.
 *
 * @example
 * ```TypeScript
 * export const config: VendureConfig = {
 *   //...
 *   plugins: [
 *     ExamplePlugin.init({
 *       // options
 *     }),
 *   ]
 * }
 * ```
 */
let VendorPlugin = VendorPlugin_1 = class VendorPlugin {
    /**
     * The static `init()` method is a convention used by Vendure plugins which allows options
     * to be configured by the user.
     */
    static init(options) {
        this.options = options;
        return VendorPlugin_1;
    }
};
VendorPlugin.uiExtensions = {
    extensionPath: path_1.default.join(__dirname, 'ui-extensions'),
    ngModules: [
        {
            type: 'lazy',
            route: 'vendors',
            ngModuleFileName: 'vendor-ui-lazy.module.ts',
            ngModuleName: 'VendorUIModule',
        },
        {
            type: 'shared',
            ngModuleFileName: 'vendor-ui-extension.module.ts',
            ngModuleName: 'VendorExtensionModule',
        }
    ],
    translations: {
        en: path_1.default.join(__dirname, 'i18n/en.json')
    }
};
VendorPlugin = VendorPlugin_1 = __decorate([
    core_1.VendurePlugin({
        // Importing the PluginCommonModule gives all of our plugin's injectables (services, resolvers)
        // access to the Vendure core providers. See https://www.vendure.io/docs/typescript-api/plugin/plugin-common-module/
        imports: [core_1.PluginCommonModule],
        entities: [vendor_entity_1.VendorEntity],
        shopApiExtensions: {
            schema: api_extensions_1.shopApiExtensions,
            resolvers: [vendor_shop_resolver_1.VendorShopResolver],
        },
        adminApiExtensions: {
            schema: api_extensions_1.adminApiExtensions,
            resolvers: [vendor_admin_resolver_1.VendorAdminResolver],
        },
        providers: [
            vendor_service_1.VendorService,
            // By definiting the `PLUGIN_INIT_OPTIONS` symbol as a provider, we can then inject the
            // user-defined options into other classes, such as the {@link ExampleService}.
            { provide: constants_1.PLUGIN_INIT_OPTIONS, useFactory: () => VendorPlugin_1.options },
        ]
    })
], VendorPlugin);
exports.VendorPlugin = VendorPlugin;
//# sourceMappingURL=plugin.js.map