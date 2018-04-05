/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { McErpTestModule } from '../../../test.module';
import { SupplyPartMcDialogComponent } from '../../../../../../main/webapp/app/entities/supply-part-mc/supply-part-mc-dialog.component';
import { SupplyPartMcService } from '../../../../../../main/webapp/app/entities/supply-part-mc/supply-part-mc.service';
import { SupplyPartMc } from '../../../../../../main/webapp/app/entities/supply-part-mc/supply-part-mc.model';
import { BillOfMaterialsMcService } from '../../../../../../main/webapp/app/entities/bill-of-materials-mc';
import { SupplyPartContractMcService } from '../../../../../../main/webapp/app/entities/supply-part-contract-mc';

describe('Component Tests', () => {

    describe('SupplyPartMc Management Dialog Component', () => {
        let comp: SupplyPartMcDialogComponent;
        let fixture: ComponentFixture<SupplyPartMcDialogComponent>;
        let service: SupplyPartMcService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [SupplyPartMcDialogComponent],
                providers: [
                    BillOfMaterialsMcService,
                    SupplyPartContractMcService,
                    SupplyPartMcService
                ]
            })
            .overrideTemplate(SupplyPartMcDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyPartMcDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyPartMcService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SupplyPartMc(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.supplyPart = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'supplyPartListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SupplyPartMc();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.supplyPart = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'supplyPartListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
