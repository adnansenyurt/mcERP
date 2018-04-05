import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CustomerOrderMc } from './customer-order-mc.model';
import { CustomerOrderMcService } from './customer-order-mc.service';

@Injectable()
export class CustomerOrderMcPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private customerOrderService: CustomerOrderMcService

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
                this.customerOrderService.find(id)
                    .subscribe((customerOrderResponse: HttpResponse<CustomerOrderMc>) => {
                        const customerOrder: CustomerOrderMc = customerOrderResponse.body;
                        customerOrder.dateOpened = this.datePipe
                            .transform(customerOrder.dateOpened, 'yyyy-MM-ddTHH:mm:ss');
                        customerOrder.datePaymentDue = this.datePipe
                            .transform(customerOrder.datePaymentDue, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.customerOrderModalRef(component, customerOrder);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.customerOrderModalRef(component, new CustomerOrderMc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    customerOrderModalRef(component: Component, customerOrder: CustomerOrderMc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.customerOrder = customerOrder;
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
