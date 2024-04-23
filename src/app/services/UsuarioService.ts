import { lastValueFrom } from "rxjs";
import { HttpClientService } from "./httpClient";
import { ResponseAPI } from "../models/responseAPI";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class UsuarioService{
    constructor(private http: HttpClientService) { }

    public async retornaTodosUsuarios(): Promise<ResponseAPI> {
        let retorno: ResponseAPI;
        try {
            let retornoApi = await lastValueFrom(this.http.get<any>('retornaTodosUsuarios', ""));
            return retorno = { sucesso: true, dados: retornoApi, mensagem: '' };
        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                return retorno = { sucesso: false, dados: null, mensagem: error.error };
            }
            return retorno = { sucesso: false, dados: null, mensagem: "Não foi possível retornar os usuários, tente novamente." };
        }
    }
}