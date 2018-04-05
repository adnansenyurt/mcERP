import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SupplyPartMc } from './supply-part-mc.model';
import { SupplyPartMcPopupService } from './supply-part-mc-popup.service';
import { SupplyPartMcService } from './supply-part-mc.service';

@Component({
    selector: 'jhi-supply-part-mc-delete-dialog',
    templateUrl: './supply-part-mc-delete-dialog.component.html'
})
export class SupplyPartMcDeleteDialogComponent {

    supplyPart: SupplyPartMc;

    constructor(
        private supplyPartService: SupplyPartMcService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.supplyPartService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'supplyPartListModification',
                content: 'Deleted an supplyPart'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-supply-part-mc-delete-popup',
    template: ''
})
export class SupplyPartMcDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supplyPartPopupService: SupplyPartMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.supplyPartPopupService
                .open(SupplyPartMcDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
