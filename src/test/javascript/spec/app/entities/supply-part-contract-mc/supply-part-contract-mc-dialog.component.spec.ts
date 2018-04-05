/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { McErpTestModule } from '../../../test.module';
import { SupplyPartContractMcDialogComponent } from '../../../../../../main/webapp/app/entities/supply-part-contract-mc/supply-part-contract-mc-dialog.component';
import { SupplyPartContractMcService } from '../../../../../../main/webapp/app/entities/supply-part-contract-mc/supply-part-contract-mc.service';
import { SupplyPartContractMc } from '../../../../../../main/webapp/app/entities/supply-part-contract-mc/supply-part-contract-mc.model';

describe('Component Tests', () => {

    describe('SupplyPartContractMc Management Dialog Component', () => {
        let comp: SupplyPartContractMcDialogComponent;
        let fixture: ComponentFixture<SupplyPartContractMcDialogComponent>;
        let service: SupplyPartContractMcService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [SupplyPartContractMcDialogComponent],
                providers: [
                    SupplyPartContractMcService
                ]
            })
            .overrideTemplate(SupplyPartContractMcDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyPartContractMcDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyPartContractMcService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SupplyPartContractMc(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.supplyPartContract = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'supplyPartContractListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SupplyPartContractMc();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.supplyPartContract = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'supplyPartContractListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
