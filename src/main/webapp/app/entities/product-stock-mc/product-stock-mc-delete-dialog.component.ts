import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductStockMc } from './product-stock-mc.model';
import { ProductStockMcPopupService } from './product-stock-mc-popup.service';
import { ProductStockMcService } from './product-stock-mc.service';

@Component({
    selector: 'jhi-product-stock-mc-delete-dialog',
    templateUrl: './product-stock-mc-delete-dialog.component.html'
})
export class ProductStockMcDeleteDialogComponent {

    productStock: ProductStockMc;

    constructor(
        private productStockService: ProductStockMcService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productStockService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'productStockListModification',
                content: 'Deleted an productStock'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-stock-mc-delete-popup',
    template: ''
})
export class ProductStockMcDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productStockPopupService: ProductStockMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.productStockPopupService
                .open(ProductStockMcDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
