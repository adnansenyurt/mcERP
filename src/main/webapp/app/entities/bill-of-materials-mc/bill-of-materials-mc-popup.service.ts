import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { BillOfMaterialsMc } from './bill-of-materials-mc.model';
import { BillOfMaterialsMcService } from './bill-of-materials-mc.service';

@Injectable()
export class BillOfMaterialsMcPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private billOfMaterialsService: BillOfMaterialsMcService

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
                this.billOfMaterialsService.find(id)
                    .subscribe((billOfMaterialsResponse: HttpResponse<BillOfMaterialsMc>) => {
                        const billOfMaterials: BillOfMaterialsMc = billOfMaterialsResponse.body;
                        this.ngbModalRef = this.billOfMaterialsModalRef(component, billOfMaterials);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.billOfMaterialsModalRef(component, new BillOfMaterialsMc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    billOfMaterialsModalRef(component: Component, billOfMaterials: BillOfMaterialsMc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.billOfMaterials = billOfMaterials;
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
