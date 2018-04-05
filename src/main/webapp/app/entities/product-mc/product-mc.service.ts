import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProductMc } from './product-mc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProductMc>;

@Injectable()
export class ProductMcService {

    private resourceUrl =  SERVER_API_URL + 'api/products';

    constructor(private http: HttpClient) { }

    create(product: ProductMc): Observable<EntityResponseType> {
        const copy = this.convert(product);
        return this.http.post<ProductMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(product: ProductMc): Observable<EntityResponseType> {
        const copy = this.convert(product);
        return this.http.put<ProductMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductMc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductMc[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductMc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductMc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductMc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductMc[]>): HttpResponse<ProductMc[]> {
        const jsonResponse: ProductMc[] = res.body;
        const body: ProductMc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductMc.
     */
    private convertItemFromServer(product: ProductMc): ProductMc {
        const copy: ProductMc = Object.assign({}, product);
        return copy;
    }

    /**
     * Convert a ProductMc to a JSON which can be sent to the server.
     */
    private convert(product: ProductMc): ProductMc {
        const copy: ProductMc = Object.assign({}, product);
        return copy;
    }
}
