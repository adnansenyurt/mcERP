import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { McErpSharedModule } from '../../shared';
import {
    ProductStockMcService,
    ProductStockMcPopupService,
    ProductStockMcComponent,
    ProductStockMcDetailComponent,
    ProductStockMcDialogComponent,
    ProductStockMcPopupComponent,
    ProductStockMcDeletePopupComponent,
    ProductStockMcDeleteDialogComponent,
    productStockRoute,
    productStockPopupRoute,
} from './';

const ENTITY_STATES = [
    ...productStockRoute,
    ...productStockPopupRoute,
];

@NgModule({
    imports: [
        McErpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductStockMcComponent,
        ProductStockMcDetailComponent,
        ProductStockMcDialogComponent,
        ProductStockMcDeleteDialogComponent,
        ProductStockMcPopupComponent,
        ProductStockMcDeletePopupComponent,
    ],
    entryComponents: [
        ProductStockMcComponent,
        ProductStockMcDialogComponent,
        ProductStockMcPopupComponent,
        ProductStockMcDeleteDialogComponent,
        ProductStockMcDeletePopupComponent,
    ],
    providers: [
        ProductStockMcService,
        ProductStockMcPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class McErpProductStockMcModule {}
