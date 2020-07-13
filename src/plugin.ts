import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { PluginInitOptions } from './types';
import { PLUGIN_INIT_OPTIONS } from './constants';
import { VendorEntity } from './entities/vendor.entity';
import { VendorService } from './service/vendor.service';
import { adminApiExtensions,shopApiExtensions } from './api/api-extensions';
import { VendorShopResolver } from './api/vendor-shop.resolver';
import { VendorAdminResolver } from './api/vendor-admin.resolver';
import path from 'path';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';

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
@VendurePlugin({
    // Importing the PluginCommonModule gives all of our plugin's injectables (services, resolvers)
    // access to the Vendure core providers. See https://www.vendure.io/docs/typescript-api/plugin/plugin-common-module/
    imports: [PluginCommonModule],
    entities: [VendorEntity],
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: [VendorShopResolver],
    },
	adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [VendorAdminResolver],
    },
    providers: [
       VendorService,
        // By definiting the `PLUGIN_INIT_OPTIONS` symbol as a provider, we can then inject the
        // user-defined options into other classes, such as the {@link ExampleService}.
        { provide: PLUGIN_INIT_OPTIONS, useFactory: () => VendorPlugin.options },
    ]
})
export class VendorPlugin {

    static options: PluginInitOptions;

    /**
     * The static `init()` method is a convention used by Vendure plugins which allows options
     * to be configured by the user.
     */
    static init(options: PluginInitOptions) {
        this.options = options;
        return VendorPlugin;
    }
	
	static uiExtensions: AdminUiExtension = {
        extensionPath: path.join(__dirname, 'ui-extensions'),
        ngModules: [
            {
                type: 'lazy' as const,
                route: 'vendors',
                ngModuleFileName: 'vendor-ui-lazy.module.ts',
                ngModuleName: 'VendorUIModule',
            },
			{
			   type: 'shared' as const,
			   ngModuleFileName: 'vendor-ui-extension.module.ts',
               ngModuleName: 'VendorExtensionModule',
			}
        ],
       translations: {
         en: path.join(__dirname, 'i18n/en.json')
       }
    };
	
}
