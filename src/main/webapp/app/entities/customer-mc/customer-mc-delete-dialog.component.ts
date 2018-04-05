import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerMc } from './customer-mc.model';
import { CustomerMcPopupService } from './customer-mc-popup.service';
import { CustomerMcService } from './customer-mc.service';

@Component({
    selector: 'jhi-customer-mc-delete-dialog',
    templateUrl: './customer-mc-delete-dialog.component.html'
})
export class CustomerMcDeleteDialogComponent {

    customer: CustomerMc;

    constructor(
        private customerService: CustomerMcService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'customerListModification',
                content: 'Deleted an customer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-mc-delete-popup',
    template: ''
})
export class CustomerMcDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerPopupService: CustomerMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.customerPopupService
                .open(CustomerMcDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
