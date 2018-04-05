import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SupplyStockMc } from './supply-stock-mc.model';
import { SupplyStockMcPopupService } from './supply-stock-mc-popup.service';
import { SupplyStockMcService } from './supply-stock-mc.service';

@Component({
    selector: 'jhi-supply-stock-mc-delete-dialog',
    templateUrl: './supply-stock-mc-delete-dialog.component.html'
})
export class SupplyStockMcDeleteDialogComponent {

    supplyStock: SupplyStockMc;

    constructor(
        private supplyStockService: SupplyStockMcService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.supplyStockService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'supplyStockListModification',
                content: 'Deleted an supplyStock'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-supply-stock-mc-delete-popup',
    template: ''
})
export class SupplyStockMcDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supplyStockPopupService: SupplyStockMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.supplyStockPopupService
                .open(SupplyStockMcDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
