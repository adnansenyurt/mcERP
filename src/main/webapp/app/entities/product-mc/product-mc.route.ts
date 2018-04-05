import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProductMcComponent } from './product-mc.component';
import { ProductMcDetailComponent } from './product-mc-detail.component';
import { ProductMcPopupComponent } from './product-mc-dialog.component';
import { ProductMcDeletePopupComponent } from './product-mc-delete-dialog.component';

export const productRoute: Routes = [
    {
        path: 'product-mc',
        component: ProductMcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-mc/:id',
        component: ProductMcDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productPopupRoute: Routes = [
    {
        path: 'product-mc-new',
        component: ProductMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-mc/:id/edit',
        component: ProductMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-mc/:id/delete',
        component: ProductMcDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
