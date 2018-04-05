/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { McErpTestModule } from '../../../test.module';
import { CustomerProposalMcComponent } from '../../../../../../main/webapp/app/entities/customer-proposal-mc/customer-proposal-mc.component';
import { CustomerProposalMcService } from '../../../../../../main/webapp/app/entities/customer-proposal-mc/customer-proposal-mc.service';
import { CustomerProposalMc } from '../../../../../../main/webapp/app/entities/customer-proposal-mc/customer-proposal-mc.model';

describe('Component Tests', () => {

    describe('CustomerProposalMc Management Component', () => {
        let comp: CustomerProposalMcComponent;
        let fixture: ComponentFixture<CustomerProposalMcComponent>;
        let service: CustomerProposalMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [CustomerProposalMcComponent],
                providers: [
                    CustomerProposalMcService
                ]
            })
            .overrideTemplate(CustomerProposalMcComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerProposalMcComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerProposalMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CustomerProposalMc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.customerProposals[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
