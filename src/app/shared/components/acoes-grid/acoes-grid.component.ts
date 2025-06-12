import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-acoes-grid',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './acoes-grid.component.html',
  styleUrls: ['./acoes-grid.component.scss'],
})
export class AcoesGridComponent<T = any> {
  // Item do grid
  item = input.required<T>();

  // Configuração de quais ações mostrar
  mostrarEditar = input<boolean>(true);
  mostrarExcluir = input<boolean>(true);
  mostrarCortar = input<boolean>(false);
  mostrarVisualizar = input<boolean>(false);
  mostrarAnexo = input<boolean>(false);
  mostrarOperacoes = input<boolean>(false);

  // Outputs para emitir as ações
  editar = output<T>();
  excluir = output<T>();
  cortar = output<T>();
  visualizar = output<T>();
  anexo = output<T>();
  operacoes = output<T>();

  // Métodos para cada ação
  aoEditar() {
    this.editar.emit(this.item());
  }

  aoExcluir() {
    this.excluir.emit(this.item());
  }

  aoCortar() {
    this.cortar.emit(this.item());
  }

  aoVisualizar() {
    this.visualizar.emit(this.item());
  }

  aoVisualizarAnexo() {
    this.anexo.emit(this.item());
  }

  aoVisualizarOperacoes() {
    this.operacoes.emit(this.item());
  }
}
