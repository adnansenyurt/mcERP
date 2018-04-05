import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { McErpSharedModule } from '../../shared';
import {
    SupplierMcService,
    SupplierMcPopupService,
    SupplierMcComponent,
    SupplierMcDetailComponent,
    SupplierMcDialogComponent,
    SupplierMcPopupComponent,
    SupplierMcDeletePopupComponent,
    SupplierMcDeleteDialogComponent,
    supplierRoute,
    supplierPopupRoute,
} from './';

const ENTITY_STATES = [
    ...supplierRoute,
    ...supplierPopupRoute,
];

@NgModule({
    imports: [
        McErpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SupplierMcComponent,
        SupplierMcDetailComponent,
        SupplierMcDialogComponent,
        SupplierMcDeleteDialogComponent,
        SupplierMcPopupComponent,
        SupplierMcDeletePopupComponent,
    ],
    entryComponents: [
        SupplierMcComponent,
        SupplierMcDialogComponent,
        SupplierMcPopupComponent,
        SupplierMcDeleteDialogComponent,
        SupplierMcDeletePopupComponent,
    ],
    providers: [
        SupplierMcService,
        SupplierMcPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class McErpSupplierMcModule {}
