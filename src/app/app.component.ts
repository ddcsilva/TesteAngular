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

  // Métodos para lidar com ações do grid
  onEditar(pessoa: Pessoa) {
    console.log('🖊️ Editando pessoa:', pessoa);
    // Aqui você implementaria a lógica de edição
    // Por exemplo: abrir modal, navegar para página de edição, etc.
  }

  onExcluir(pessoa: Pessoa) {
    console.log('🗑️ Excluindo pessoa:', pessoa);
    // Aqui você implementaria a lógica de exclusão
    // Por exemplo: confirmar exclusão, fazer requisição DELETE, etc.
    if (confirm(`Deseja realmente excluir ${pessoa.nome}?`)) {
      this.pessoaService.deletarPessoa(pessoa.id).subscribe({
        next: () => {
          console.log('✅ Pessoa excluída com sucesso');
          this.carregarPessoas(); // Recarrega a lista
        },
        error: (err) => {
          console.error('❌ Erro ao excluir pessoa:', err);
        },
      });
    }
  }

  onAcaoCustomizada(evento: { acao: string; item: Pessoa }) {
    console.log('⚡ Ação customizada:', evento.acao, 'para:', evento.item);

    switch (evento.acao) {
      case 'visualizar':
        console.log('👁️ Visualizando detalhes de:', evento.item.nome);
        break;
      case 'anexo':
        console.log('📎 Gerenciando anexos de:', evento.item.nome);
        break;
      case 'historico':
        console.log('📚 Visualizando histórico de:', evento.item.nome);
        break;
      default:
        console.log('❓ Ação não reconhecida:', evento.acao);
    }
  }
}
