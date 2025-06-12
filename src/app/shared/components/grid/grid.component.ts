import {
  Component,
  input,
  effect,
  ViewChild,
  AfterViewInit,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AcoesGridComponent } from '../acoes-grid/acoes-grid.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
    AcoesGridComponent,
  ],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent<T = any> implements AfterViewInit {
  // Signals (Angular 17+)
  dados = input<T[]>([]);
  colunas = input<string[]>([]);
  nomesColunas = input<Record<string, string>>({});
  mostrarAcoes = input<boolean>(false);

  // Configuração de botões de ação (passa para o componente filho)
  mostrarEditar = input<boolean>(false);
  mostrarExcluir = input<boolean>(false);
  mostrarCortar = input<boolean>(false);
  mostrarVisualizar = input<boolean>(false);
  mostrarAnexo = input<boolean>(false);
  mostrarOperacoes = input<boolean>(false);

  // Paginação
  totalRegistros = input<number>(0);
  paginaAtual = input<number>(1);
  tamanhoPagina = input<number>(5);
  serverSide = input<boolean>(false);

  // Estado de loading
  carregando = input<boolean>(false);

  // Outputs
  paginaAlterada = output<{ pagina: number; tamanho: number }>();
  editar = output<T>();
  excluir = output<T>();
  cortar = output<T>();
  visualizar = output<T>();
  anexo = output<T>();
  operacoes = output<T>();

  dataSource = new MatTableDataSource<T>([]);

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor() {
    effect(() => {
      this.dataSource.data = this.dados();
    });
  }

  ngAfterViewInit() {
    // Null-check nos elementos
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    if (!this.serverSide() && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  obterValorColuna(item: T, coluna: string): any {
    return (item as any)[coluna];
  }

  obterColunasComAcoes(): string[] {
    const colunas = this.colunas();
    return this.mostrarAcoes() ? [...colunas, 'acoes'] : colunas;
  }

  obterNomeColuna(coluna: string): string {
    const nomes = this.nomesColunas();
    return nomes[coluna] || coluna;
  }

  onPaginaAlterada(event: any) {
    const novaPagina = event.pageIndex + 1;
    const novoTamanho = event.pageSize;
    this.paginaAlterada.emit({ pagina: novaPagina, tamanho: novoTamanho });
  }

  aoEditar(item: T) {
    this.editar.emit(item);
  }
  aoExcluir(item: T) {
    this.excluir.emit(item);
  }
  aoCortar(item: T) {
    this.cortar.emit(item);
  }
  aoVisualizar(item: T) {
    this.visualizar.emit(item);
  }
  aoVisualizarAnexo(item: T) {
    this.anexo.emit(item);
  }
  aoVisualizarOperacoes(item: T) {
    this.operacoes.emit(item);
  }
}
