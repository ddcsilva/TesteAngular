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

    this.pessoaService.obterTodasPessoas().subscribe({
      next: (pessoas) => {
        this.pessoas.set(pessoas);
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
}
