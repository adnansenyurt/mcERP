/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { McErpTestModule } from '../../../test.module';
import { OpportunityMcDetailComponent } from '../../../../../../main/webapp/app/entities/opportunity-mc/opportunity-mc-detail.component';
import { OpportunityMcService } from '../../../../../../main/webapp/app/entities/opportunity-mc/opportunity-mc.service';
import { OpportunityMc } from '../../../../../../main/webapp/app/entities/opportunity-mc/opportunity-mc.model';

describe('Component Tests', () => {

    describe('OpportunityMc Management Detail Component', () => {
        let comp: OpportunityMcDetailComponent;
        let fixture: ComponentFixture<OpportunityMcDetailComponent>;
        let service: OpportunityMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [OpportunityMcDetailComponent],
                providers: [
                    OpportunityMcService
                ]
            })
            .overrideTemplate(OpportunityMcDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OpportunityMcDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OpportunityMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OpportunityMc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.opportunity).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
