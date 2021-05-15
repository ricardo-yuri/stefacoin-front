import { Avaliacao } from './avaliacao';
import { Aula } from './aula';

  export interface Curso {
  
  id?: number;
  nome?: string;
  descricao?: string;
  idProfessor?: number;
  aulas?: Aula[];
  avaliacoes?: Avaliacao[];


}