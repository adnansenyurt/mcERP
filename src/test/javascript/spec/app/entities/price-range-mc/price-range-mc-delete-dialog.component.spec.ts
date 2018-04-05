/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { McErpTestModule } from '../../../test.module';
import { PriceRangeMcDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/price-range-mc/price-range-mc-delete-dialog.component';
import { PriceRangeMcService } from '../../../../../../main/webapp/app/entities/price-range-mc/price-range-mc.service';

describe('Component Tests', () => {

    describe('PriceRangeMc Management Delete Component', () => {
        let comp: PriceRangeMcDeleteDialogComponent;
        let fixture: ComponentFixture<PriceRangeMcDeleteDialogComponent>;
        let service: PriceRangeMcService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [PriceRangeMcDeleteDialogComponent],
                providers: [
                    PriceRangeMcService
                ]
            })
            .overrideTemplate(PriceRangeMcDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PriceRangeMcDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PriceRangeMcService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
