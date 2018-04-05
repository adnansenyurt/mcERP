import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BillOfMaterialsMc } from './bill-of-materials-mc.model';
import { BillOfMaterialsMcPopupService } from './bill-of-materials-mc-popup.service';
import { BillOfMaterialsMcService } from './bill-of-materials-mc.service';

@Component({
    selector: 'jhi-bill-of-materials-mc-delete-dialog',
    templateUrl: './bill-of-materials-mc-delete-dialog.component.html'
})
export class BillOfMaterialsMcDeleteDialogComponent {

    billOfMaterials: BillOfMaterialsMc;

    constructor(
        private billOfMaterialsService: BillOfMaterialsMcService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.billOfMaterialsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'billOfMaterialsListModification',
                content: 'Deleted an billOfMaterials'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bill-of-materials-mc-delete-popup',
    template: ''
})
export class BillOfMaterialsMcDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billOfMaterialsPopupService: BillOfMaterialsMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.billOfMaterialsPopupService
                .open(BillOfMaterialsMcDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
