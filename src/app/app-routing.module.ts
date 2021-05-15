import { AvaliarCursoComponent } from './pages/private/curso/avaliar-curso/avaliar-curso.component';
import { ListarCursoComponent } from './pages/private/curso/listar-curso/listar-curso.component';
import { ListarAlunoComponent } from './pages/private/aluno/listar-aluno/listar-aluno.component';
import { AdicionarAlunoComponent } from './pages/private/aluno/adicionar-aluno/adicionar-aluno.component';
import { ListarProfessorComponent } from './pages/private/professor/listar-professor/listar-professor.component';
import { AdicionarProfessorComponent } from './pages/private/professor/adicionar-professor/adicionar-professor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { HomeComponent } from './pages/private/home/home.component';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AdicionarCursoComponent } from './pages/private/curso/adicionar-curso/adicionar-curso.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: HomeComponent,
  },
  {
    path: 'nova-conta',
    component: CadastroComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'adicionar',
    canActivate: [AuthGuardService],
    component: AdicionarProfessorComponent
  },
  {
    path: 'listar-professor',
    canActivate: [AuthGuardService],
    component: ListarProfessorComponent
  },
  {
    path: 'adicionar-aluno',
    canActivate: [AuthGuardService],
    component: AdicionarAlunoComponent
  },
  {
    path: 'listar-aluno',
    canActivate: [AuthGuardService],
    component: ListarAlunoComponent
  },
  {
    path: 'adicionar-curso',
    canActivate: [AuthGuardService],
    component: AdicionarCursoComponent
  },
  {
    path: 'listar-curso',
    canActivate: [AuthGuardService],
    component: ListarCursoComponent
  },
  {
    path: 'avaliar-curso',
    canActivate: [AuthGuardService],
    component: AvaliarCursoComponent
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
