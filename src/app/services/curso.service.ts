import { Mensagem } from './../models/mensagem';
import { Observable, BehaviorSubject } from 'rxjs';
import { Curso } from './../models/curso';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const URL = 'http://localhost:3000/stefanini/curso';


@Injectable({
  providedIn: 'root',
})
export class CursoService {

  isEditar: boolean;
  private content = new BehaviorSubject<Curso>(null);
  public share = this.content.asObservable();
  constructor(private httpClient: HttpClient) { }

  updateData(text) {
    this.content.next(text)
  }

listar(filtro: Partial<Curso>): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(URL,{});
}
  
  incluir(curso: Curso): Observable<Mensagem> {
    return this.httpClient.post<Curso>(URL, curso);
  }

  excluir(id: Number) {
    return this.httpClient.delete<Mensagem>(`${URL}/${id}`)
  }
  
  alterar(curso: Curso): Observable<Mensagem> {
    return this.httpClient.put<Curso>(`${URL}/${curso.id}`, curso);
  }
  
}