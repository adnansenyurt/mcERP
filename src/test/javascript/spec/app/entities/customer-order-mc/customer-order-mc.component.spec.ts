/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { McErpTestModule } from '../../../test.module';
import { CustomerOrderMcComponent } from '../../../../../../main/webapp/app/entities/customer-order-mc/customer-order-mc.component';
import { CustomerOrderMcService } from '../../../../../../main/webapp/app/entities/customer-order-mc/customer-order-mc.service';
import { CustomerOrderMc } from '../../../../../../main/webapp/app/entities/customer-order-mc/customer-order-mc.model';

describe('Component Tests', () => {

    describe('CustomerOrderMc Management Component', () => {
        let comp: CustomerOrderMcComponent;
        let fixture: ComponentFixture<CustomerOrderMcComponent>;
        let service: CustomerOrderMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [CustomerOrderMcComponent],
                providers: [
                    CustomerOrderMcService
                ]
            })
            .overrideTemplate(CustomerOrderMcComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerOrderMcComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerOrderMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CustomerOrderMc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.customerOrders[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
