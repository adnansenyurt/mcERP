/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { McErpTestModule } from '../../../test.module';
import { SupplyPartContractMcComponent } from '../../../../../../main/webapp/app/entities/supply-part-contract-mc/supply-part-contract-mc.component';
import { SupplyPartContractMcService } from '../../../../../../main/webapp/app/entities/supply-part-contract-mc/supply-part-contract-mc.service';
import { SupplyPartContractMc } from '../../../../../../main/webapp/app/entities/supply-part-contract-mc/supply-part-contract-mc.model';

describe('Component Tests', () => {

    describe('SupplyPartContractMc Management Component', () => {
        let comp: SupplyPartContractMcComponent;
        let fixture: ComponentFixture<SupplyPartContractMcComponent>;
        let service: SupplyPartContractMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [SupplyPartContractMcComponent],
                providers: [
                    SupplyPartContractMcService
                ]
            })
            .overrideTemplate(SupplyPartContractMcComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyPartContractMcComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyPartContractMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SupplyPartContractMc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.supplyPartContracts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
