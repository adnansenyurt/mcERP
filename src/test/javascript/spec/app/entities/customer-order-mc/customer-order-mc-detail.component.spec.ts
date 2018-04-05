/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { McErpTestModule } from '../../../test.module';
import { CustomerOrderMcDetailComponent } from '../../../../../../main/webapp/app/entities/customer-order-mc/customer-order-mc-detail.component';
import { CustomerOrderMcService } from '../../../../../../main/webapp/app/entities/customer-order-mc/customer-order-mc.service';
import { CustomerOrderMc } from '../../../../../../main/webapp/app/entities/customer-order-mc/customer-order-mc.model';

describe('Component Tests', () => {

    describe('CustomerOrderMc Management Detail Component', () => {
        let comp: CustomerOrderMcDetailComponent;
        let fixture: ComponentFixture<CustomerOrderMcDetailComponent>;
        let service: CustomerOrderMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [CustomerOrderMcDetailComponent],
                providers: [
                    CustomerOrderMcService
                ]
            })
            .overrideTemplate(CustomerOrderMcDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerOrderMcDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerOrderMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CustomerOrderMc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.customerOrder).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
