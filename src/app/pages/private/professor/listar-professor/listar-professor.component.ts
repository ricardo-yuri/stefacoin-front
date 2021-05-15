import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Professor } from './../../../../models/professor';
import { ProfessorService } from './../../../../services/professor.service';
import { Component, OnChanges, OnInit, TemplateRef } from '@angular/core';


@Component({
  selector: 'app-listar-professor',
  templateUrl: './listar-professor.component.html',
  styleUrls: ['./listar-professor.component.css']
})
export class ListarProfessorComponent implements OnInit {

  constructor(private professorService: ProfessorService, private toastr: ToastrService, private router: Router, private modalService: BsModalService) { }


  professores: Professor[];
  professorSerExcluido: Professor;
  modalRef: BsModalRef;


  ngOnInit(): void {
    this.listar();
  }

  openModal(template: TemplateRef<any>, professor: Professor) {
    this.professorSerExcluido = professor;
    this.modalRef = this.modalService.show(template);
  }

  listar() {
    this.professorService.listar({}).subscribe((data) => {
      this.professores = data;
    });
  }

  atualizar(professor: Professor) {
    this.professorService.updateData(professor);
    this.professorService.isEditar = true;
    this.router.navigate(['adicionar']);
  }


  delete(professor: Professor, template: TemplateRef<any>): void {
    this.modalService.show(template)
    this.professorSerExcluido = professor;
  }
  
  confirmExclusao() {
    this.professorService.excluir(this.professorSerExcluido.id).subscribe((retorno: any) => {
      this.toastr.success(retorno.mensagem);
      this.listar();
    }, (err) => {
      this.toastr.error(err.mensagem);
    })
    this.modalService.hide();
  }

  closeExclusao() {
    this.modalService.hide();
  }


}
  
