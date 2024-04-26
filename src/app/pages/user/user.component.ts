import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/UsuarioService';
import { ResponseAPI } from '../../models/responseAPI';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers: [UsuarioService]
})
export class UserComponent implements OnInit{

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder) { }

  formulario: FormGroup = new FormGroup({});
  
  listaUsuarios: any[] = [];
  mostrarModal: boolean = false;
  
  async ngOnInit(): Promise<void> {
    await this.buscaUsuarios();
    this.formulario = new FormGroup({
      login: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required, Validators.minLength(5)]),
      acesso: new FormControl('', [Validators.required])
    });
  }

  async buscaUsuarios(){
    let usuarios: ResponseAPI = await this.usuarioService.retornaTodosUsuarios();
    if(usuarios.sucesso){
      this.listaUsuarios = usuarios.dados;
    }
  }

  fecharModal(){
    this.mostrarModal = false;
  }

  abrirModal(){
    this.mostrarModal = true;
  }

  listaAcessos = ['Admin', 'Operador', 'Usuário'];

  async criarUsuario(){
    if(!this.camposValidos()){
      alert('Preencha todos os campos corretamente');
      return;
    }

    let body = JSON.stringify({
      login: this.formulario.value.login,
      senha: this.formulario.value.senha,
      acesso: this.formulario.value.acesso
    });

    let responseAPI: ResponseAPI = await this.usuarioService.criarUsuario(body);
    if(responseAPI.sucesso){
      this.listaUsuarios.push(responseAPI.dados);
      await this.buscaUsuarios();
      this.fecharModal();
    }else{
      alert(responseAPI.mensagem);
    }
  }

  camposValidos(){
    if(this.formulario.invalid){
      return false;
    }
    return true;
  }
}
