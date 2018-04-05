import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ContactPersonMc } from './contact-person-mc.model';
import { ContactPersonMcService } from './contact-person-mc.service';

@Component({
    selector: 'jhi-contact-person-mc-detail',
    templateUrl: './contact-person-mc-detail.component.html'
})
export class ContactPersonMcDetailComponent implements OnInit, OnDestroy {

    contactPerson: ContactPersonMc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private contactPersonService: ContactPersonMcService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInContactPeople();
    }

    load(id) {
        this.contactPersonService.find(id)
            .subscribe((contactPersonResponse: HttpResponse<ContactPersonMc>) => {
                this.contactPerson = contactPersonResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInContactPeople() {
        this.eventSubscriber = this.eventManager.subscribe(
            'contactPersonListModification',
            (response) => this.load(this.contactPerson.id)
        );
    }
}
