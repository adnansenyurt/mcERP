import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { McErpSharedModule } from '../../shared';
import {
    BillOfMaterialsMcService,
    BillOfMaterialsMcPopupService,
    BillOfMaterialsMcComponent,
    BillOfMaterialsMcDetailComponent,
    BillOfMaterialsMcDialogComponent,
    BillOfMaterialsMcPopupComponent,
    BillOfMaterialsMcDeletePopupComponent,
    BillOfMaterialsMcDeleteDialogComponent,
    billOfMaterialsRoute,
    billOfMaterialsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...billOfMaterialsRoute,
    ...billOfMaterialsPopupRoute,
];

@NgModule({
    imports: [
        McErpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BillOfMaterialsMcComponent,
        BillOfMaterialsMcDetailComponent,
        BillOfMaterialsMcDialogComponent,
        BillOfMaterialsMcDeleteDialogComponent,
        BillOfMaterialsMcPopupComponent,
        BillOfMaterialsMcDeletePopupComponent,
    ],
    entryComponents: [
        BillOfMaterialsMcComponent,
        BillOfMaterialsMcDialogComponent,
        BillOfMaterialsMcPopupComponent,
        BillOfMaterialsMcDeleteDialogComponent,
        BillOfMaterialsMcDeletePopupComponent,
    ],
    providers: [
        BillOfMaterialsMcService,
        BillOfMaterialsMcPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class McErpBillOfMaterialsMcModule {}
