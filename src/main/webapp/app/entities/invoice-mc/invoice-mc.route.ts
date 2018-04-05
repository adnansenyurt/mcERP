import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { InvoiceMcComponent } from './invoice-mc.component';
import { InvoiceMcDetailComponent } from './invoice-mc-detail.component';
import { InvoiceMcPopupComponent } from './invoice-mc-dialog.component';
import { InvoiceMcDeletePopupComponent } from './invoice-mc-delete-dialog.component';

export const invoiceRoute: Routes = [
    {
        path: 'invoice-mc',
        component: InvoiceMcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'invoice-mc/:id',
        component: InvoiceMcDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invoicePopupRoute: Routes = [
    {
        path: 'invoice-mc-new',
        component: InvoiceMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-mc/:id/edit',
        component: InvoiceMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-mc/:id/delete',
        component: InvoiceMcDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
