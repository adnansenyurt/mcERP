import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OpportunityMc } from './opportunity-mc.model';
import { OpportunityMcPopupService } from './opportunity-mc-popup.service';
import { OpportunityMcService } from './opportunity-mc.service';

@Component({
    selector: 'jhi-opportunity-mc-dialog',
    templateUrl: './opportunity-mc-dialog.component.html'
})
export class OpportunityMcDialogComponent implements OnInit {

    opportunity: OpportunityMc;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private opportunityService: OpportunityMcService,
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
        if (this.opportunity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.opportunityService.update(this.opportunity));
        } else {
            this.subscribeToSaveResponse(
                this.opportunityService.create(this.opportunity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OpportunityMc>>) {
        result.subscribe((res: HttpResponse<OpportunityMc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OpportunityMc) {
        this.eventManager.broadcast({ name: 'opportunityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-opportunity-mc-popup',
    template: ''
})
export class OpportunityMcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private opportunityPopupService: OpportunityMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.opportunityPopupService
                    .open(OpportunityMcDialogComponent as Component, params['id']);
            } else {
                this.opportunityPopupService
                    .open(OpportunityMcDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
