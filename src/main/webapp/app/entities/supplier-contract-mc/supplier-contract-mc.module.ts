import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { McErpSharedModule } from '../../shared';
import {
    SupplierContractMcService,
    SupplierContractMcPopupService,
    SupplierContractMcComponent,
    SupplierContractMcDetailComponent,
    SupplierContractMcDialogComponent,
    SupplierContractMcPopupComponent,
    SupplierContractMcDeletePopupComponent,
    SupplierContractMcDeleteDialogComponent,
    supplierContractRoute,
    supplierContractPopupRoute,
} from './';

const ENTITY_STATES = [
    ...supplierContractRoute,
    ...supplierContractPopupRoute,
];

@NgModule({
    imports: [
        McErpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SupplierContractMcComponent,
        SupplierContractMcDetailComponent,
        SupplierContractMcDialogComponent,
        SupplierContractMcDeleteDialogComponent,
        SupplierContractMcPopupComponent,
        SupplierContractMcDeletePopupComponent,
    ],
    entryComponents: [
        SupplierContractMcComponent,
        SupplierContractMcDialogComponent,
        SupplierContractMcPopupComponent,
        SupplierContractMcDeleteDialogComponent,
        SupplierContractMcDeletePopupComponent,
    ],
    providers: [
        SupplierContractMcService,
        SupplierContractMcPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class McErpSupplierContractMcModule {}
