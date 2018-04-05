import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerProposalMc } from './customer-proposal-mc.model';
import { CustomerProposalMcPopupService } from './customer-proposal-mc-popup.service';
import { CustomerProposalMcService } from './customer-proposal-mc.service';

@Component({
    selector: 'jhi-customer-proposal-mc-delete-dialog',
    templateUrl: './customer-proposal-mc-delete-dialog.component.html'
})
export class CustomerProposalMcDeleteDialogComponent {

    customerProposal: CustomerProposalMc;

    constructor(
        private customerProposalService: CustomerProposalMcService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerProposalService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'customerProposalListModification',
                content: 'Deleted an customerProposal'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-proposal-mc-delete-popup',
    template: ''
})
export class CustomerProposalMcDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerProposalPopupService: CustomerProposalMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.customerProposalPopupService
                .open(CustomerProposalMcDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
