import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerOrderMc } from './customer-order-mc.model';
import { CustomerOrderMcPopupService } from './customer-order-mc-popup.service';
import { CustomerOrderMcService } from './customer-order-mc.service';

@Component({
    selector: 'jhi-customer-order-mc-delete-dialog',
    templateUrl: './customer-order-mc-delete-dialog.component.html'
})
export class CustomerOrderMcDeleteDialogComponent {

    customerOrder: CustomerOrderMc;

    constructor(
        private customerOrderService: CustomerOrderMcService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerOrderService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'customerOrderListModification',
                content: 'Deleted an customerOrder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-order-mc-delete-popup',
    template: ''
})
export class CustomerOrderMcDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerOrderPopupService: CustomerOrderMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.customerOrderPopupService
                .open(CustomerOrderMcDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
