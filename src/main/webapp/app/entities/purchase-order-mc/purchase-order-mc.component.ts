import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PurchaseOrderMc } from './purchase-order-mc.model';
import { PurchaseOrderMcService } from './purchase-order-mc.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-purchase-order-mc',
    templateUrl: './purchase-order-mc.component.html'
})
export class PurchaseOrderMcComponent implements OnInit, OnDestroy {
purchaseOrders: PurchaseOrderMc[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private purchaseOrderService: PurchaseOrderMcService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.purchaseOrderService.query().subscribe(
            (res: HttpResponse<PurchaseOrderMc[]>) => {
                this.purchaseOrders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPurchaseOrders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PurchaseOrderMc) {
        return item.id;
    }
    registerChangeInPurchaseOrders() {
        this.eventSubscriber = this.eventManager.subscribe('purchaseOrderListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
