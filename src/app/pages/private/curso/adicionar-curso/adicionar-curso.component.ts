import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Aula } from "src/app/models/aula";
import { Curso } from "src/app/models/curso";
import { Professor } from "src/app/models/professor";
import { CursoService } from "src/app/services/curso.service";
import { ProfessorService } from "src/app/services/professor.service";



@Component({
    selector: 'app-adicionar-curso',
    templateUrl: './adicionar-curso.component.html',
    styleUrls: ['./adicionar-curso.component.css']
  })
export class AdicionarCursoComponent implements OnInit {

    constructor(private cursoService: CursoService, private toastr: ToastrService, private professorService: ProfessorService, private modalService: BsModalService) {}
    modalRef: BsModalRef;
    formulario: FormGroup;
    formBuilder = new FormBuilder();
    isEditar: boolean = false;
    isAulaEditada: boolean = false;
    cursoEditavel: Curso = null;
    professorCursoEditavel: Professor;
    
    nomeAula: string = "";
    duracao: number = null;
    topicos: string[] = [];
    
   

    professores: Professor[] = [];
    aulas: Aula[] = [];

    ngOnInit(): void {
        this.isEditar = this.cursoService.isEditar;
        if (this.isEditar) {
            this.atualizar();
      
        } else {
            this.initFormInclusao();

          }

        this.listarProfessores();
    }




    atualizar() {
        this.cursoService.share.subscribe((data: Curso) => {
            this.cursoEditavel = data;
            this.initFormEdicao();
          })
    }

    carregarProfPeloId(id: number) {
        this.professorService.obter(id).subscribe((retorno) => {
        })
    } 

    initFormEdicao() {
        this.formulario = this.formBuilder.group({
            id: [this.cursoEditavel.id],
            nome: [this.cursoEditavel.nome],
            descricao: [this.cursoEditavel.descricao],
            professor: [this.cursoEditavel.idProfessor],
            aulas: [this.cursoEditavel.aulas]
          })
    }


    openModal(template: TemplateRef<any>) {
        this.isAulaEditada = false;
        this.modalRef = this.modalService.show(template);
        this.nomeAula = '';
        this.duracao = null;
        this.topicos = [];
      }

    listarProfessores() {
        this.professorService.listar({}).subscribe( (data) => this.professores = data);
    }


    initFormInclusao(): void {
        this.formulario = this.formBuilder.group({
          nome: [null],
          professor: [null],
          aulas: [null],
          descricao: [null]
       })
    }

    montarJsonAula(): Aula {
        return {
            nome: this.nomeAula,
            duracao: this.duracao,
            topicos: this.topicos
        }
    }

    sendNovaAula() {
        if (!this.isAulaEditada) {
          this.aulas.push(this.montarJsonAula());
        } else {
            const index = this.aulas.indexOf(this.montarJsonAula());
        }
       
        this.modalService.hide();
    }
    
    salvarCurso() {
        if (!this.isEditar) {
            this.cursoService.incluir(this.montarJsonCurso()).subscribe((value: any) => {
                this.toastr.success(value.mensagem)
            },
                (err) => {
                    this.toastr.error(err.mensagem);
                })
        } else {
            this.cursoService.alterar(this.montarJsonCurso()).subscribe((value: any) => {
                this.toastr.success(value.mensagem);
            })
        }
       
        this.formulario.reset();
    }

    editarAula(aula: Aula, template: TemplateRef<any>) {
        this.modalService.show(template);
        if (aula.nome) {
            this.isAulaEditada = true;
        }
    }

    montarJsonCurso(): Curso {
        return {
            id: this.isEditar ? this.cursoEditavel.id : null,
            idProfessor: this.formulario.get('professor').value,
            descricao: this.formulario.get('descricao').value,
            nome: this.formulario.get('nome').value,
            aulas: this.aulas
        }
    }

}