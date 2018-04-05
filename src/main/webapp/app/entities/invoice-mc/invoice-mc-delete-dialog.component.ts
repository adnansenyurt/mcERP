import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceMc } from './invoice-mc.model';
import { InvoiceMcPopupService } from './invoice-mc-popup.service';
import { InvoiceMcService } from './invoice-mc.service';

@Component({
    selector: 'jhi-invoice-mc-delete-dialog',
    templateUrl: './invoice-mc-delete-dialog.component.html'
})
export class InvoiceMcDeleteDialogComponent {

    invoice: InvoiceMc;

    constructor(
        private invoiceService: InvoiceMcService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.invoiceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'invoiceListModification',
                content: 'Deleted an invoice'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-invoice-mc-delete-popup',
    template: ''
})
export class InvoiceMcDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoicePopupService: InvoiceMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.invoicePopupService
                .open(InvoiceMcDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
