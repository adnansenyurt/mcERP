import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InvoiceMc } from './invoice-mc.model';
import { InvoiceMcService } from './invoice-mc.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-invoice-mc',
    templateUrl: './invoice-mc.component.html'
})
export class InvoiceMcComponent implements OnInit, OnDestroy {
invoices: InvoiceMc[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private invoiceService: InvoiceMcService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.invoiceService.query().subscribe(
            (res: HttpResponse<InvoiceMc[]>) => {
                this.invoices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInvoices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: InvoiceMc) {
        return item.id;
    }
    registerChangeInInvoices() {
        this.eventSubscriber = this.eventManager.subscribe('invoiceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
