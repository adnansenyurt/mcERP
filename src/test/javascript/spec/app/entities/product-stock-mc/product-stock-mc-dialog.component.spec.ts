/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { McErpTestModule } from '../../../test.module';
import { ProductStockMcDialogComponent } from '../../../../../../main/webapp/app/entities/product-stock-mc/product-stock-mc-dialog.component';
import { ProductStockMcService } from '../../../../../../main/webapp/app/entities/product-stock-mc/product-stock-mc.service';
import { ProductStockMc } from '../../../../../../main/webapp/app/entities/product-stock-mc/product-stock-mc.model';
import { ProductMcService } from '../../../../../../main/webapp/app/entities/product-mc';

describe('Component Tests', () => {

    describe('ProductStockMc Management Dialog Component', () => {
        let comp: ProductStockMcDialogComponent;
        let fixture: ComponentFixture<ProductStockMcDialogComponent>;
        let service: ProductStockMcService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [ProductStockMcDialogComponent],
                providers: [
                    ProductMcService,
                    ProductStockMcService
                ]
            })
            .overrideTemplate(ProductStockMcDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductStockMcDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductStockMcService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProductStockMc(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.productStock = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'productStockListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProductStockMc();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.productStock = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'productStockListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
