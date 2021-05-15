import { TipoUsuario } from '../../../../../../stefacoin/src/utils/tipo-usuario.enum';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfessorService } from './../../../services/professor.service';
import { AlunoService } from './../../../services/aluno.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  

  constructor(private alunoService: AlunoService,
    private professorService: ProfessorService,
    private toast: ToastrService,
    private authService: AuthService,
    private router: Router) { }
  
    formulario: FormGroup;
    formBuilder = new FormBuilder();
  isAluno: boolean = false;

  ngOnInit(): void {
    this.initFormInclusao();
    this.test();
  }

    
  initFormInclusao(): void {
    this.formulario = this.formBuilder.group({
      nome: [null],
      email: [null],
      senha: [null],
      tipo: 'Selecione o tipo de conta',
      formacao: [null],
      idade: [null]
    });
  }

  test() {
    this.formulario.get('tipo').valueChanges.subscribe(( value) => {
      if (value == TipoUsuario.ALUNO) {
        this.isAluno = true;
      } else {
        this.isAluno = false;
             }

    })
  }

  montarJson() {
      return {
        nome: this.formulario.get('nome').value,
        email: this.formulario.get('email').value,
        senha: this.formulario.get('senha').value,
        tipo: this.formulario.get('tipo').value,
        formacao: this.isAluno ? this.formulario.get('formacao').value : null,
        idade: this.isAluno ? this.formulario.get('idade').value : null
      } 
    
  }


  
  cadastrar() {
    this.authService.cadastrarNovaConta(this.montarJson()).subscribe(() => this.toast.success('Conta cadastrada com sucesso'))
    this.router.navigate(['login']);
  }

}
