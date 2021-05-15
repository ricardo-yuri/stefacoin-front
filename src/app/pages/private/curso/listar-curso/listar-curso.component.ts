import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from './../../../../models/aluno';
import { AlunoService } from './../../../../services/aluno.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Estrela } from './../../../../models/estrela';
import { AuthService } from './../../../../services/auth.service';
import { Curso } from './../../../../models/curso';
import { CursoService } from './../../../../services/curso.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrls: ['./listar-curso.component.css']
})
export class ListarCursoComponent implements OnInit{

  tipo: number;

  constructor(private cursoService: CursoService,
    private authService: AuthService,
    private alunoService: AlunoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private config: NgbRatingConfig,
    private router: Router
  ) {
    config.max = 5;
  }
  
  cursos: Curso[] = [];

  indexEstrela: number[] = [];
  estrelas: Estrela[] = [];
  modalRef: BsModalRef;
  notaCurso: number;
  avaliacaoAberta: boolean = true;
  estrelaAvaliada: Estrela[] = [];
  aluno: Aluno;
  currentRate = 0;
  cursoSerEditado: Curso;
  cursoSerExcluida: Curso;
  

  ngOnInit(): void {
    this.listarCursos();
    this.tipo = this.authService.getUsuario().tipo;
    this.alunoService.obter(this.authService.getUsuario().id).subscribe((retorno) => {
      this.aluno = retorno
    });
  }

  openModal(template: TemplateRef<any>, curso: Curso) {
    this.cursoSerEditado = curso;
    this.modalRef = this.modalService.show(template);
  }

  atualizarCurso(curso: Curso) {
    this.cursoService.updateData(curso);
    this.cursoService.isEditar = true;
    this.router.navigate(['adicionar-curso']);

  }

  carregarAluno() {
    this.alunoService.obter(this.tipo = this.authService.getUsuario().tipo).subscribe((retorno) => {
      this.aluno = retorno
    })
  }

  delete(curso: Curso, template: TemplateRef<any>) {
    this.cursoSerExcluida = curso;
    this.modalService.show(template);
   
  }

  confirmExclusao() {
    this.cursoService.excluir(this.cursoSerExcluida.id).subscribe((retorno: any) => {
      this.toastr.success(retorno.mensagem);
      this.listarCursos();
    })
    this.modalService.hide();
  }

  closeExclusao() {
    this.modalService.hide();
  }


  confirm() {
    this.cursoSerEditado.avaliacoes = [];
    this.cursoSerEditado.avaliacoes.push({
      idAluno: this.aluno.id,
      avaliacao: this.currentRate
    });
    this.aluno.cursos.push(this.cursoSerEditado);
    this.alunoService.atualizar(this.aluno).subscribe(() => {
      this.toastr.success('Curso avaliado com sucesso')
    });
    this.modalService.hide();
  }

  close() {
    this.modalService.hide();
  }
 
  listarCursos() {
    this.cursoService.listar({}).subscribe((value: Curso[]) => {
      this.cursos = value;
    })
  }

}