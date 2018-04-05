import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PurchaseOrderMc } from './purchase-order-mc.model';
import { PurchaseOrderMcService } from './purchase-order-mc.service';

@Component({
    selector: 'jhi-purchase-order-mc-detail',
    templateUrl: './purchase-order-mc-detail.component.html'
})
export class PurchaseOrderMcDetailComponent implements OnInit, OnDestroy {

    purchaseOrder: PurchaseOrderMc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private purchaseOrderService: PurchaseOrderMcService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPurchaseOrders();
    }

    load(id) {
        this.purchaseOrderService.find(id)
            .subscribe((purchaseOrderResponse: HttpResponse<PurchaseOrderMc>) => {
                this.purchaseOrder = purchaseOrderResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPurchaseOrders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'purchaseOrderListModification',
            (response) => this.load(this.purchaseOrder.id)
        );
    }
}
