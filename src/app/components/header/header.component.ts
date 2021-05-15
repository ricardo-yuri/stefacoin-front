import { CursoService } from './../../services/curso.service';
import { AlunoService } from './../../services/aluno.service';
import { ProfessorService } from './../../services/professor.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;

  constructor(private authService: AuthService,
              private router: Router, 
              private professorService: ProfessorService,
              private alunoService: AlunoService,
              private cursoService: CursoService
              ) { }

  ngOnInit(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.usuario = this.authService.getUsuario();
    });
  }

  showHeader() {
    return this.authService.isAuthenticated();
  }


  incluirProf() {
    this.professorService.isEditar = false;
    this.router.navigate(['adicionar']);
  }

  incluirAluno() {
    this.alunoService.isEditar = false;
    this.router.navigate(['adicionar-aluno']);
  }

  incluirCurso() {
    this.cursoService.isEditar = false;
    this.router.navigate(['adicionar-curso']);
  }

  logout(): void {
    this.authService.logout();
  }
}
