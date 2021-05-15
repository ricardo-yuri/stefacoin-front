import { Aluno } from './../../../../models/aluno';
import { Curso } from './../../../../models/curso';
import { AlunoService } from './../../../../services/aluno.service';
import { CursoService } from './../../../../services/curso.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-adicionar-aluno',
  templateUrl: './adicionar-aluno.component.html',
  styleUrls: ['./adicionar-aluno.component.css']
})
export class AdicionarAlunoComponent implements OnInit {

  formulario: FormGroup;
  formBuilder = new FormBuilder();
  cursos: Curso[] = [];
  isEditar: boolean = false;
  alunoEditavel: Aluno = null;


  constructor(private cursoService: CursoService, private alunoService: AlunoService, private toastr: ToastrService) {}

  ngOnInit(): void {

    this.isEditar = this.alunoService.isEditar;
    if (this.isEditar) {
      this.atualizar();
    } else {
      this.initFormInclusao();
    }

    this.cursoService.listar({}).subscribe(value => {
      this.cursos = value;
    })
  }
  
  initFormInclusao(): void {
    this.formulario = this.formBuilder.group({
      nome: [null],
      email: [null],
      senha: [null],
      formacao: [null],
      idade: [null],
      cursos: [null]
   })
  
}

montarJson(): Aluno {
  return {
    id: this.isEditar ? this.alunoEditavel.id : null,
    nome: this.formulario.get('nome').value,
    email: this.formulario.get('email').value,
    senha: this.formulario.get('senha').value,
    formacao: this.formulario.get('formacao').value,
    idade: this.formulario.get('idade').value,
    cursos: [{
      id: this.formulario.get('cursos').value
    }]
  }
}

  atualizarAluno() {
    this.alunoService.atualizar(this.montarJson()).subscribe((value: any) => {
      this.toastr.success(value.mensagem);
      this.formulario.reset();
    },
      (err) => {
        this.toastr.error(err.mensagem);
    });
  }

  send() {
    if (this.isEditar) {
      this.atualizarAluno();
    } else {
      this.salvar();
    }   
  }
  
  salvar() {
    this.alunoService.incluir(this.montarJson()).subscribe((value: any) => {
      this.toastr.success(value.mensagem);
      this.formulario.reset();
    },
      (err) => {
        this.toastr.error(err.mensagem);
    });
  }
  
  atualizar() {
    this.alunoService.share.subscribe((data: Aluno) => {
      this.alunoEditavel = data;
      this.initFormEdicao();
    })
  }

  initFormEdicao(): void {
    this.formulario = this.formBuilder.group({
      id: this.isEditar ? [this.alunoEditavel.id] : null,
      nome: [this.alunoEditavel.nome],
      email: [this.alunoEditavel.email],
      senha: [this.alunoEditavel.senha],
      formacao: [this.alunoEditavel.formacao],
      idade: [this.alunoEditavel.idade],
      cursos: [this.alunoEditavel.cursos]
    })
    this.formulario.get('email').disable();
  }

  
}