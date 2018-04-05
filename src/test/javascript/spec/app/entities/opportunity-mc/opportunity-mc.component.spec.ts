/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { McErpTestModule } from '../../../test.module';
import { OpportunityMcComponent } from '../../../../../../main/webapp/app/entities/opportunity-mc/opportunity-mc.component';
import { OpportunityMcService } from '../../../../../../main/webapp/app/entities/opportunity-mc/opportunity-mc.service';
import { OpportunityMc } from '../../../../../../main/webapp/app/entities/opportunity-mc/opportunity-mc.model';

describe('Component Tests', () => {

    describe('OpportunityMc Management Component', () => {
        let comp: OpportunityMcComponent;
        let fixture: ComponentFixture<OpportunityMcComponent>;
        let service: OpportunityMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [OpportunityMcComponent],
                providers: [
                    OpportunityMcService
                ]
            })
            .overrideTemplate(OpportunityMcComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OpportunityMcComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OpportunityMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OpportunityMc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.opportunities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
