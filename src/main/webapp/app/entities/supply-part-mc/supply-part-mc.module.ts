import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { McErpSharedModule } from '../../shared';
import {
    SupplyPartMcService,
    SupplyPartMcPopupService,
    SupplyPartMcComponent,
    SupplyPartMcDetailComponent,
    SupplyPartMcDialogComponent,
    SupplyPartMcPopupComponent,
    SupplyPartMcDeletePopupComponent,
    SupplyPartMcDeleteDialogComponent,
    supplyPartRoute,
    supplyPartPopupRoute,
} from './';

const ENTITY_STATES = [
    ...supplyPartRoute,
    ...supplyPartPopupRoute,
];

@NgModule({
    imports: [
        McErpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SupplyPartMcComponent,
        SupplyPartMcDetailComponent,
        SupplyPartMcDialogComponent,
        SupplyPartMcDeleteDialogComponent,
        SupplyPartMcPopupComponent,
        SupplyPartMcDeletePopupComponent,
    ],
    entryComponents: [
        SupplyPartMcComponent,
        SupplyPartMcDialogComponent,
        SupplyPartMcPopupComponent,
        SupplyPartMcDeleteDialogComponent,
        SupplyPartMcDeletePopupComponent,
    ],
    providers: [
        SupplyPartMcService,
        SupplyPartMcPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class McErpSupplyPartMcModule {}
