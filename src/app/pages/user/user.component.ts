import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/UsuarioService';
import { ResponseAPI } from '../../models/responseAPI';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers: [UsuarioService]
})
export class UserComponent implements OnInit{

  constructor(private usuarioService: UsuarioService) { }
  
  listaUsuarios: any[] = [];
  async ngOnInit(): Promise<void> {
    let usuarios: ResponseAPI = await this.usuarioService.retornaTodosUsuarios();
    if(usuarios.sucesso){
      this.listaUsuarios = usuarios.dados;
    }
  }
}
