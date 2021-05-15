import { Mensagem } from './../models/mensagem';
import { Aluno } from './../models/aluno';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

const URL = 'http://localhost:3000/stefanini/aluno';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {

  private content = new BehaviorSubject<Aluno>(null);
  public share = this.content.asObservable();
  isEditar: boolean;
  constructor(private httpClient: HttpClient) { }

  updateData(text) {
    this.content.next(text)
  }

  listar(filtro: Partial<Aluno>): Observable<Aluno[]> {
    return this.httpClient.get<Aluno[]>(URL,{});
  }
  
  obter(id: Number): Observable<Aluno> {
    return this.httpClient.get<Aluno>(`${URL}/${id}`);
  }

  incluir(aluno: Aluno): Observable<Mensagem> {
    return this.httpClient.post<Aluno>(URL, aluno);
  }
  
  excluir(id: Number) {
    return this.httpClient.delete<Mensagem>(`${URL}/${id}`)
  }

  atualizar(aluno: Aluno): Observable<Mensagem> {
    return this.httpClient.put<Aluno>(`${URL}/${aluno.id}`, aluno);
  }

}