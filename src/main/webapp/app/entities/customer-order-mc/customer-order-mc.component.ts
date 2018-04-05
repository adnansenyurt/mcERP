import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomerOrderMc } from './customer-order-mc.model';
import { CustomerOrderMcService } from './customer-order-mc.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-customer-order-mc',
    templateUrl: './customer-order-mc.component.html'
})
export class CustomerOrderMcComponent implements OnInit, OnDestroy {
customerOrders: CustomerOrderMc[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private customerOrderService: CustomerOrderMcService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.customerOrderService.query().subscribe(
            (res: HttpResponse<CustomerOrderMc[]>) => {
                this.customerOrders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCustomerOrders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CustomerOrderMc) {
        return item.id;
    }
    registerChangeInCustomerOrders() {
        this.eventSubscriber = this.eventManager.subscribe('customerOrderListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
