import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { McErpSharedModule } from '../../shared';
import {
    SupplyStockMcService,
    SupplyStockMcPopupService,
    SupplyStockMcComponent,
    SupplyStockMcDetailComponent,
    SupplyStockMcDialogComponent,
    SupplyStockMcPopupComponent,
    SupplyStockMcDeletePopupComponent,
    SupplyStockMcDeleteDialogComponent,
    supplyStockRoute,
    supplyStockPopupRoute,
} from './';

const ENTITY_STATES = [
    ...supplyStockRoute,
    ...supplyStockPopupRoute,
];

@NgModule({
    imports: [
        McErpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SupplyStockMcComponent,
        SupplyStockMcDetailComponent,
        SupplyStockMcDialogComponent,
        SupplyStockMcDeleteDialogComponent,
        SupplyStockMcPopupComponent,
        SupplyStockMcDeletePopupComponent,
    ],
    entryComponents: [
        SupplyStockMcComponent,
        SupplyStockMcDialogComponent,
        SupplyStockMcPopupComponent,
        SupplyStockMcDeleteDialogComponent,
        SupplyStockMcDeletePopupComponent,
    ],
    providers: [
        SupplyStockMcService,
        SupplyStockMcPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class McErpSupplyStockMcModule {}
