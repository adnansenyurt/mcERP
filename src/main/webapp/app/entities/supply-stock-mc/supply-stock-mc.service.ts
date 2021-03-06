import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SupplyStockMc } from './supply-stock-mc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SupplyStockMc>;

@Injectable()
export class SupplyStockMcService {

    private resourceUrl =  SERVER_API_URL + 'api/supply-stocks';

    constructor(private http: HttpClient) { }

    create(supplyStock: SupplyStockMc): Observable<EntityResponseType> {
        const copy = this.convert(supplyStock);
        return this.http.post<SupplyStockMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(supplyStock: SupplyStockMc): Observable<EntityResponseType> {
        const copy = this.convert(supplyStock);
        return this.http.put<SupplyStockMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SupplyStockMc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SupplyStockMc[]>> {
        const options = createRequestOption(req);
        return this.http.get<SupplyStockMc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SupplyStockMc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SupplyStockMc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SupplyStockMc[]>): HttpResponse<SupplyStockMc[]> {
        const jsonResponse: SupplyStockMc[] = res.body;
        const body: SupplyStockMc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SupplyStockMc.
     */
    private convertItemFromServer(supplyStock: SupplyStockMc): SupplyStockMc {
        const copy: SupplyStockMc = Object.assign({}, supplyStock);
        return copy;
    }

    /**
     * Convert a SupplyStockMc to a JSON which can be sent to the server.
     */
    private convert(supplyStock: SupplyStockMc): SupplyStockMc {
        const copy: SupplyStockMc = Object.assign({}, supplyStock);
        return copy;
    }
}
