import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BillOfMaterialsMc } from './bill-of-materials-mc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BillOfMaterialsMc>;

@Injectable()
export class BillOfMaterialsMcService {

    private resourceUrl =  SERVER_API_URL + 'api/bill-of-materials';

    constructor(private http: HttpClient) { }

    create(billOfMaterials: BillOfMaterialsMc): Observable<EntityResponseType> {
        const copy = this.convert(billOfMaterials);
        return this.http.post<BillOfMaterialsMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(billOfMaterials: BillOfMaterialsMc): Observable<EntityResponseType> {
        const copy = this.convert(billOfMaterials);
        return this.http.put<BillOfMaterialsMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BillOfMaterialsMc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BillOfMaterialsMc[]>> {
        const options = createRequestOption(req);
        return this.http.get<BillOfMaterialsMc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BillOfMaterialsMc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BillOfMaterialsMc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BillOfMaterialsMc[]>): HttpResponse<BillOfMaterialsMc[]> {
        const jsonResponse: BillOfMaterialsMc[] = res.body;
        const body: BillOfMaterialsMc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BillOfMaterialsMc.
     */
    private convertItemFromServer(billOfMaterials: BillOfMaterialsMc): BillOfMaterialsMc {
        const copy: BillOfMaterialsMc = Object.assign({}, billOfMaterials);
        return copy;
    }

    /**
     * Convert a BillOfMaterialsMc to a JSON which can be sent to the server.
     */
    private convert(billOfMaterials: BillOfMaterialsMc): BillOfMaterialsMc {
        const copy: BillOfMaterialsMc = Object.assign({}, billOfMaterials);
        return copy;
    }
}
