import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SupplyStockMc } from './supply-stock-mc.model';
import { SupplyStockMcPopupService } from './supply-stock-mc-popup.service';
import { SupplyStockMcService } from './supply-stock-mc.service';

@Component({
    selector: 'jhi-supply-stock-mc-dialog',
    templateUrl: './supply-stock-mc-dialog.component.html'
})
export class SupplyStockMcDialogComponent implements OnInit {

    supplyStock: SupplyStockMc;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private supplyStockService: SupplyStockMcService,
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
        if (this.supplyStock.id !== undefined) {
            this.subscribeToSaveResponse(
                this.supplyStockService.update(this.supplyStock));
        } else {
            this.subscribeToSaveResponse(
                this.supplyStockService.create(this.supplyStock));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SupplyStockMc>>) {
        result.subscribe((res: HttpResponse<SupplyStockMc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SupplyStockMc) {
        this.eventManager.broadcast({ name: 'supplyStockListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-supply-stock-mc-popup',
    template: ''
})
export class SupplyStockMcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supplyStockPopupService: SupplyStockMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.supplyStockPopupService
                    .open(SupplyStockMcDialogComponent as Component, params['id']);
            } else {
                this.supplyStockPopupService
                    .open(SupplyStockMcDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
