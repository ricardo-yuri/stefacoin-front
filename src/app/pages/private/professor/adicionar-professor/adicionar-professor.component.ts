import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Professor } from './../../../../models/professor';
import { ProfessorService } from './../../../../services/professor.service';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-adicionar-professor',
  templateUrl: './adicionar-professor.component.html',
  styleUrls: ['./adicionar-professor.component.css']
})

export class AdicionarProfessorComponent implements OnInit, OnDestroy {

  
  constructor(private professorService: ProfessorService, private toastr: ToastrService) { }

  formulario: FormGroup;
  formBuilder = new FormBuilder();
  professor: Professor = null;
  isEditar: boolean = false;
  


  ngOnInit(): void {
    this.isEditar = this.professorService.isEditar;
    if (this.isEditar) {
      this.atualizar();

    } else {
      this.initFormInclusao();
    }

    }

  ngOnDestroy(): void {
    this.formulario.reset();
  }

  atualizar() {
    this.professorService.share.subscribe((data: Professor) => {
      this.professor = data;
      this.initFormEdicao();
    })
  }

  initFormInclusao(): void {
      this.formulario = this.formBuilder.group({
        nome: [null],
        email: [null],
        senha: [null]
     })
    
  }

  initFormEdicao(): void {
    this.formulario = this.formBuilder.group({
      id: [this.professor.id],
      nome: [this.professor.nome],
      email: [this.professor.email],
      senha: [this.professor.senha],
    })
    this.formulario.get('email').disable();
  }
  montarJson() {
    return {
      id: this.isEditar ? this.professor.id : null,
      nome: this.formulario.get('nome').value,
      email: this.formulario.get('email').value,
      senha: this.formulario.get('senha').value
    }
  }
  send() {
    if (this.isEditar) {
      this.atualizarProfessor();
    } else {
      this.salvar();
    }   
  }
  
  atualizarProfessor() {
    this.professorService.alterar(this.montarJson()).subscribe((value: any) => {
      this.formulario.reset();
      this.toastr.success(value.mensagem)
    },
      (err) => {
        this.toastr.error(err.error.message);
      });
  }
  
  salvar() {
    this.professorService.incluir(this.montarJson()).subscribe((value: any) => {
      this.formulario.reset();
      this.toastr.success(value.mensagem)
       },
       (err) => {
         this.toastr.error(err.error.message);
       });
  }

}