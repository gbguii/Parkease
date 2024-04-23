import { Component, DoCheck, Input, OnDestroy, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent extends AppComponent implements DoCheck, OnInit {
  num: number = 0;

  ngOnInit(): void {
    console.log('componente iniciado');
  }

  ngDoCheck(): void {
    console.log('houve mudança');
  }

  adicionar1() {
    this.num++;
  }

}
