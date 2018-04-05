import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CustomerOrderMcComponent } from './customer-order-mc.component';
import { CustomerOrderMcDetailComponent } from './customer-order-mc-detail.component';
import { CustomerOrderMcPopupComponent } from './customer-order-mc-dialog.component';
import { CustomerOrderMcDeletePopupComponent } from './customer-order-mc-delete-dialog.component';

export const customerOrderRoute: Routes = [
    {
        path: 'customer-order-mc',
        component: CustomerOrderMcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.customerOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'customer-order-mc/:id',
        component: CustomerOrderMcDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.customerOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerOrderPopupRoute: Routes = [
    {
        path: 'customer-order-mc-new',
        component: CustomerOrderMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.customerOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-order-mc/:id/edit',
        component: CustomerOrderMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.customerOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-order-mc/:id/delete',
        component: CustomerOrderMcDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.customerOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
