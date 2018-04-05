import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { McErpSharedModule } from '../../shared';
import {
    CustomerProposalMcService,
    CustomerProposalMcPopupService,
    CustomerProposalMcComponent,
    CustomerProposalMcDetailComponent,
    CustomerProposalMcDialogComponent,
    CustomerProposalMcPopupComponent,
    CustomerProposalMcDeletePopupComponent,
    CustomerProposalMcDeleteDialogComponent,
    customerProposalRoute,
    customerProposalPopupRoute,
} from './';

const ENTITY_STATES = [
    ...customerProposalRoute,
    ...customerProposalPopupRoute,
];

@NgModule({
    imports: [
        McErpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerProposalMcComponent,
        CustomerProposalMcDetailComponent,
        CustomerProposalMcDialogComponent,
        CustomerProposalMcDeleteDialogComponent,
        CustomerProposalMcPopupComponent,
        CustomerProposalMcDeletePopupComponent,
    ],
    entryComponents: [
        CustomerProposalMcComponent,
        CustomerProposalMcDialogComponent,
        CustomerProposalMcPopupComponent,
        CustomerProposalMcDeleteDialogComponent,
        CustomerProposalMcDeletePopupComponent,
    ],
    providers: [
        CustomerProposalMcService,
        CustomerProposalMcPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class McErpCustomerProposalMcModule {}
