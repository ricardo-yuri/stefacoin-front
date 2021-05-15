import { HoverClassDirective } from './directives/hover-class';
import { AvaliarCursoComponent } from './pages/private/curso/avaliar-curso/avaliar-curso.component';
import { ListarCursoComponent } from './pages/private/curso/listar-curso/listar-curso.component';
import { ListarAlunoComponent } from './pages/private/aluno/listar-aluno/listar-aluno.component';
import { AdicionarAlunoComponent } from './pages/private/aluno/adicionar-aluno/adicionar-aluno.component';
import { AdicionarProfessorComponent } from './pages/private/professor/adicionar-professor/adicionar-professor.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { HomeComponent } from './pages/private/home/home.component';
import { ListarProfessorComponent } from './pages/private/professor/listar-professor/listar-professor.component';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AdicionarCursoComponent } from './pages/private/curso/adicionar-curso/adicionar-curso.component';



export function tokenGetter() {
  return localStorage.getItem('jwttoken');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListarProfessorComponent,
    CadastroComponent,
    HomeComponent,
    PaginaNaoEncontradaComponent,
    HeaderComponent,
    AdicionarProfessorComponent,
    AdicionarAlunoComponent,
    ListarAlunoComponent,
    AdicionarCursoComponent,
    ListarCursoComponent,
    AvaliarCursoComponent,
    HoverClassDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  exports: [TooltipModule, ModalModule, AvaliarCursoComponent],
  providers: [
    HttpInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
