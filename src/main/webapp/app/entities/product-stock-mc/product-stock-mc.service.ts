import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProductStockMc } from './product-stock-mc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProductStockMc>;

@Injectable()
export class ProductStockMcService {

    private resourceUrl =  SERVER_API_URL + 'api/product-stocks';

    constructor(private http: HttpClient) { }

    create(productStock: ProductStockMc): Observable<EntityResponseType> {
        const copy = this.convert(productStock);
        return this.http.post<ProductStockMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(productStock: ProductStockMc): Observable<EntityResponseType> {
        const copy = this.convert(productStock);
        return this.http.put<ProductStockMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductStockMc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductStockMc[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductStockMc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductStockMc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductStockMc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductStockMc[]>): HttpResponse<ProductStockMc[]> {
        const jsonResponse: ProductStockMc[] = res.body;
        const body: ProductStockMc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductStockMc.
     */
    private convertItemFromServer(productStock: ProductStockMc): ProductStockMc {
        const copy: ProductStockMc = Object.assign({}, productStock);
        return copy;
    }

    /**
     * Convert a ProductStockMc to a JSON which can be sent to the server.
     */
    private convert(productStock: ProductStockMc): ProductStockMc {
        const copy: ProductStockMc = Object.assign({}, productStock);
        return copy;
    }
}
