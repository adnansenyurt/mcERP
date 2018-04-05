import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { McErpSharedModule } from '../../shared';
import {
    SupplyPartContractMcService,
    SupplyPartContractMcPopupService,
    SupplyPartContractMcComponent,
    SupplyPartContractMcDetailComponent,
    SupplyPartContractMcDialogComponent,
    SupplyPartContractMcPopupComponent,
    SupplyPartContractMcDeletePopupComponent,
    SupplyPartContractMcDeleteDialogComponent,
    supplyPartContractRoute,
    supplyPartContractPopupRoute,
} from './';

const ENTITY_STATES = [
    ...supplyPartContractRoute,
    ...supplyPartContractPopupRoute,
];

@NgModule({
    imports: [
        McErpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SupplyPartContractMcComponent,
        SupplyPartContractMcDetailComponent,
        SupplyPartContractMcDialogComponent,
        SupplyPartContractMcDeleteDialogComponent,
        SupplyPartContractMcPopupComponent,
        SupplyPartContractMcDeletePopupComponent,
    ],
    entryComponents: [
        SupplyPartContractMcComponent,
        SupplyPartContractMcDialogComponent,
        SupplyPartContractMcPopupComponent,
        SupplyPartContractMcDeleteDialogComponent,
        SupplyPartContractMcDeletePopupComponent,
    ],
    providers: [
        SupplyPartContractMcService,
        SupplyPartContractMcPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class McErpSupplyPartContractMcModule {}
