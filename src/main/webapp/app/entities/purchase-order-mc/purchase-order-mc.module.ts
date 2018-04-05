import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { McErpSharedModule } from '../../shared';
import {
    PurchaseOrderMcService,
    PurchaseOrderMcPopupService,
    PurchaseOrderMcComponent,
    PurchaseOrderMcDetailComponent,
    PurchaseOrderMcDialogComponent,
    PurchaseOrderMcPopupComponent,
    PurchaseOrderMcDeletePopupComponent,
    PurchaseOrderMcDeleteDialogComponent,
    purchaseOrderRoute,
    purchaseOrderPopupRoute,
} from './';

const ENTITY_STATES = [
    ...purchaseOrderRoute,
    ...purchaseOrderPopupRoute,
];

@NgModule({
    imports: [
        McErpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PurchaseOrderMcComponent,
        PurchaseOrderMcDetailComponent,
        PurchaseOrderMcDialogComponent,
        PurchaseOrderMcDeleteDialogComponent,
        PurchaseOrderMcPopupComponent,
        PurchaseOrderMcDeletePopupComponent,
    ],
    entryComponents: [
        PurchaseOrderMcComponent,
        PurchaseOrderMcDialogComponent,
        PurchaseOrderMcPopupComponent,
        PurchaseOrderMcDeleteDialogComponent,
        PurchaseOrderMcDeletePopupComponent,
    ],
    providers: [
        PurchaseOrderMcService,
        PurchaseOrderMcPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class McErpPurchaseOrderMcModule {}
