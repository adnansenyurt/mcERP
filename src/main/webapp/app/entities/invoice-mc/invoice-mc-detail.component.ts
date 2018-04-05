import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceMc } from './invoice-mc.model';
import { InvoiceMcService } from './invoice-mc.service';

@Component({
    selector: 'jhi-invoice-mc-detail',
    templateUrl: './invoice-mc-detail.component.html'
})
export class InvoiceMcDetailComponent implements OnInit, OnDestroy {

    invoice: InvoiceMc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private invoiceService: InvoiceMcService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInvoices();
    }

    load(id) {
        this.invoiceService.find(id)
            .subscribe((invoiceResponse: HttpResponse<InvoiceMc>) => {
                this.invoice = invoiceResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInvoices() {
        this.eventSubscriber = this.eventManager.subscribe(
            'invoiceListModification',
            (response) => this.load(this.invoice.id)
        );
    }
}
