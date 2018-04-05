/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { McErpTestModule } from '../../../test.module';
import { PurchaseOrderMcDialogComponent } from '../../../../../../main/webapp/app/entities/purchase-order-mc/purchase-order-mc-dialog.component';
import { PurchaseOrderMcService } from '../../../../../../main/webapp/app/entities/purchase-order-mc/purchase-order-mc.service';
import { PurchaseOrderMc } from '../../../../../../main/webapp/app/entities/purchase-order-mc/purchase-order-mc.model';
import { SupplierMcService } from '../../../../../../main/webapp/app/entities/supplier-mc';
import { SupplierContractMcService } from '../../../../../../main/webapp/app/entities/supplier-contract-mc';

describe('Component Tests', () => {

    describe('PurchaseOrderMc Management Dialog Component', () => {
        let comp: PurchaseOrderMcDialogComponent;
        let fixture: ComponentFixture<PurchaseOrderMcDialogComponent>;
        let service: PurchaseOrderMcService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [PurchaseOrderMcDialogComponent],
                providers: [
                    SupplierMcService,
                    SupplierContractMcService,
                    PurchaseOrderMcService
                ]
            })
            .overrideTemplate(PurchaseOrderMcDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PurchaseOrderMcDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PurchaseOrderMcService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PurchaseOrderMc(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.purchaseOrder = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'purchaseOrderListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PurchaseOrderMc();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.purchaseOrder = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'purchaseOrderListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
