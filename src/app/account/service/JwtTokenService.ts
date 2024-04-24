import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor() { }

   private tokenEstaExpiradoOuInvalido(token: string | null): boolean {
    if (!token) {
      return true;
    }

    const tokenPartes = token.split('.');
    if (tokenPartes.length != 3) {
      return true;
    }

    const payload = JSON.parse(atob(tokenPartes[1]));
    if (!payload || !payload.exp) {
      return true;
    }

    const dataExpiracao = new Date(0);
    dataExpiracao.setUTCSeconds(payload.exp);

    const dataAtual = new Date().valueOf();

    return (dataExpiracao.valueOf() <= dataAtual);
  }

  public tokenValidoENaoExpirado(token: string | null): boolean {
    return !this.tokenEstaExpiradoOuInvalido(token);
  }
}
