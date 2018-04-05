import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerProposalMc } from './customer-proposal-mc.model';
import { CustomerProposalMcPopupService } from './customer-proposal-mc-popup.service';
import { CustomerProposalMcService } from './customer-proposal-mc.service';

@Component({
    selector: 'jhi-customer-proposal-mc-dialog',
    templateUrl: './customer-proposal-mc-dialog.component.html'
})
export class CustomerProposalMcDialogComponent implements OnInit {

    customerProposal: CustomerProposalMc;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private customerProposalService: CustomerProposalMcService,
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
        if (this.customerProposal.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerProposalService.update(this.customerProposal));
        } else {
            this.subscribeToSaveResponse(
                this.customerProposalService.create(this.customerProposal));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerProposalMc>>) {
        result.subscribe((res: HttpResponse<CustomerProposalMc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerProposalMc) {
        this.eventManager.broadcast({ name: 'customerProposalListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-customer-proposal-mc-popup',
    template: ''
})
export class CustomerProposalMcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerProposalPopupService: CustomerProposalMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.customerProposalPopupService
                    .open(CustomerProposalMcDialogComponent as Component, params['id']);
            } else {
                this.customerProposalPopupService
                    .open(CustomerProposalMcDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
