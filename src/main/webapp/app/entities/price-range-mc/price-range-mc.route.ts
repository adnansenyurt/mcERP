import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PriceRangeMcComponent } from './price-range-mc.component';
import { PriceRangeMcDetailComponent } from './price-range-mc-detail.component';
import { PriceRangeMcPopupComponent } from './price-range-mc-dialog.component';
import { PriceRangeMcDeletePopupComponent } from './price-range-mc-delete-dialog.component';

export const priceRangeRoute: Routes = [
    {
        path: 'price-range-mc',
        component: PriceRangeMcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.priceRange.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'price-range-mc/:id',
        component: PriceRangeMcDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.priceRange.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const priceRangePopupRoute: Routes = [
    {
        path: 'price-range-mc-new',
        component: PriceRangeMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.priceRange.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'price-range-mc/:id/edit',
        component: PriceRangeMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.priceRange.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'price-range-mc/:id/delete',
        component: PriceRangeMcDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.priceRange.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
