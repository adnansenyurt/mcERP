import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PurchaseOrderMc } from './purchase-order-mc.model';
import { PurchaseOrderMcPopupService } from './purchase-order-mc-popup.service';
import { PurchaseOrderMcService } from './purchase-order-mc.service';

@Component({
    selector: 'jhi-purchase-order-mc-delete-dialog',
    templateUrl: './purchase-order-mc-delete-dialog.component.html'
})
export class PurchaseOrderMcDeleteDialogComponent {

    purchaseOrder: PurchaseOrderMc;

    constructor(
        private purchaseOrderService: PurchaseOrderMcService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.purchaseOrderService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'purchaseOrderListModification',
                content: 'Deleted an purchaseOrder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-purchase-order-mc-delete-popup',
    template: ''
})
export class PurchaseOrderMcDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private purchaseOrderPopupService: PurchaseOrderMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.purchaseOrderPopupService
                .open(PurchaseOrderMcDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
