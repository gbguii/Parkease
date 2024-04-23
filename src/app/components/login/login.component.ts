import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseAPI } from '../../models/responseAPI';
import { GerarToken } from '../../services/GerarToken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(private router: Router, private token: GerarToken) { }

  loginSucess: boolean = true;
  loginUnsucessMessage: string = '';
  mostrarSenha: boolean = false;

  usuario: any = {
    login: '',
    senha: ''
  };

  async logar() {
    let body = JSON.stringify({
      login: this.usuario.login,
      senha: this.usuario.senha
    });
    let responseAPI:ResponseAPI = await this.token.GeraToken(body);
    if (responseAPI.sucesso) {
      window.localStorage.setItem('token', responseAPI.dados);
      this.router.navigate(['']);
    }else{
      this.loginSucess = false;
      this.loginUnsucessMessage = responseAPI.mensagem;
    }
  }


  mudarVisibilidadeSenha(){
    this.mostrarSenha = !this.mostrarSenha;
  }

  cadastrar() { }

  
}
