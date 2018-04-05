/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { McErpTestModule } from '../../../test.module';
import { BillOfMaterialsMcDetailComponent } from '../../../../../../main/webapp/app/entities/bill-of-materials-mc/bill-of-materials-mc-detail.component';
import { BillOfMaterialsMcService } from '../../../../../../main/webapp/app/entities/bill-of-materials-mc/bill-of-materials-mc.service';
import { BillOfMaterialsMc } from '../../../../../../main/webapp/app/entities/bill-of-materials-mc/bill-of-materials-mc.model';

describe('Component Tests', () => {

    describe('BillOfMaterialsMc Management Detail Component', () => {
        let comp: BillOfMaterialsMcDetailComponent;
        let fixture: ComponentFixture<BillOfMaterialsMcDetailComponent>;
        let service: BillOfMaterialsMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [BillOfMaterialsMcDetailComponent],
                providers: [
                    BillOfMaterialsMcService
                ]
            })
            .overrideTemplate(BillOfMaterialsMcDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillOfMaterialsMcDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillOfMaterialsMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BillOfMaterialsMc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.billOfMaterials).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
