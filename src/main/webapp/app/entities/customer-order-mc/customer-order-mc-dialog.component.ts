import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomerOrderMc } from './customer-order-mc.model';
import { CustomerOrderMcPopupService } from './customer-order-mc-popup.service';
import { CustomerOrderMcService } from './customer-order-mc.service';
import { CustomerMc, CustomerMcService } from '../customer-mc';
import { CustomerProposalMc, CustomerProposalMcService } from '../customer-proposal-mc';

@Component({
    selector: 'jhi-customer-order-mc-dialog',
    templateUrl: './customer-order-mc-dialog.component.html'
})
export class CustomerOrderMcDialogComponent implements OnInit {

    customerOrder: CustomerOrderMc;
    isSaving: boolean;

    customers: CustomerMc[];

    proposals: CustomerProposalMc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private customerOrderService: CustomerOrderMcService,
        private customerService: CustomerMcService,
        private customerProposalService: CustomerProposalMcService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: HttpResponse<CustomerMc[]>) => { this.customers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.customerProposalService
            .query({filter: 'customerorder-is-null'})
            .subscribe((res: HttpResponse<CustomerProposalMc[]>) => {
                if (!this.customerOrder.proposalId) {
                    this.proposals = res.body;
                } else {
                    this.customerProposalService
                        .find(this.customerOrder.proposalId)
                        .subscribe((subRes: HttpResponse<CustomerProposalMc>) => {
                            this.proposals = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.customerOrder.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerOrderService.update(this.customerOrder));
        } else {
            this.subscribeToSaveResponse(
                this.customerOrderService.create(this.customerOrder));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerOrderMc>>) {
        result.subscribe((res: HttpResponse<CustomerOrderMc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerOrderMc) {
        this.eventManager.broadcast({ name: 'customerOrderListModification', content: 'OK'});
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

    trackCustomerProposalById(index: number, item: CustomerProposalMc) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-customer-order-mc-popup',
    template: ''
})
export class CustomerOrderMcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerOrderPopupService: CustomerOrderMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.customerOrderPopupService
                    .open(CustomerOrderMcDialogComponent as Component, params['id']);
            } else {
                this.customerOrderPopupService
                    .open(CustomerOrderMcDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
