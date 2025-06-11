export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
  dataNascimento: string;
}

// Interface para resposta paginada
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
