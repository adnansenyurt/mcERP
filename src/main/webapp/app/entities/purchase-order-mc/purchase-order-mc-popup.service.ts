import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PurchaseOrderMc } from './purchase-order-mc.model';
import { PurchaseOrderMcService } from './purchase-order-mc.service';

@Injectable()
export class PurchaseOrderMcPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private purchaseOrderService: PurchaseOrderMcService

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
                this.purchaseOrderService.find(id)
                    .subscribe((purchaseOrderResponse: HttpResponse<PurchaseOrderMc>) => {
                        const purchaseOrder: PurchaseOrderMc = purchaseOrderResponse.body;
                        purchaseOrder.dateOpened = this.datePipe
                            .transform(purchaseOrder.dateOpened, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.purchaseOrderModalRef(component, purchaseOrder);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.purchaseOrderModalRef(component, new PurchaseOrderMc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    purchaseOrderModalRef(component: Component, purchaseOrder: PurchaseOrderMc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.purchaseOrder = purchaseOrder;
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
