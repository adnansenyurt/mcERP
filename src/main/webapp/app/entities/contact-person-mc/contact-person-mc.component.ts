import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ContactPersonMc } from './contact-person-mc.model';
import { ContactPersonMcService } from './contact-person-mc.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-contact-person-mc',
    templateUrl: './contact-person-mc.component.html'
})
export class ContactPersonMcComponent implements OnInit, OnDestroy {
contactPeople: ContactPersonMc[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private contactPersonService: ContactPersonMcService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.contactPersonService.query().subscribe(
            (res: HttpResponse<ContactPersonMc[]>) => {
                this.contactPeople = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInContactPeople();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ContactPersonMc) {
        return item.id;
    }
    registerChangeInContactPeople() {
        this.eventSubscriber = this.eventManager.subscribe('contactPersonListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
