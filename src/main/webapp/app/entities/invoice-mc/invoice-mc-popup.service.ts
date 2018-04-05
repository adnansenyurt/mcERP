import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { InvoiceMc } from './invoice-mc.model';
import { InvoiceMcService } from './invoice-mc.service';

@Injectable()
export class InvoiceMcPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private invoiceService: InvoiceMcService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.invoiceService.find(id)
                    .subscribe((invoiceResponse: HttpResponse<InvoiceMc>) => {
                        const invoice: InvoiceMc = invoiceResponse.body;
                        invoice.dateIssued = this.datePipe
                            .transform(invoice.dateIssued, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.invoiceModalRef(component, invoice);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.invoiceModalRef(component, new InvoiceMc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    invoiceModalRef(component: Component, invoice: InvoiceMc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.invoice = invoice;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
