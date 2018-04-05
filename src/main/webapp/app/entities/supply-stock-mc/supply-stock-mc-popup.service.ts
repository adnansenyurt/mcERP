import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SupplyStockMc } from './supply-stock-mc.model';
import { SupplyStockMcService } from './supply-stock-mc.service';

@Injectable()
export class SupplyStockMcPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private supplyStockService: SupplyStockMcService

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
                this.supplyStockService.find(id)
                    .subscribe((supplyStockResponse: HttpResponse<SupplyStockMc>) => {
                        const supplyStock: SupplyStockMc = supplyStockResponse.body;
                        this.ngbModalRef = this.supplyStockModalRef(component, supplyStock);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.supplyStockModalRef(component, new SupplyStockMc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    supplyStockModalRef(component: Component, supplyStock: SupplyStockMc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.supplyStock = supplyStock;
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
