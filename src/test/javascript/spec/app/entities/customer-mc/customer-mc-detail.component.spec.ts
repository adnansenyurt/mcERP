/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { McErpTestModule } from '../../../test.module';
import { CustomerMcDetailComponent } from '../../../../../../main/webapp/app/entities/customer-mc/customer-mc-detail.component';
import { CustomerMcService } from '../../../../../../main/webapp/app/entities/customer-mc/customer-mc.service';
import { CustomerMc } from '../../../../../../main/webapp/app/entities/customer-mc/customer-mc.model';

describe('Component Tests', () => {

    describe('CustomerMc Management Detail Component', () => {
        let comp: CustomerMcDetailComponent;
        let fixture: ComponentFixture<CustomerMcDetailComponent>;
        let service: CustomerMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [CustomerMcDetailComponent],
                providers: [
                    CustomerMcService
                ]
            })
            .overrideTemplate(CustomerMcDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerMcDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CustomerMc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.customer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
