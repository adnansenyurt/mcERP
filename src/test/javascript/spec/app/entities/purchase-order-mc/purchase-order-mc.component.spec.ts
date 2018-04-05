/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { McErpTestModule } from '../../../test.module';
import { PurchaseOrderMcComponent } from '../../../../../../main/webapp/app/entities/purchase-order-mc/purchase-order-mc.component';
import { PurchaseOrderMcService } from '../../../../../../main/webapp/app/entities/purchase-order-mc/purchase-order-mc.service';
import { PurchaseOrderMc } from '../../../../../../main/webapp/app/entities/purchase-order-mc/purchase-order-mc.model';

describe('Component Tests', () => {

    describe('PurchaseOrderMc Management Component', () => {
        let comp: PurchaseOrderMcComponent;
        let fixture: ComponentFixture<PurchaseOrderMcComponent>;
        let service: PurchaseOrderMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [PurchaseOrderMcComponent],
                providers: [
                    PurchaseOrderMcService
                ]
            })
            .overrideTemplate(PurchaseOrderMcComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PurchaseOrderMcComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PurchaseOrderMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PurchaseOrderMc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.purchaseOrders[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
