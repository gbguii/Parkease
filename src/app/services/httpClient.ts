import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentDev } from '../environment/environment.dev';

@Injectable({
    providedIn: 'root'
})
export class HttpClientService {
    constructor(private http: HttpClient) {}

    // Exemplo de requisição GET
    public get<T>(endpoint: string, queryString? : string): Observable<T> {
        return this.http.get<T>(environmentDev.apiUrl + endpoint + (queryString ? queryString : ""), {headers: this.headers()});
    }

    // Exemplo de requisição POST
    public post<T>(endpoint: string, body: any): Observable<T> {
        return this.http.post<T>(environmentDev.apiUrl + endpoint, body, {headers: this.headers()});
    }

    // Exemplo de requisição PUT
    public put<T>(endpoint: string, body: any): Observable<T> {
        return this.http.put<T>(environmentDev.apiUrl + endpoint, body, {headers: this.headers()});
    }

    // Exemplo de requisição DELETE
    public delete<T>(endpoint: string, parametros?: string): Observable<T> {
        return this.http.delete<T>(environmentDev.apiUrl + endpoint + (parametros ? parametros : ""), {headers: this.headers()});
    }

    public getToken(body: any): Observable<string> {
        return this.http.post<string>(environmentDev.apiUrl + 'GerarToken', body, this.HTTPOptionsForText);
    }

    HTTPOptionsForText: Object = {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        responseType: 'text'
    }

    private headers() {
        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }
}