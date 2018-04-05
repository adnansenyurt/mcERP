import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InvoiceMc } from './invoice-mc.model';
import { InvoiceMcPopupService } from './invoice-mc-popup.service';
import { InvoiceMcService } from './invoice-mc.service';
import { CustomerMc, CustomerMcService } from '../customer-mc';
import { CustomerOrderMc, CustomerOrderMcService } from '../customer-order-mc';

@Component({
    selector: 'jhi-invoice-mc-dialog',
    templateUrl: './invoice-mc-dialog.component.html'
})
export class InvoiceMcDialogComponent implements OnInit {

    invoice: InvoiceMc;
    isSaving: boolean;

    customers: CustomerMc[];

    customerorders: CustomerOrderMc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private invoiceService: InvoiceMcService,
        private customerService: CustomerMcService,
        private customerOrderService: CustomerOrderMcService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: HttpResponse<CustomerMc[]>) => { this.customers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.customerOrderService
            .query({filter: 'invoice-is-null'})
            .subscribe((res: HttpResponse<CustomerOrderMc[]>) => {
                if (!this.invoice.customerOrderId) {
                    this.customerorders = res.body;
                } else {
                    this.customerOrderService
                        .find(this.invoice.customerOrderId)
                        .subscribe((subRes: HttpResponse<CustomerOrderMc>) => {
                            this.customerorders = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.invoice.id !== undefined) {
            this.subscribeToSaveResponse(
                this.invoiceService.update(this.invoice));
        } else {
            this.subscribeToSaveResponse(
                this.invoiceService.create(this.invoice));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<InvoiceMc>>) {
        result.subscribe((res: HttpResponse<InvoiceMc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: InvoiceMc) {
        this.eventManager.broadcast({ name: 'invoiceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: CustomerMc) {
        return item.id;
    }

    trackCustomerOrderById(index: number, item: CustomerOrderMc) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-invoice-mc-popup',
    template: ''
})
export class InvoiceMcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoicePopupService: InvoiceMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.invoicePopupService
                    .open(InvoiceMcDialogComponent as Component, params['id']);
            } else {
                this.invoicePopupService
                    .open(InvoiceMcDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
