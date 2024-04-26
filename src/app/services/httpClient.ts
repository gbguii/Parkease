import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentDev } from '../environment/environment.dev';

@Injectable({
    providedIn: 'root'
})
export class HttpClientService {
    constructor(private http: HttpClient) {}

    public get<T>(endpoint: string, queryString? : string): Observable<T> {
        return this.http.get<T>(environmentDev.apiUrl + endpoint + (queryString ? queryString : ""), {headers: this.headers()});
    }

    public post<T>(endpoint: string, body: any): Observable<T> {
        return this.http.post<T>(environmentDev.apiUrl + endpoint, body, {headers: this.headers()});
    }

    public postText<T>(endpoint: string, body: any): Observable<T> {
        return this.http.post<T>(environmentDev.apiUrl + endpoint, body, this.HTTPOtionsForTextWithToken);
    }

    public put<T>(endpoint: string, body: any): Observable<T> {
        return this.http.put<T>(environmentDev.apiUrl + endpoint, body, {headers: this.headers()});
    }

    public putText<T>(endpoint: string, body: any): Observable<T> { 
        return this.http.put<T>(environmentDev.apiUrl + endpoint, body, this.HTTPOtionsForTextWithToken);
    }

    public delete<T>(endpoint: string, parametros?: string): Observable<T> {
        return this.http.delete<T>(environmentDev.apiUrl + endpoint + (parametros ? parametros : ""), this.HTTPOtionsForTextWithToken);
    }

    public getToken(body: any): Observable<string> {
        return this.http.post<string>(environmentDev.apiUrl + 'GerarToken', body, this.HTTPOptionsForText);
    }

    HTTPOptionsForText: Object = {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        responseType: 'text'
    }

    HTTPOtionsForTextWithToken: Object = {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')}),
        responseType: 'text'
    }

    private headers() {
        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }
}