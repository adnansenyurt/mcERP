import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SupplierContractMc } from './supplier-contract-mc.model';
import { SupplierContractMcPopupService } from './supplier-contract-mc-popup.service';
import { SupplierContractMcService } from './supplier-contract-mc.service';

@Component({
    selector: 'jhi-supplier-contract-mc-delete-dialog',
    templateUrl: './supplier-contract-mc-delete-dialog.component.html'
})
export class SupplierContractMcDeleteDialogComponent {

    supplierContract: SupplierContractMc;

    constructor(
        private supplierContractService: SupplierContractMcService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.supplierContractService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'supplierContractListModification',
                content: 'Deleted an supplierContract'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-supplier-contract-mc-delete-popup',
    template: ''
})
export class SupplierContractMcDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supplierContractPopupService: SupplierContractMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.supplierContractPopupService
                .open(SupplierContractMcDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
