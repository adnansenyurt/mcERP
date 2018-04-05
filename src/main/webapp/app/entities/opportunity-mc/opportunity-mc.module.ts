import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { McErpSharedModule } from '../../shared';
import {
    OpportunityMcService,
    OpportunityMcPopupService,
    OpportunityMcComponent,
    OpportunityMcDetailComponent,
    OpportunityMcDialogComponent,
    OpportunityMcPopupComponent,
    OpportunityMcDeletePopupComponent,
    OpportunityMcDeleteDialogComponent,
    opportunityRoute,
    opportunityPopupRoute,
} from './';

const ENTITY_STATES = [
    ...opportunityRoute,
    ...opportunityPopupRoute,
];

@NgModule({
    imports: [
        McErpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OpportunityMcComponent,
        OpportunityMcDetailComponent,
        OpportunityMcDialogComponent,
        OpportunityMcDeleteDialogComponent,
        OpportunityMcPopupComponent,
        OpportunityMcDeletePopupComponent,
    ],
    entryComponents: [
        OpportunityMcComponent,
        OpportunityMcDialogComponent,
        OpportunityMcPopupComponent,
        OpportunityMcDeleteDialogComponent,
        OpportunityMcDeletePopupComponent,
    ],
    providers: [
        OpportunityMcService,
        OpportunityMcPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class McErpOpportunityMcModule {}
