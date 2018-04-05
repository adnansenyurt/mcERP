import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CustomerMcComponent } from './customer-mc.component';
import { CustomerMcDetailComponent } from './customer-mc-detail.component';
import { CustomerMcPopupComponent } from './customer-mc-dialog.component';
import { CustomerMcDeletePopupComponent } from './customer-mc-delete-dialog.component';

export const customerRoute: Routes = [
    {
        path: 'customer-mc',
        component: CustomerMcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'customer-mc/:id',
        component: CustomerMcDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerPopupRoute: Routes = [
    {
        path: 'customer-mc-new',
        component: CustomerMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-mc/:id/edit',
        component: CustomerMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-mc/:id/delete',
        component: CustomerMcDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
