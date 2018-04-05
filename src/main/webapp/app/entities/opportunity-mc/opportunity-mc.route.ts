import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OpportunityMcComponent } from './opportunity-mc.component';
import { OpportunityMcDetailComponent } from './opportunity-mc-detail.component';
import { OpportunityMcPopupComponent } from './opportunity-mc-dialog.component';
import { OpportunityMcDeletePopupComponent } from './opportunity-mc-delete-dialog.component';

export const opportunityRoute: Routes = [
    {
        path: 'opportunity-mc',
        component: OpportunityMcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.opportunity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'opportunity-mc/:id',
        component: OpportunityMcDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.opportunity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const opportunityPopupRoute: Routes = [
    {
        path: 'opportunity-mc-new',
        component: OpportunityMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.opportunity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'opportunity-mc/:id/edit',
        component: OpportunityMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.opportunity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'opportunity-mc/:id/delete',
        component: OpportunityMcDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.opportunity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
