/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { McErpTestModule } from '../../../test.module';
import { CustomerProposalMcDetailComponent } from '../../../../../../main/webapp/app/entities/customer-proposal-mc/customer-proposal-mc-detail.component';
import { CustomerProposalMcService } from '../../../../../../main/webapp/app/entities/customer-proposal-mc/customer-proposal-mc.service';
import { CustomerProposalMc } from '../../../../../../main/webapp/app/entities/customer-proposal-mc/customer-proposal-mc.model';

describe('Component Tests', () => {

    describe('CustomerProposalMc Management Detail Component', () => {
        let comp: CustomerProposalMcDetailComponent;
        let fixture: ComponentFixture<CustomerProposalMcDetailComponent>;
        let service: CustomerProposalMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [CustomerProposalMcDetailComponent],
                providers: [
                    CustomerProposalMcService
                ]
            })
            .overrideTemplate(CustomerProposalMcDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerProposalMcDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerProposalMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CustomerProposalMc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.customerProposal).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
