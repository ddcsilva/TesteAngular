import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PessoaService } from './services/pessoa.service';
import { Pessoa } from './models/pessoa.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Teste';
  pessoas: Pessoa[] = [];
  loading = false;
  error = '';

  constructor(private pessoaService: PessoaService) {}

  ngOnInit() {
    this.carregarPessoas();
  }

  carregarPessoas() {
    this.loading = true;
    this.error = '';

    this.pessoaService.obterTodasPessoas().subscribe({
      next: (pessoas) => {
        this.pessoas = pessoas;
        this.loading = false;
      },
      error: (err) => {
        this.error =
          'Erro ao carregar pessoas. Verifique se o json-server está rodando.';
        this.loading = false;
        console.error('Erro:', err);
      },
    });
  }
}
