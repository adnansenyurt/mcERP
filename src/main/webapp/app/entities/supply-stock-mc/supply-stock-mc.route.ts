import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SupplyStockMcComponent } from './supply-stock-mc.component';
import { SupplyStockMcDetailComponent } from './supply-stock-mc-detail.component';
import { SupplyStockMcPopupComponent } from './supply-stock-mc-dialog.component';
import { SupplyStockMcDeletePopupComponent } from './supply-stock-mc-delete-dialog.component';

export const supplyStockRoute: Routes = [
    {
        path: 'supply-stock-mc',
        component: SupplyStockMcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplyStock.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'supply-stock-mc/:id',
        component: SupplyStockMcDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplyStock.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const supplyStockPopupRoute: Routes = [
    {
        path: 'supply-stock-mc-new',
        component: SupplyStockMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplyStock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supply-stock-mc/:id/edit',
        component: SupplyStockMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplyStock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supply-stock-mc/:id/delete',
        component: SupplyStockMcDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplyStock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
