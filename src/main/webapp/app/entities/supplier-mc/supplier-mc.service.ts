import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SupplierMc } from './supplier-mc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SupplierMc>;

@Injectable()
export class SupplierMcService {

    private resourceUrl =  SERVER_API_URL + 'api/suppliers';

    constructor(private http: HttpClient) { }

    create(supplier: SupplierMc): Observable<EntityResponseType> {
        const copy = this.convert(supplier);
        return this.http.post<SupplierMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(supplier: SupplierMc): Observable<EntityResponseType> {
        const copy = this.convert(supplier);
        return this.http.put<SupplierMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SupplierMc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SupplierMc[]>> {
        const options = createRequestOption(req);
        return this.http.get<SupplierMc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SupplierMc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SupplierMc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SupplierMc[]>): HttpResponse<SupplierMc[]> {
        const jsonResponse: SupplierMc[] = res.body;
        const body: SupplierMc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SupplierMc.
     */
    private convertItemFromServer(supplier: SupplierMc): SupplierMc {
        const copy: SupplierMc = Object.assign({}, supplier);
        return copy;
    }

    /**
     * Convert a SupplierMc to a JSON which can be sent to the server.
     */
    private convert(supplier: SupplierMc): SupplierMc {
        const copy: SupplierMc = Object.assign({}, supplier);
        return copy;
    }
}
