import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { McErpSharedModule } from '../../shared';
import {
    InvoiceMcService,
    InvoiceMcPopupService,
    InvoiceMcComponent,
    InvoiceMcDetailComponent,
    InvoiceMcDialogComponent,
    InvoiceMcPopupComponent,
    InvoiceMcDeletePopupComponent,
    InvoiceMcDeleteDialogComponent,
    invoiceRoute,
    invoicePopupRoute,
} from './';

const ENTITY_STATES = [
    ...invoiceRoute,
    ...invoicePopupRoute,
];

@NgModule({
    imports: [
        McErpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InvoiceMcComponent,
        InvoiceMcDetailComponent,
        InvoiceMcDialogComponent,
        InvoiceMcDeleteDialogComponent,
        InvoiceMcPopupComponent,
        InvoiceMcDeletePopupComponent,
    ],
    entryComponents: [
        InvoiceMcComponent,
        InvoiceMcDialogComponent,
        InvoiceMcPopupComponent,
        InvoiceMcDeleteDialogComponent,
        InvoiceMcDeletePopupComponent,
    ],
    providers: [
        InvoiceMcService,
        InvoiceMcPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class McErpInvoiceMcModule {}
