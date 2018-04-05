import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CustomerOrderMc } from './customer-order-mc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CustomerOrderMc>;

@Injectable()
export class CustomerOrderMcService {

    private resourceUrl =  SERVER_API_URL + 'api/customer-orders';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(customerOrder: CustomerOrderMc): Observable<EntityResponseType> {
        const copy = this.convert(customerOrder);
        return this.http.post<CustomerOrderMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customerOrder: CustomerOrderMc): Observable<EntityResponseType> {
        const copy = this.convert(customerOrder);
        return this.http.put<CustomerOrderMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerOrderMc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CustomerOrderMc[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerOrderMc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CustomerOrderMc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerOrderMc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerOrderMc[]>): HttpResponse<CustomerOrderMc[]> {
        const jsonResponse: CustomerOrderMc[] = res.body;
        const body: CustomerOrderMc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerOrderMc.
     */
    private convertItemFromServer(customerOrder: CustomerOrderMc): CustomerOrderMc {
        const copy: CustomerOrderMc = Object.assign({}, customerOrder);
        copy.dateOpened = this.dateUtils
            .convertDateTimeFromServer(customerOrder.dateOpened);
        copy.datePaymentDue = this.dateUtils
            .convertDateTimeFromServer(customerOrder.datePaymentDue);
        return copy;
    }

    /**
     * Convert a CustomerOrderMc to a JSON which can be sent to the server.
     */
    private convert(customerOrder: CustomerOrderMc): CustomerOrderMc {
        const copy: CustomerOrderMc = Object.assign({}, customerOrder);

        copy.dateOpened = this.dateUtils.toDate(customerOrder.dateOpened);

        copy.datePaymentDue = this.dateUtils.toDate(customerOrder.datePaymentDue);
        return copy;
    }
}
