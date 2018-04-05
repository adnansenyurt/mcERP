import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ContactPersonMcComponent } from './contact-person-mc.component';
import { ContactPersonMcDetailComponent } from './contact-person-mc-detail.component';
import { ContactPersonMcPopupComponent } from './contact-person-mc-dialog.component';
import { ContactPersonMcDeletePopupComponent } from './contact-person-mc-delete-dialog.component';

export const contactPersonRoute: Routes = [
    {
        path: 'contact-person-mc',
        component: ContactPersonMcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.contactPerson.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'contact-person-mc/:id',
        component: ContactPersonMcDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.contactPerson.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contactPersonPopupRoute: Routes = [
    {
        path: 'contact-person-mc-new',
        component: ContactPersonMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.contactPerson.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contact-person-mc/:id/edit',
        component: ContactPersonMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.contactPerson.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contact-person-mc/:id/delete',
        component: ContactPersonMcDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.contactPerson.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
