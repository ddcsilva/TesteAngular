import {
  Component,
  input,
  effect,
  ViewChild,
  AfterViewInit,
  output,
  ContentChild,
  TemplateRef,
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
    MatPaginatorModule,
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

  // Inputs para paginação server-side (opcionais)
  totalRegistros = input<number>(0);
  paginaAtual = input<number>(1);
  tamanhoPagina = input<number>(5);
  serverSide = input<boolean>(false);

  // Output para comunicar mudanças de página
  paginaAlterada = output<{ pagina: number; tamanho: number }>();

  // Outputs para ações customizáveis
  editar = output<T>();
  excluir = output<T>();
  acaoCustomizada = output<{ acao: string; item: T }>();

  // Template customizado para ações
  @ContentChild('acoesTemplate') acoesTemplate?: TemplateRef<any>;

  // DataSource para a tabela Material com ordenação
  dataSource = new MatTableDataSource<T>([]);

  // ViewChild para acessar o MatSort e MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    // Effect para atualizar os dados do dataSource quando dados() mudar
    effect(() => {
      this.dataSource.data = this.dados();
    });
  }

  ngAfterViewInit() {
    // Conecta o MatSort com o dataSource
    this.dataSource.sort = this.sort;

    // Só conecta o paginator se for client-side
    if (!this.serverSide()) {
      this.dataSource.paginator = this.paginator;
    }
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

  // Método para lidar com mudanças de página (server-side)
  onPaginaAlterada(event: any) {
    const novaPagina = event.pageIndex + 1; // MatPaginator usa 0-based
    const novoTamanho = event.pageSize;
    this.paginaAlterada.emit({ pagina: novaPagina, tamanho: novoTamanho });
  }

  // Métodos para ações - emitem eventos para o componente pai
  aoEditar(item: T) {
    this.editar.emit(item);
  }

  aoExcluir(item: T) {
    this.excluir.emit(item);
  }

  // Método para ações customizadas
  aoAcaoCustomizada(acao: string, item: T) {
    this.acaoCustomizada.emit({ acao, item });
  }
}
