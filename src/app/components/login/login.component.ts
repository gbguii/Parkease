import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) { }
  loginSucess: boolean = true;
  loginUnsucessMessage: string = '';
  isPasswordVisible: boolean = false;

  usuario: any = {
    login: '',
    senha: ''
  };

  async logar() {
    let url = "http://localhost:5005/GerarToken";
    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: this.usuario.login,
        senha: this.usuario.senha
      })
    }
    let token: string | unknown = await this.realizarLoginApi(url, config);
    if (token) {
      window.localStorage.setItem('token', token.toString());
      this.router.navigate(['']);
    }else{
      this.loginSucess = false;
    }
  }

  togglePasswordVisibility(){
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  cadastrar() { }

  async realizarLoginApi(
    url: string,
    config: object
  ): Promise<unknown> {
    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        this.loginSucess = false;
        this.loginUnsucessMessage = await response.text();
        return null;
      }
      return await response.text();
    }
    catch (error) {
      console.error('Erro ao realizar login: ', error);
      return null;
    }
  }
}
