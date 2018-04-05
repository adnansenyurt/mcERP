import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerOrderMc } from './customer-order-mc.model';
import { CustomerOrderMcService } from './customer-order-mc.service';

@Component({
    selector: 'jhi-customer-order-mc-detail',
    templateUrl: './customer-order-mc-detail.component.html'
})
export class CustomerOrderMcDetailComponent implements OnInit, OnDestroy {

    customerOrder: CustomerOrderMc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private customerOrderService: CustomerOrderMcService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCustomerOrders();
    }

    load(id) {
        this.customerOrderService.find(id)
            .subscribe((customerOrderResponse: HttpResponse<CustomerOrderMc>) => {
                this.customerOrder = customerOrderResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCustomerOrders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'customerOrderListModification',
            (response) => this.load(this.customerOrder.id)
        );
    }
}
