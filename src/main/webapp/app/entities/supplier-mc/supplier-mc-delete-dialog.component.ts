import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SupplierMc } from './supplier-mc.model';
import { SupplierMcPopupService } from './supplier-mc-popup.service';
import { SupplierMcService } from './supplier-mc.service';

@Component({
    selector: 'jhi-supplier-mc-delete-dialog',
    templateUrl: './supplier-mc-delete-dialog.component.html'
})
export class SupplierMcDeleteDialogComponent {

    supplier: SupplierMc;

    constructor(
        private supplierService: SupplierMcService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.supplierService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'supplierListModification',
                content: 'Deleted an supplier'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-supplier-mc-delete-popup',
    template: ''
})
export class SupplierMcDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supplierPopupService: SupplierMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.supplierPopupService
                .open(SupplierMcDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
