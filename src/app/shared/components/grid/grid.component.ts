import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent<T = any> {
  // Inputs usando signals
  dados = input<T[]>([]);
  colunas = input<string[]>([]);
  mostrarAcoes = input<boolean>(false);

  // Estado interno
  loading = signal(false);

  constructor() {}

  // Método auxiliar para obter valor da coluna
  obterValorColuna(item: T, coluna: string): any {
    return (item as any)[coluna];
  }

  // Método para obter todas as colunas incluindo ações
  obterColunasComAcoes(): string[] {
    const colunas = this.colunas();
    return this.mostrarAcoes() ? [...colunas, 'acoes'] : colunas;
  }

  // Métodos para ações (sem funcionalidade ainda)
  onEditar(item: T) {
    console.log('Editar item:', item);
  }

  onExcluir(item: T) {
    console.log('Excluir item:', item);
  }
}
