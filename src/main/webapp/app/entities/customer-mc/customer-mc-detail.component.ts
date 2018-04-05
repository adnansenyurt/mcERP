import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerMc } from './customer-mc.model';
import { CustomerMcService } from './customer-mc.service';

@Component({
    selector: 'jhi-customer-mc-detail',
    templateUrl: './customer-mc-detail.component.html'
})
export class CustomerMcDetailComponent implements OnInit, OnDestroy {

    customer: CustomerMc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private customerService: CustomerMcService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCustomers();
    }

    load(id) {
        this.customerService.find(id)
            .subscribe((customerResponse: HttpResponse<CustomerMc>) => {
                this.customer = customerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCustomers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'customerListModification',
            (response) => this.load(this.customer.id)
        );
    }
}
