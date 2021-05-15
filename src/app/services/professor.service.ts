import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';
import { Professor } from '../models/professor';

const URL = 'http://localhost:3000/stefanini/professor';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {

  private content = new BehaviorSubject<Professor>(null);
  public share = this.content.asObservable();
  isEditar: boolean;
  constructor(private httpClient: HttpClient) { }
  

  updateData(text) {
    this.content.next(text)
  }

  // #pegabandeira
  listar(filtro: Partial<Professor>): Observable<Professor[]> {
    return this.httpClient.get<Professor[]>(URL,{});
  }

  obter(id: number) {
    return this.httpClient.get(`${URL}/${id}`)
  }

  incluir(professor: Professor): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, professor);
  }

  alterar(professor: Professor): Observable<Mensagem> {
    return this.httpClient.put<Mensagem>(`${URL}/${professor.id}`, professor);
  }

  excluir(id: Number) {
    return this.httpClient.delete<Mensagem>(`${URL}/${id}`)
  }
}
