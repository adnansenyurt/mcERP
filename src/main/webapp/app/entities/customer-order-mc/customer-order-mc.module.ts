import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { McErpSharedModule } from '../../shared';
import {
    CustomerOrderMcService,
    CustomerOrderMcPopupService,
    CustomerOrderMcComponent,
    CustomerOrderMcDetailComponent,
    CustomerOrderMcDialogComponent,
    CustomerOrderMcPopupComponent,
    CustomerOrderMcDeletePopupComponent,
    CustomerOrderMcDeleteDialogComponent,
    customerOrderRoute,
    customerOrderPopupRoute,
} from './';

const ENTITY_STATES = [
    ...customerOrderRoute,
    ...customerOrderPopupRoute,
];

@NgModule({
    imports: [
        McErpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerOrderMcComponent,
        CustomerOrderMcDetailComponent,
        CustomerOrderMcDialogComponent,
        CustomerOrderMcDeleteDialogComponent,
        CustomerOrderMcPopupComponent,
        CustomerOrderMcDeletePopupComponent,
    ],
    entryComponents: [
        CustomerOrderMcComponent,
        CustomerOrderMcDialogComponent,
        CustomerOrderMcPopupComponent,
        CustomerOrderMcDeleteDialogComponent,
        CustomerOrderMcDeletePopupComponent,
    ],
    providers: [
        CustomerOrderMcService,
        CustomerOrderMcPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class McErpCustomerOrderMcModule {}
