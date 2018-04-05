/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { McErpTestModule } from '../../../test.module';
import { PurchaseOrderMcDetailComponent } from '../../../../../../main/webapp/app/entities/purchase-order-mc/purchase-order-mc-detail.component';
import { PurchaseOrderMcService } from '../../../../../../main/webapp/app/entities/purchase-order-mc/purchase-order-mc.service';
import { PurchaseOrderMc } from '../../../../../../main/webapp/app/entities/purchase-order-mc/purchase-order-mc.model';

describe('Component Tests', () => {

    describe('PurchaseOrderMc Management Detail Component', () => {
        let comp: PurchaseOrderMcDetailComponent;
        let fixture: ComponentFixture<PurchaseOrderMcDetailComponent>;
        let service: PurchaseOrderMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [PurchaseOrderMcDetailComponent],
                providers: [
                    PurchaseOrderMcService
                ]
            })
            .overrideTemplate(PurchaseOrderMcDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PurchaseOrderMcDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PurchaseOrderMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PurchaseOrderMc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.purchaseOrder).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
