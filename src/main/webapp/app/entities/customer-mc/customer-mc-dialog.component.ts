import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomerMc } from './customer-mc.model';
import { CustomerMcPopupService } from './customer-mc-popup.service';
import { CustomerMcService } from './customer-mc.service';
import { ContactPersonMc, ContactPersonMcService } from '../contact-person-mc';
import { OpportunityMc, OpportunityMcService } from '../opportunity-mc';
import { CustomerOrderMc, CustomerOrderMcService } from '../customer-order-mc';
import { InvoiceMc, InvoiceMcService } from '../invoice-mc';
import { CustomerProposalMc, CustomerProposalMcService } from '../customer-proposal-mc';

@Component({
    selector: 'jhi-customer-mc-dialog',
    templateUrl: './customer-mc-dialog.component.html'
})
export class CustomerMcDialogComponent implements OnInit {

    customer: CustomerMc;
    isSaving: boolean;

    contactpeople: ContactPersonMc[];

    opportunities: OpportunityMc[];

    customerorders: CustomerOrderMc[];

    invoices: InvoiceMc[];

    customerproposals: CustomerProposalMc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private customerService: CustomerMcService,
        private contactPersonService: ContactPersonMcService,
        private opportunityService: OpportunityMcService,
        private customerOrderService: CustomerOrderMcService,
        private invoiceService: InvoiceMcService,
        private customerProposalService: CustomerProposalMcService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.contactPersonService.query()
            .subscribe((res: HttpResponse<ContactPersonMc[]>) => { this.contactpeople = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.opportunityService.query()
            .subscribe((res: HttpResponse<OpportunityMc[]>) => { this.opportunities = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.customerOrderService.query()
            .subscribe((res: HttpResponse<CustomerOrderMc[]>) => { this.customerorders = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.invoiceService.query()
            .subscribe((res: HttpResponse<InvoiceMc[]>) => { this.invoices = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.customerProposalService.query()
            .subscribe((res: HttpResponse<CustomerProposalMc[]>) => { this.customerproposals = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.customer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerService.update(this.customer));
        } else {
            this.subscribeToSaveResponse(
                this.customerService.create(this.customer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerMc>>) {
        result.subscribe((res: HttpResponse<CustomerMc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerMc) {
        this.eventManager.broadcast({ name: 'customerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackContactPersonById(index: number, item: ContactPersonMc) {
        return item.id;
    }

    trackOpportunityById(index: number, item: OpportunityMc) {
        return item.id;
    }

    trackCustomerOrderById(index: number, item: CustomerOrderMc) {
        return item.id;
    }

    trackInvoiceById(index: number, item: InvoiceMc) {
        return item.id;
    }

    trackCustomerProposalById(index: number, item: CustomerProposalMc) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-customer-mc-popup',
    template: ''
})
export class CustomerMcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerPopupService: CustomerMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.customerPopupService
                    .open(CustomerMcDialogComponent as Component, params['id']);
            } else {
                this.customerPopupService
                    .open(CustomerMcDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
