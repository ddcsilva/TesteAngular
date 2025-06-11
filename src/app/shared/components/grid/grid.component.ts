import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TitleCasePipe, CommonModule } from '@angular/common';
import { catchError, Observable, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    TitleCasePipe,
    CommonModule,
  ],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent<T> implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() colunas: string[] = [];
  @Input() nomesColunas: { [key: string]: string } = {};
  @Input() dadosObservable!: Observable<{ itens: T[]; totalItens: number }>;
  @Input() acoesTemplate: TemplateRef<{ $implicit: T }> | null = null;
  @Output() mudancaPagina = new EventEmitter<PageEvent>();
  @Output() exportar = new EventEmitter<void>();

  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  totalItens = 0;
  itensPorPagina = 10;
  paginaAtual = 0;

  private unsubscribe$ = new Subject<void>();

  get colunasComAcoes(): string[] {
    return this.acoesTemplate ? [...this.colunas, 'Ações'] : this.colunas;
  }

  ngOnInit(): void {
    this.atualizaPaginacao();
    this.inicializarDados();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  atualizaPaginacao(): void {
    const paginaAtualStorage = localStorage.getItem('paginaAtual');
    if (paginaAtualStorage) {
      this.paginaAtual = +paginaAtualStorage - 1;
    }
  }

  aoMudarPagina(evento: PageEvent): void {
    this.mudancaPagina.emit(evento);
  }

  aoExportar(): void {
    this.exportar.emit();
  }

  rastrearPorColuna(index: number, coluna: string): string {
    return coluna;
  }

  private inicializarDados(): void {
    this.dadosObservable
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError((erro) => {
          console.error(`Erro ao carregar dados: ${erro}`);
          return of({ itens: [], totalItens: 0 });
        })
      )
      .subscribe((resposta) =>
        this.atualizarDataSource(resposta.itens, resposta.totalItens)
      );
  }

  private atualizarDataSource(dados: T[], total: number): void {
    this.dataSource.data = dados;
    this.totalItens = total;
  }
}
