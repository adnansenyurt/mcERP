import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SupplyPartMc } from './supply-part-mc.model';
import { SupplyPartMcService } from './supply-part-mc.service';

@Injectable()
export class SupplyPartMcPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private supplyPartService: SupplyPartMcService

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
                this.supplyPartService.find(id)
                    .subscribe((supplyPartResponse: HttpResponse<SupplyPartMc>) => {
                        const supplyPart: SupplyPartMc = supplyPartResponse.body;
                        this.ngbModalRef = this.supplyPartModalRef(component, supplyPart);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.supplyPartModalRef(component, new SupplyPartMc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    supplyPartModalRef(component: Component, supplyPart: SupplyPartMc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.supplyPart = supplyPart;
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
