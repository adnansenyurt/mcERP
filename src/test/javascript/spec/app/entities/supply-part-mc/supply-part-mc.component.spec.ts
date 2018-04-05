/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { McErpTestModule } from '../../../test.module';
import { SupplyPartMcComponent } from '../../../../../../main/webapp/app/entities/supply-part-mc/supply-part-mc.component';
import { SupplyPartMcService } from '../../../../../../main/webapp/app/entities/supply-part-mc/supply-part-mc.service';
import { SupplyPartMc } from '../../../../../../main/webapp/app/entities/supply-part-mc/supply-part-mc.model';

describe('Component Tests', () => {

    describe('SupplyPartMc Management Component', () => {
        let comp: SupplyPartMcComponent;
        let fixture: ComponentFixture<SupplyPartMcComponent>;
        let service: SupplyPartMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [SupplyPartMcComponent],
                providers: [
                    SupplyPartMcService
                ]
            })
            .overrideTemplate(SupplyPartMcComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyPartMcComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyPartMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SupplyPartMc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.supplyParts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
