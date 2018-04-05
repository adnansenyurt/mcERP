import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { McErpSharedModule } from '../../shared';
import {
    CustomerMcService,
    CustomerMcPopupService,
    CustomerMcComponent,
    CustomerMcDetailComponent,
    CustomerMcDialogComponent,
    CustomerMcPopupComponent,
    CustomerMcDeletePopupComponent,
    CustomerMcDeleteDialogComponent,
    customerRoute,
    customerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...customerRoute,
    ...customerPopupRoute,
];

@NgModule({
    imports: [
        McErpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerMcComponent,
        CustomerMcDetailComponent,
        CustomerMcDialogComponent,
        CustomerMcDeleteDialogComponent,
        CustomerMcPopupComponent,
        CustomerMcDeletePopupComponent,
    ],
    entryComponents: [
        CustomerMcComponent,
        CustomerMcDialogComponent,
        CustomerMcPopupComponent,
        CustomerMcDeleteDialogComponent,
        CustomerMcDeletePopupComponent,
    ],
    providers: [
        CustomerMcService,
        CustomerMcPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class McErpCustomerMcModule {}
