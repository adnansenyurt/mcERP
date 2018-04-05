import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ContactPersonMc } from './contact-person-mc.model';
import { ContactPersonMcPopupService } from './contact-person-mc-popup.service';
import { ContactPersonMcService } from './contact-person-mc.service';
import { CustomerMc, CustomerMcService } from '../customer-mc';
import { SupplierMc, SupplierMcService } from '../supplier-mc';

@Component({
    selector: 'jhi-contact-person-mc-dialog',
    templateUrl: './contact-person-mc-dialog.component.html'
})
export class ContactPersonMcDialogComponent implements OnInit {

    contactPerson: ContactPersonMc;
    isSaving: boolean;

    customers: CustomerMc[];

    suppliers: SupplierMc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private contactPersonService: ContactPersonMcService,
        private customerService: CustomerMcService,
        private supplierService: SupplierMcService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: HttpResponse<CustomerMc[]>) => { this.customers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.supplierService.query()
            .subscribe((res: HttpResponse<SupplierMc[]>) => { this.suppliers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.contactPerson.id !== undefined) {
            this.subscribeToSaveResponse(
                this.contactPersonService.update(this.contactPerson));
        } else {
            this.subscribeToSaveResponse(
                this.contactPersonService.create(this.contactPerson));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ContactPersonMc>>) {
        result.subscribe((res: HttpResponse<ContactPersonMc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ContactPersonMc) {
        this.eventManager.broadcast({ name: 'contactPersonListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: CustomerMc) {
        return item.id;
    }

    trackSupplierById(index: number, item: SupplierMc) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-contact-person-mc-popup',
    template: ''
})
export class ContactPersonMcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contactPersonPopupService: ContactPersonMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.contactPersonPopupService
                    .open(ContactPersonMcDialogComponent as Component, params['id']);
            } else {
                this.contactPersonPopupService
                    .open(ContactPersonMcDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
