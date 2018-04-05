/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { McErpTestModule } from '../../../test.module';
import { SupplierContractMcComponent } from '../../../../../../main/webapp/app/entities/supplier-contract-mc/supplier-contract-mc.component';
import { SupplierContractMcService } from '../../../../../../main/webapp/app/entities/supplier-contract-mc/supplier-contract-mc.service';
import { SupplierContractMc } from '../../../../../../main/webapp/app/entities/supplier-contract-mc/supplier-contract-mc.model';

describe('Component Tests', () => {

    describe('SupplierContractMc Management Component', () => {
        let comp: SupplierContractMcComponent;
        let fixture: ComponentFixture<SupplierContractMcComponent>;
        let service: SupplierContractMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [SupplierContractMcComponent],
                providers: [
                    SupplierContractMcService
                ]
            })
            .overrideTemplate(SupplierContractMcComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplierContractMcComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplierContractMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SupplierContractMc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.supplierContracts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
