import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ContactPersonMc } from './contact-person-mc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ContactPersonMc>;

@Injectable()
export class ContactPersonMcService {

    private resourceUrl =  SERVER_API_URL + 'api/contact-people';

    constructor(private http: HttpClient) { }

    create(contactPerson: ContactPersonMc): Observable<EntityResponseType> {
        const copy = this.convert(contactPerson);
        return this.http.post<ContactPersonMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(contactPerson: ContactPersonMc): Observable<EntityResponseType> {
        const copy = this.convert(contactPerson);
        return this.http.put<ContactPersonMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ContactPersonMc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ContactPersonMc[]>> {
        const options = createRequestOption(req);
        return this.http.get<ContactPersonMc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ContactPersonMc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ContactPersonMc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ContactPersonMc[]>): HttpResponse<ContactPersonMc[]> {
        const jsonResponse: ContactPersonMc[] = res.body;
        const body: ContactPersonMc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ContactPersonMc.
     */
    private convertItemFromServer(contactPerson: ContactPersonMc): ContactPersonMc {
        const copy: ContactPersonMc = Object.assign({}, contactPerson);
        return copy;
    }

    /**
     * Convert a ContactPersonMc to a JSON which can be sent to the server.
     */
    private convert(contactPerson: ContactPersonMc): ContactPersonMc {
        const copy: ContactPersonMc = Object.assign({}, contactPerson);
        return copy;
    }
}
