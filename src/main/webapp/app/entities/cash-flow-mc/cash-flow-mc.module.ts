import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { McErpSharedModule } from '../../shared';
import {
    CashFlowMcService,
    CashFlowMcPopupService,
    CashFlowMcComponent,
    CashFlowMcDetailComponent,
    CashFlowMcDialogComponent,
    CashFlowMcPopupComponent,
    CashFlowMcDeletePopupComponent,
    CashFlowMcDeleteDialogComponent,
    cashFlowRoute,
    cashFlowPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cashFlowRoute,
    ...cashFlowPopupRoute,
];

@NgModule({
    imports: [
        McErpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CashFlowMcComponent,
        CashFlowMcDetailComponent,
        CashFlowMcDialogComponent,
        CashFlowMcDeleteDialogComponent,
        CashFlowMcPopupComponent,
        CashFlowMcDeletePopupComponent,
    ],
    entryComponents: [
        CashFlowMcComponent,
        CashFlowMcDialogComponent,
        CashFlowMcPopupComponent,
        CashFlowMcDeleteDialogComponent,
        CashFlowMcDeletePopupComponent,
    ],
    providers: [
        CashFlowMcService,
        CashFlowMcPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class McErpCashFlowMcModule {}
