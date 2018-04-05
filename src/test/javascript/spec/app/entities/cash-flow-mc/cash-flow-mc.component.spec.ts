/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { McErpTestModule } from '../../../test.module';
import { CashFlowMcComponent } from '../../../../../../main/webapp/app/entities/cash-flow-mc/cash-flow-mc.component';
import { CashFlowMcService } from '../../../../../../main/webapp/app/entities/cash-flow-mc/cash-flow-mc.service';
import { CashFlowMc } from '../../../../../../main/webapp/app/entities/cash-flow-mc/cash-flow-mc.model';

describe('Component Tests', () => {

    describe('CashFlowMc Management Component', () => {
        let comp: CashFlowMcComponent;
        let fixture: ComponentFixture<CashFlowMcComponent>;
        let service: CashFlowMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [CashFlowMcComponent],
                providers: [
                    CashFlowMcService
                ]
            })
            .overrideTemplate(CashFlowMcComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashFlowMcComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashFlowMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CashFlowMc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cashFlows[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
