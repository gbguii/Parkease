import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { AutenticacaoComponent } from './pages/autenticacao/autenticacao.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './account/shared/auth.guard';
import { BaseUiComponent } from './components/base-ui/base-ui.component';

const routes: Routes = [
  {
    path: '',
    component: BaseUiComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'usuarios', component: UserComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AutenticacaoComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
