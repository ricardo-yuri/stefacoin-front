import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Aluno } from './../../../../models/aluno';
import { AlunoService } from './../../../../services/aluno.service';
import { OnInit, Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso';



@Component({
  selector: 'app-listar-aluno',
  templateUrl: './listar-aluno.component.html',
  styleUrls: ['./listar-aluno.component.css']
})
export class ListarAlunoComponent implements OnInit {
  
  constructor(private modalService: BsModalService, private alunoService: AlunoService, private router: Router, private toastr: ToastrService, private cursoService: CursoService) { }
  modalRef: BsModalRef;
  
  alunos: Aluno[] = [];
  alunoAdicionarCurso: Aluno;
  cursos: Curso[] = [];
  cursoSelecionado: Curso;
  alunoSerExcluido: Aluno;

  ngOnInit(): void {
    this.listar();
    this.listarCurso();
  }

  listarCurso() {
    this.cursoService.listar({}).subscribe( (data) => {
      this.cursos = data;
    });
  }

  adicionarNovoCurso(aluno: Aluno, idCurso: number) {
    const jaPossuiCurso = aluno.cursos.some((curso) => {
      return curso.id === idCurso;
    });
    if(jaPossuiCurso) {
      this.toastr.error('Aluno já possui o curso, não é possível adicioná-lo novamente');
    } else {
      aluno.cursos.push({
        id: idCurso
      });
      this.alunoService.atualizar(aluno).subscribe( (value) => {
         this.toastr.success('Curso adicionado com sucesso!')
      });
    }
  }

  delete(aluno: Aluno, template: TemplateRef<any>) {
    this.alunoSerExcluido = aluno;
    this.modalService.show(template);
    console.log('zagaaaa', this.alunoSerExcluido)
   
  }

  openModal(template: TemplateRef<any>, aluno: Aluno) {
    this.modalRef = this.modalService.show(template);
    this.alunoAdicionarCurso = aluno;
  }

  listar() {
    this.alunoService.listar({}).subscribe(value => this.alunos = value);
  }

  atualizar(aluno: Aluno) {
    this.alunoService.updateData(aluno);
    this.alunoService.isEditar = true;
    this.router.navigate(['adicionar-aluno']);
  }

  closeExclusao() {
    this.modalService.hide()

  }

  confirmExclusao() {
    
      this.alunoService.excluir(this.alunoSerExcluido.id).subscribe((data: any) => {
        this.toastr.success(data.mensagem)
        this.listar();
      },
        (err) => {
          this.toastr.error(err.mensagem);
        });
    this.modalService.hide()
    
  
  }
}