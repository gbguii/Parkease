import { lastValueFrom } from "rxjs";
import { ResponseAPI } from "../models/responseAPI";
import { HttpErrorResponse } from "@angular/common/http";
import { HttpClientService} from "./httpClient";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root',
})
export class GerarToken {

    constructor(private http: HttpClientService) { }

    public async GeraToken(body: any): Promise<ResponseAPI> {
        let retorno: ResponseAPI;
        try {
            let token = await lastValueFrom(this.http.getToken(body));
            return retorno = { sucesso: true, dados: token, mensagem: '' };
        } catch (erro: any) {
            if (erro instanceof HttpErrorResponse) {
                return retorno = { sucesso: false, dados: null, mensagem: erro.error };
            }
            return retorno = { sucesso: false, dados: null, mensagem: "Não foi possível realizar login, tente novamente." };
        }
    }
}