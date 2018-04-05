import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomerOrderMc } from './customer-order-mc.model';
import { CustomerOrderMcPopupService } from './customer-order-mc-popup.service';
import { CustomerOrderMcService } from './customer-order-mc.service';
import { CashFlowMc, CashFlowMcService } from '../cash-flow-mc';

@Component({
    selector: 'jhi-customer-order-mc-dialog',
    templateUrl: './customer-order-mc-dialog.component.html'
})
export class CustomerOrderMcDialogComponent implements OnInit {

    customerOrder: CustomerOrderMc;
    isSaving: boolean;

    cashflows: CashFlowMc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private customerOrderService: CustomerOrderMcService,
        private cashFlowService: CashFlowMcService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cashFlowService.query()
            .subscribe((res: HttpResponse<CashFlowMc[]>) => { this.cashflows = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    trackCashFlowById(index: number, item: CashFlowMc) {
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
