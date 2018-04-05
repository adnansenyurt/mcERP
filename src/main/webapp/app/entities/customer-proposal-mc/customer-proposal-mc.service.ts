import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CustomerProposalMc } from './customer-proposal-mc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CustomerProposalMc>;

@Injectable()
export class CustomerProposalMcService {

    private resourceUrl =  SERVER_API_URL + 'api/customer-proposals';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(customerProposal: CustomerProposalMc): Observable<EntityResponseType> {
        const copy = this.convert(customerProposal);
        return this.http.post<CustomerProposalMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customerProposal: CustomerProposalMc): Observable<EntityResponseType> {
        const copy = this.convert(customerProposal);
        return this.http.put<CustomerProposalMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerProposalMc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CustomerProposalMc[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerProposalMc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CustomerProposalMc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerProposalMc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerProposalMc[]>): HttpResponse<CustomerProposalMc[]> {
        const jsonResponse: CustomerProposalMc[] = res.body;
        const body: CustomerProposalMc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerProposalMc.
     */
    private convertItemFromServer(customerProposal: CustomerProposalMc): CustomerProposalMc {
        const copy: CustomerProposalMc = Object.assign({}, customerProposal);
        copy.dateSubmitted = this.dateUtils
            .convertDateTimeFromServer(customerProposal.dateSubmitted);
        return copy;
    }

    /**
     * Convert a CustomerProposalMc to a JSON which can be sent to the server.
     */
    private convert(customerProposal: CustomerProposalMc): CustomerProposalMc {
        const copy: CustomerProposalMc = Object.assign({}, customerProposal);

        copy.dateSubmitted = this.dateUtils.toDate(customerProposal.dateSubmitted);
        return copy;
    }
}
