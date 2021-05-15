import { Usuario } from './usuario';
import { Curso } from './curso';
export interface Aluno extends Usuario{
  
  formacao?: string;
  idade?: number
  cursos?: Curso[];
}
