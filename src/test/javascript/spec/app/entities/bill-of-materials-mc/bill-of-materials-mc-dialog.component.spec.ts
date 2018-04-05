/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { McErpTestModule } from '../../../test.module';
import { BillOfMaterialsMcDialogComponent } from '../../../../../../main/webapp/app/entities/bill-of-materials-mc/bill-of-materials-mc-dialog.component';
import { BillOfMaterialsMcService } from '../../../../../../main/webapp/app/entities/bill-of-materials-mc/bill-of-materials-mc.service';
import { BillOfMaterialsMc } from '../../../../../../main/webapp/app/entities/bill-of-materials-mc/bill-of-materials-mc.model';
import { ProductMcService } from '../../../../../../main/webapp/app/entities/product-mc';
import { SupplyPartMcService } from '../../../../../../main/webapp/app/entities/supply-part-mc';

describe('Component Tests', () => {

    describe('BillOfMaterialsMc Management Dialog Component', () => {
        let comp: BillOfMaterialsMcDialogComponent;
        let fixture: ComponentFixture<BillOfMaterialsMcDialogComponent>;
        let service: BillOfMaterialsMcService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [BillOfMaterialsMcDialogComponent],
                providers: [
                    ProductMcService,
                    SupplyPartMcService,
                    BillOfMaterialsMcService
                ]
            })
            .overrideTemplate(BillOfMaterialsMcDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillOfMaterialsMcDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillOfMaterialsMcService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BillOfMaterialsMc(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.billOfMaterials = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'billOfMaterialsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BillOfMaterialsMc();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.billOfMaterials = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'billOfMaterialsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
