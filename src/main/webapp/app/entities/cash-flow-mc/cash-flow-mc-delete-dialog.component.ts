import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CashFlowMc } from './cash-flow-mc.model';
import { CashFlowMcPopupService } from './cash-flow-mc-popup.service';
import { CashFlowMcService } from './cash-flow-mc.service';

@Component({
    selector: 'jhi-cash-flow-mc-delete-dialog',
    templateUrl: './cash-flow-mc-delete-dialog.component.html'
})
export class CashFlowMcDeleteDialogComponent {

    cashFlow: CashFlowMc;

    constructor(
        private cashFlowService: CashFlowMcService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cashFlowService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cashFlowListModification',
                content: 'Deleted an cashFlow'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cash-flow-mc-delete-popup',
    template: ''
})
export class CashFlowMcDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashFlowPopupService: CashFlowMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cashFlowPopupService
                .open(CashFlowMcDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
