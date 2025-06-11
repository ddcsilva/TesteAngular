import {
  Component,
  input,
  signal,
  computed,
  effect,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSortModule,
  ],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent<T = any> implements AfterViewInit {
  // Inputs usando signals
  dados = input<T[]>([]);
  colunas = input<string[]>([]);
  nomesColunas = input<Record<string, string>>({});
  mostrarAcoes = input<boolean>(false);

  // Estado interno
  loading = signal(false);

  // DataSource para a tabela Material com ordenação
  dataSource = new MatTableDataSource<T>([]);

  // ViewChild para acessar o MatSort
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Effect para atualizar os dados do dataSource quando dados() mudar
    effect(() => {
      this.dataSource.data = this.dados();
    });
  }

  ngAfterViewInit() {
    // Conecta o MatSort com o dataSource
    this.dataSource.sort = this.sort;
  }

  // Método auxiliar para obter valor da coluna
  obterValorColuna(item: T, coluna: string): any {
    return (item as any)[coluna];
  }

  // Método para obter todas as colunas incluindo ações
  obterColunasComAcoes(): string[] {
    const colunas = this.colunas();
    return this.mostrarAcoes() ? [...colunas, 'acoes'] : colunas;
  }

  // Método para obter nome customizado da coluna
  obterNomeColuna(coluna: string): string {
    const nomes = this.nomesColunas();
    return nomes[coluna] || coluna;
  }

  // Métodos para ações (sem funcionalidade ainda)
  aoEditar(item: T) {
    console.log('Editar item:', item);
  }

  aoExcluir(item: T) {
    console.log('Excluir item:', item);
  }
}
