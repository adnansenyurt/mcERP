import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SupplyPartContractMc } from './supply-part-contract-mc.model';
import { SupplyPartContractMcPopupService } from './supply-part-contract-mc-popup.service';
import { SupplyPartContractMcService } from './supply-part-contract-mc.service';

@Component({
    selector: 'jhi-supply-part-contract-mc-delete-dialog',
    templateUrl: './supply-part-contract-mc-delete-dialog.component.html'
})
export class SupplyPartContractMcDeleteDialogComponent {

    supplyPartContract: SupplyPartContractMc;

    constructor(
        private supplyPartContractService: SupplyPartContractMcService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.supplyPartContractService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'supplyPartContractListModification',
                content: 'Deleted an supplyPartContract'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-supply-part-contract-mc-delete-popup',
    template: ''
})
export class SupplyPartContractMcDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supplyPartContractPopupService: SupplyPartContractMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.supplyPartContractPopupService
                .open(SupplyPartContractMcDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
