import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, forkJoin } from 'rxjs';
import { Pessoa, PaginatedResponse } from '../models/pessoa.model';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private apiUrl = 'http://localhost:3000/pessoas';

  constructor(private http: HttpClient) {}

  // Obter todas as pessoas
  obterTodasPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.apiUrl);
  }

  // Obter pessoa por ID
  obterPessoaPorId(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.apiUrl}/${id}`);
  }

  // Criar nova pessoa
  criarPessoa(pessoa: Omit<Pessoa, 'id'>): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.apiUrl, pessoa);
  }

  // Atualizar pessoa
  atualizarPessoa(id: number, pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.apiUrl}/${id}`, pessoa);
  }

  // Deletar pessoa
  deletarPessoa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obter pessoas com paginação (simulando server-side)
  obterPessoasPaginadas(
    page: number = 1,
    limit: number = 5
  ): Observable<PaginatedResponse<Pessoa>> {
    return this.http.get<Pessoa[]>(this.apiUrl).pipe(
      map((todasPessoas) => {
        // Calcula índices para paginação
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        // Slice dos dados para simular paginação
        const dadosPaginados = todasPessoas.slice(startIndex, endIndex);

        return {
          data: dadosPaginados,
          total: todasPessoas.length,
          page: page,
          limit: limit,
        };
      })
    );
  }
}
