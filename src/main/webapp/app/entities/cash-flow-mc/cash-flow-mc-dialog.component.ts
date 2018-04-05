import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CashFlowMc } from './cash-flow-mc.model';
import { CashFlowMcPopupService } from './cash-flow-mc-popup.service';
import { CashFlowMcService } from './cash-flow-mc.service';

@Component({
    selector: 'jhi-cash-flow-mc-dialog',
    templateUrl: './cash-flow-mc-dialog.component.html'
})
export class CashFlowMcDialogComponent implements OnInit {

    cashFlow: CashFlowMc;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private cashFlowService: CashFlowMcService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cashFlow.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cashFlowService.update(this.cashFlow));
        } else {
            this.subscribeToSaveResponse(
                this.cashFlowService.create(this.cashFlow));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CashFlowMc>>) {
        result.subscribe((res: HttpResponse<CashFlowMc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CashFlowMc) {
        this.eventManager.broadcast({ name: 'cashFlowListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-cash-flow-mc-popup',
    template: ''
})
export class CashFlowMcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashFlowPopupService: CashFlowMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cashFlowPopupService
                    .open(CashFlowMcDialogComponent as Component, params['id']);
            } else {
                this.cashFlowPopupService
                    .open(CashFlowMcDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
