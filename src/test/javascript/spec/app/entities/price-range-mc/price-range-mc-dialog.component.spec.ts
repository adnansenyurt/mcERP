/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { McErpTestModule } from '../../../test.module';
import { PriceRangeMcDialogComponent } from '../../../../../../main/webapp/app/entities/price-range-mc/price-range-mc-dialog.component';
import { PriceRangeMcService } from '../../../../../../main/webapp/app/entities/price-range-mc/price-range-mc.service';
import { PriceRangeMc } from '../../../../../../main/webapp/app/entities/price-range-mc/price-range-mc.model';
import { SupplyPartContractMcService } from '../../../../../../main/webapp/app/entities/supply-part-contract-mc';

describe('Component Tests', () => {

    describe('PriceRangeMc Management Dialog Component', () => {
        let comp: PriceRangeMcDialogComponent;
        let fixture: ComponentFixture<PriceRangeMcDialogComponent>;
        let service: PriceRangeMcService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [PriceRangeMcDialogComponent],
                providers: [
                    SupplyPartContractMcService,
                    PriceRangeMcService
                ]
            })
            .overrideTemplate(PriceRangeMcDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PriceRangeMcDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PriceRangeMcService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PriceRangeMc(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.priceRange = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'priceRangeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PriceRangeMc();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.priceRange = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'priceRangeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
