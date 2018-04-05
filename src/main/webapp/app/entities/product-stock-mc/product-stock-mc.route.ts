import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProductStockMcComponent } from './product-stock-mc.component';
import { ProductStockMcDetailComponent } from './product-stock-mc-detail.component';
import { ProductStockMcPopupComponent } from './product-stock-mc-dialog.component';
import { ProductStockMcDeletePopupComponent } from './product-stock-mc-delete-dialog.component';

export const productStockRoute: Routes = [
    {
        path: 'product-stock-mc',
        component: ProductStockMcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.productStock.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-stock-mc/:id',
        component: ProductStockMcDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.productStock.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productStockPopupRoute: Routes = [
    {
        path: 'product-stock-mc-new',
        component: ProductStockMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.productStock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-stock-mc/:id/edit',
        component: ProductStockMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.productStock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-stock-mc/:id/delete',
        component: ProductStockMcDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.productStock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
