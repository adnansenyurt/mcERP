import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OpportunityMc } from './opportunity-mc.model';
import { OpportunityMcPopupService } from './opportunity-mc-popup.service';
import { OpportunityMcService } from './opportunity-mc.service';
import { CustomerProposalMc, CustomerProposalMcService } from '../customer-proposal-mc';
import { ProductMc, ProductMcService } from '../product-mc';

@Component({
    selector: 'jhi-opportunity-mc-dialog',
    templateUrl: './opportunity-mc-dialog.component.html'
})
export class OpportunityMcDialogComponent implements OnInit {

    opportunity: OpportunityMc;
    isSaving: boolean;

    customerproposals: CustomerProposalMc[];

    products: ProductMc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private opportunityService: OpportunityMcService,
        private customerProposalService: CustomerProposalMcService,
        private productService: ProductMcService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerProposalService.query()
            .subscribe((res: HttpResponse<CustomerProposalMc[]>) => { this.customerproposals = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productService.query()
            .subscribe((res: HttpResponse<ProductMc[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerProposalById(index: number, item: CustomerProposalMc) {
        return item.id;
    }

    trackProductById(index: number, item: ProductMc) {
        return item.id;
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
