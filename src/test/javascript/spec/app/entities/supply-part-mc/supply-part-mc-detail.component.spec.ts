/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { McErpTestModule } from '../../../test.module';
import { SupplyPartMcDetailComponent } from '../../../../../../main/webapp/app/entities/supply-part-mc/supply-part-mc-detail.component';
import { SupplyPartMcService } from '../../../../../../main/webapp/app/entities/supply-part-mc/supply-part-mc.service';
import { SupplyPartMc } from '../../../../../../main/webapp/app/entities/supply-part-mc/supply-part-mc.model';

describe('Component Tests', () => {

    describe('SupplyPartMc Management Detail Component', () => {
        let comp: SupplyPartMcDetailComponent;
        let fixture: ComponentFixture<SupplyPartMcDetailComponent>;
        let service: SupplyPartMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [SupplyPartMcDetailComponent],
                providers: [
                    SupplyPartMcService
                ]
            })
            .overrideTemplate(SupplyPartMcDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyPartMcDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyPartMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SupplyPartMc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.supplyPart).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
