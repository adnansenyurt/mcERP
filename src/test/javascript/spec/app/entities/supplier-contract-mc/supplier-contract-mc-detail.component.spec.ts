/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { McErpTestModule } from '../../../test.module';
import { SupplierContractMcDetailComponent } from '../../../../../../main/webapp/app/entities/supplier-contract-mc/supplier-contract-mc-detail.component';
import { SupplierContractMcService } from '../../../../../../main/webapp/app/entities/supplier-contract-mc/supplier-contract-mc.service';
import { SupplierContractMc } from '../../../../../../main/webapp/app/entities/supplier-contract-mc/supplier-contract-mc.model';

describe('Component Tests', () => {

    describe('SupplierContractMc Management Detail Component', () => {
        let comp: SupplierContractMcDetailComponent;
        let fixture: ComponentFixture<SupplierContractMcDetailComponent>;
        let service: SupplierContractMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [SupplierContractMcDetailComponent],
                providers: [
                    SupplierContractMcService
                ]
            })
            .overrideTemplate(SupplierContractMcDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplierContractMcDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplierContractMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SupplierContractMc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.supplierContract).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
