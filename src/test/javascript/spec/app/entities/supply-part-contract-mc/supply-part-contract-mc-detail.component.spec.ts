/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { McErpTestModule } from '../../../test.module';
import { SupplyPartContractMcDetailComponent } from '../../../../../../main/webapp/app/entities/supply-part-contract-mc/supply-part-contract-mc-detail.component';
import { SupplyPartContractMcService } from '../../../../../../main/webapp/app/entities/supply-part-contract-mc/supply-part-contract-mc.service';
import { SupplyPartContractMc } from '../../../../../../main/webapp/app/entities/supply-part-contract-mc/supply-part-contract-mc.model';

describe('Component Tests', () => {

    describe('SupplyPartContractMc Management Detail Component', () => {
        let comp: SupplyPartContractMcDetailComponent;
        let fixture: ComponentFixture<SupplyPartContractMcDetailComponent>;
        let service: SupplyPartContractMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [SupplyPartContractMcDetailComponent],
                providers: [
                    SupplyPartContractMcService
                ]
            })
            .overrideTemplate(SupplyPartContractMcDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyPartContractMcDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyPartContractMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SupplyPartContractMc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.supplyPartContract).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
