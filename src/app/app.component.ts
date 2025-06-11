import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridComponent } from './shared/components/grid/grid.component';
import { Pessoa } from './models/pessoa.model';
import { PessoaService } from './services/pessoa.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Sistema de Grid';

  // Usando signals para os dados
  pessoas = signal<Pessoa[]>([]);
  loading = signal(false);
  error = signal('');

  // Signals para paginação server-side
  paginaAtual = signal(1);
  tamanhoPagina = signal(5);
  totalRegistros = signal(0);

  // Colunas que queremos exibir (pode ser dinâmico baseado no objeto)
  colunasGrid = ['id', 'nome', 'idade', 'dataNascimento'];

  // Nomes customizados das colunas
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
    this.loading.set(true);
    this.error.set('');

    const pagina = this.paginaAtual();
    const tamanho = this.tamanhoPagina();

    this.pessoaService.obterPessoasPaginadas(pagina, tamanho).subscribe({
      next: (resultado) => {
        this.pessoas.set(resultado.data);
        this.totalRegistros.set(resultado.total);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(
          'Erro ao carregar dados. Verifique se o json-server está rodando.'
        );
        this.loading.set(false);
        console.error('Erro:', err);
      },
    });
  }

  // Método para lidar com mudanças de página do grid
  onPaginaAlterada(evento: { pagina: number; tamanho: number }) {
    this.paginaAtual.set(evento.pagina);
    this.tamanhoPagina.set(evento.tamanho);
    this.carregarPessoas(); // Recarrega os dados com nova paginação
  }
}
