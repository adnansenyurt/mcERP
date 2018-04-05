import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CustomerMc } from './customer-mc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CustomerMc>;

@Injectable()
export class CustomerMcService {

    private resourceUrl =  SERVER_API_URL + 'api/customers';

    constructor(private http: HttpClient) { }

    create(customer: CustomerMc): Observable<EntityResponseType> {
        const copy = this.convert(customer);
        return this.http.post<CustomerMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customer: CustomerMc): Observable<EntityResponseType> {
        const copy = this.convert(customer);
        return this.http.put<CustomerMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerMc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CustomerMc[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerMc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CustomerMc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerMc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerMc[]>): HttpResponse<CustomerMc[]> {
        const jsonResponse: CustomerMc[] = res.body;
        const body: CustomerMc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerMc.
     */
    private convertItemFromServer(customer: CustomerMc): CustomerMc {
        const copy: CustomerMc = Object.assign({}, customer);
        return copy;
    }

    /**
     * Convert a CustomerMc to a JSON which can be sent to the server.
     */
    private convert(customer: CustomerMc): CustomerMc {
        const copy: CustomerMc = Object.assign({}, customer);
        return copy;
    }
}
