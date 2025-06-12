import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridComponent } from './shared/components/grid/grid.component';
import { Pessoa } from './models/pessoa.model';
import { PessoaService } from './services/pessoa.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    GridComponent,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Sistema de Grid';

  pessoas = signal<Pessoa[]>([]);
  carregando = signal(false);
  error = signal('');
  paginaAtual = signal(1);
  tamanhoPagina = signal(5);
  totalRegistros = signal(0);

  colunasGrid = ['id', 'nome', 'idade', 'dataNascimento'];
  nomesColunasGrid = {
    id: 'ID',
    nome: 'Nome Completo',
    idade: 'Idade',
    dataNascimento: 'Data de Nascimento',
  };

  constructor(private pessoaService: PessoaService) {}

  ngOnInit() {
    this.carregarPessoas();
  }

  carregarPessoas() {
    this.carregando.set(true);
    this.error.set('');
    const pagina = this.paginaAtual();
    const tamanho = this.tamanhoPagina();
    this.pessoaService.obterPessoasPaginadas(pagina, tamanho).subscribe({
      next: (resultado) => {
        this.pessoas.set(resultado.data);
        this.totalRegistros.set(resultado.total);
        this.carregando.set(false);
      },
      error: (err) => {
        this.error.set(
          'Erro ao carregar dados. Verifique se o json-server está rodando.'
        );
        this.carregando.set(false);
        console.error('Erro:', err);
      },
    });
  }

  aoAlterarPagina(evento: { pagina: number; tamanho: number }) {
    this.paginaAtual.set(evento.pagina);
    this.tamanhoPagina.set(evento.tamanho);
    this.carregarPessoas();
  }

  aoEditar(pessoa: Pessoa) {
    console.log('🖊️ Editar', pessoa); /* ... */
  }
  aoExcluir(pessoa: Pessoa) {
    /* ... */
  }
  aoVisualizar(pessoa: Pessoa) {
    console.log('👁️ Visualizar', pessoa);
  }
  aoVisualizarAnexo(pessoa: Pessoa) {
    console.log('📎 Anexo', pessoa);
  }
  aoVisualizarOperacoes(pessoa: Pessoa) {
    console.log('⚙️ Operações', pessoa);
  }
  aoCortar(pessoa: Pessoa) {
    console.log('✂️ Cortar', pessoa);
  }
}
