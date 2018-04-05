/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { McErpTestModule } from '../../../test.module';
import { CashFlowMcDetailComponent } from '../../../../../../main/webapp/app/entities/cash-flow-mc/cash-flow-mc-detail.component';
import { CashFlowMcService } from '../../../../../../main/webapp/app/entities/cash-flow-mc/cash-flow-mc.service';
import { CashFlowMc } from '../../../../../../main/webapp/app/entities/cash-flow-mc/cash-flow-mc.model';

describe('Component Tests', () => {

    describe('CashFlowMc Management Detail Component', () => {
        let comp: CashFlowMcDetailComponent;
        let fixture: ComponentFixture<CashFlowMcDetailComponent>;
        let service: CashFlowMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [CashFlowMcDetailComponent],
                providers: [
                    CashFlowMcService
                ]
            })
            .overrideTemplate(CashFlowMcDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashFlowMcDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashFlowMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CashFlowMc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cashFlow).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
