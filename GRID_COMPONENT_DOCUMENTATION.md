# GridComponent - Documentação Completa

## 📋 Visão Geral

O `GridComponent` é um componente de tabela avançado e moderno para Angular 17+, construído com signals e Material Design. Oferece funcionalidades completas de visualização de dados com paginação server-side/client-side, ordenação, ações customizáveis e estados visuais intuitivos.

## 🚀 Características Principais

- ✅ **Angular 17+ com Signals** - Tecnologia mais moderna
- ✅ **Material Design** - Interface bonita e consistente
- ✅ **Paginação Flexível** - Server-side ou client-side
- ✅ **Ordenação Nativa** - Com MatSort integrado
- ✅ **Ações Componentizadas** - Sistema de botões modular
- ✅ **Estados Visuais** - Loading, empty state, erro
- ✅ **Responsivo** - Funciona em mobile/desktop
- ✅ **TypeScript Genérico** - Type-safe para qualquer tipo de dados
- ✅ **Zero Memory Leaks** - Cleanup automático

## 📦 Instalação e Dependências

### Dependências Necessárias

```bash
npm install @angular/material @angular/cdk
```

### Imports Necessários no Module/Standalone

```typescript
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
```

## 🔧 Interface e Propriedades

### Inputs (Propriedades de Entrada)

#### **Dados da Tabela**
| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `dados` | `T[]` | `[]` | Array de dados para exibir na tabela |
| `colunas` | `string[]` | `[]` | Nomes das colunas a serem exibidas |
| `nomesColunas` | `Record<string, string>` | `{}` | Mapeamento de nomes amigáveis para colunas |

#### **Configurações de Ações**
| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `mostrarAcoes` | `boolean` | `false` | Exibe coluna de ações |
| `mostrarEditar` | `boolean` | `false` | Mostra botão de editar |
| `mostrarExcluir` | `boolean` | `false` | Mostra botão de excluir |
| `mostrarCortar` | `boolean` | `false` | Mostra botão de cortar |
| `mostrarVisualizar` | `boolean` | `false` | Mostra botão de visualizar |
| `mostrarAnexo` | `boolean` | `false` | Mostra botão de anexos |
| `mostrarOperacoes` | `boolean` | `false` | Mostra botão de operações |

#### **Configurações de Paginação**
| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `totalRegistros` | `number` | `0` | Total de registros (server-side) |
| `paginaAtual` | `number` | `1` | Página atual (server-side) |
| `tamanhoPagina` | `number` | `5` | Quantidade de itens por página |
| `serverSide` | `boolean` | `false` | Ativa paginação server-side |

#### **Estados de Interface**
| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `carregando` | `boolean` | `false` | Exibe indicador de carregamento |

### Outputs (Eventos de Saída)

#### **Eventos de Paginação**
| Evento | Tipo | Descrição |
|--------|------|-----------|
| `paginaAlterada` | `{pagina: number, tamanho: number}` | Disparado quando página/tamanho muda |

#### **Eventos de Ações**
| Evento | Tipo | Descrição |
|--------|------|-----------|
| `editar` | `T` | Item a ser editado |
| `excluir` | `T` | Item a ser excluído |
| `cortar` | `T` | Item a ser cortado |
| `visualizar` | `T` | Item a ser visualizado |
| `anexo` | `T` | Item para gerenciar anexos |
| `operacoes` | `T` | Item para operações |

## 💻 Exemplos de Uso

### Exemplo Básico

```typescript
// component.ts
import { Component, signal } from '@angular/core';
import { GridComponent } from './shared/components/grid/grid.component';

interface Pessoa {
  id: number;
  nome: string;
  idade: number;
  dataNascimento: string;
}

@Component({
  selector: 'app-exemplo',
  standalone: true,
  imports: [GridComponent],
  template: `
    <app-grid
      [dados]="pessoas()"
      [colunas]="colunas"
      [nomesColunas]="nomesColunas"
      [mostrarAcoes]="true"
      [mostrarEditar]="true"
      [mostrarExcluir]="true"
      (editar)="aoEditar($event)"
      (excluir)="aoExcluir($event)"
    ></app-grid>
  `
})
export class ExemploComponent {
  pessoas = signal<Pessoa[]>([
    { id: 1, nome: 'João Silva', idade: 30, dataNascimento: '1994-03-15' },
    { id: 2, nome: 'Maria Santos', idade: 25, dataNascimento: '1999-07-22' }
  ]);

  colunas = ['id', 'nome', 'idade', 'dataNascimento'];

  nomesColunas = {
    id: 'ID',
    nome: 'Nome Completo',
    idade: 'Idade',
    dataNascimento: 'Data de Nascimento'
  };

  aoEditar(pessoa: Pessoa) {
    console.log('Editando:', pessoa);
  }

  aoExcluir(pessoa: Pessoa) {
    console.log('Excluindo:', pessoa);
  }
}
```

### Exemplo com Paginação Server-Side

```typescript
// component.ts
@Component({
  selector: 'app-exemplo-paginado',
  standalone: true,
  imports: [GridComponent],
  template: `
    <app-grid
      [dados]="pessoas()"
      [colunas]="colunas"
      [nomesColunas]="nomesColunas"
      [serverSide]="true"
      [totalRegistros]="totalRegistros()"
      [paginaAtual]="paginaAtual()"
      [tamanhoPagina]="tamanhoPagina()"
      [carregando]="carregando()"
      [mostrarAcoes]="true"
      [mostrarEditar]="true"
      [mostrarExcluir]="true"
      [mostrarVisualizar]="true"
      (paginaAlterada)="aoAlterarPagina($event)"
      (editar)="aoEditar($event)"
      (excluir)="aoExcluir($event)"
      (visualizar)="aoVisualizar($event)"
    ></app-grid>
  `
})
export class ExemploPaginadoComponent implements OnInit {
  pessoas = signal<Pessoa[]>([]);
  carregando = signal(false);
  totalRegistros = signal(0);
  paginaAtual = signal(1);
  tamanhoPagina = signal(5);

  colunas = ['id', 'nome', 'idade', 'dataNascimento'];
  nomesColunas = {
    id: 'ID',
    nome: 'Nome Completo',
    idade: 'Idade',
    dataNascimento: 'Data de Nascimento'
  };

  constructor(private service: PessoaService) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.carregando.set(true);
    const pagina = this.paginaAtual();
    const tamanho = this.tamanhoPagina();

    this.service.obterPessoasPaginadas(pagina, tamanho).subscribe({
      next: (resultado) => {
        this.pessoas.set(resultado.data);
        this.totalRegistros.set(resultado.total);
        this.carregando.set(false);
      },
      error: (err) => {
        console.error('Erro:', err);
        this.carregando.set(false);
      }
    });
  }

  aoAlterarPagina(evento: { pagina: number; tamanho: number }) {
    this.paginaAtual.set(evento.pagina);
    this.tamanhoPagina.set(evento.tamanho);
    this.carregarDados();
  }

  aoEditar(pessoa: Pessoa) {
    // Lógica de edição
  }

  aoExcluir(pessoa: Pessoa) {
    // Lógica de exclusão
  }

  aoVisualizar(pessoa: Pessoa) {
    // Lógica de visualização
  }
}
```

### Exemplo com Todas as Ações

```typescript
// component.ts
@Component({
  template: `
    <app-grid
      [dados]="dados()"
      [colunas]="colunas"
      [nomesColunas]="nomesColunas"
      [mostrarAcoes]="true"
      [mostrarEditar]="true"
      [mostrarExcluir]="true"
      [mostrarCortar]="true"
      [mostrarVisualizar]="true"
      [mostrarAnexo]="true"
      [mostrarOperacoes]="true"
      (editar)="aoEditar($event)"
      (excluir)="aoExcluir($event)"
      (cortar)="aoCortar($event)"
      (visualizar)="aoVisualizar($event)"
      (anexo)="aoVisualizarAnexo($event)"
      (operacoes)="aoVisualizarOperacoes($event)"
    ></app-grid>
  `
})
export class ExemploCompletoComponent {
  // ... propriedades ...

  aoEditar(item: any) { /* Editar */ }
  aoExcluir(item: any) { /* Excluir */ }
  aoCortar(item: any) { /* Cortar */ }
  aoVisualizar(item: any) { /* Visualizar */ }
  aoVisualizarAnexo(item: any) { /* Anexos */ }
  aoVisualizarOperacoes(item: any) { /* Operações */ }
}
```

## 🎨 Customização de Estilos

### Classes CSS Disponíveis

```scss
// Customização do card principal
:host ::ng-deep mat-card {
  border-radius: 16px;
  box-shadow: custom-shadow;
}

// Customização da tabela
:host ::ng-deep .mat-mdc-table {
  background: custom-color;
}

// Cabeçalhos personalizados
:host ::ng-deep .mat-mdc-header-cell {
  background-color: custom-header-bg;
  color: custom-header-color;
  font-weight: bold;
}

// Linhas personalizadas
:host ::ng-deep .mat-mdc-row:hover {
  background-color: custom-hover-color;
}

// Coluna de ações personalizada
:host ::ng-deep .coluna-acoes {
  width: custom-width;
}
```

### Estados Visuais

O componente possui três estados visuais automáticos:

1. **Loading State**: Spinner centralizado com mensagem
2. **Empty State**: Ícone e mensagem quando sem dados
3. **Data State**: Tabela com dados e paginação

## 🔄 Fluxo de Funcionamento

### Paginação Client-Side
1. Todos os dados são carregados uma vez
2. MatPaginator controla a visualização
3. Não há chamadas para servidor ao paginar

### Paginação Server-Side
1. `serverSide="true"` ativa o modo
2. Evento `paginaAlterada` é emitido
3. Componente pai deve recarregar dados
4. Paginator é controlado manualmente

## ⚠️ Considerações Importantes

### Performance
- Use paginação server-side para grandes volumes (>1000 registros)
- O componente usa `ChangeDetectionStrategy.OnPush` para otimização
- Signals garantem updates eficientes

### TypeScript
- Componente é genérico: `GridComponent<T>`
- Type-safety completo em todos os eventos
- Interfaces bem definidas para todos os dados

### Responsividade
- Scroll horizontal automático em telas pequenas
- Colunas se adaptam ao espaço disponível
- Ações ficam visíveis em todas as resoluções

## 🐛 Solução de Problemas

### Problema: Dados não aparecem
```typescript
// ✅ Certifique-se que dados é um signal
dados = signal<T[]>([]);

// ❌ Não use propriedades normais
dados: T[] = [];
```

### Problema: Paginação não funciona
```typescript
// ✅ Para server-side, implemente o evento
aoAlterarPagina(evento: { pagina: number; tamanho: number }) {
  // Recarregar dados do servidor
}

// ✅ Para client-side, deixe serverSide=false
[serverSide]="false"
```

### Problema: Ações não aparecem
```typescript
// ✅ Ative as ações necessárias
[mostrarAcoes]="true"
[mostrarEditar]="true"

// ✅ Implemente os eventos
(editar)="aoEditar($event)"
```

## 📚 Arquivos do Componente

- `grid.component.ts` - Lógica principal e signals
- `grid.component.html` - Template com @if/@for
- `grid.component.scss` - Estilos responsivos
- `acoes-grid.component.*` - Componente filho para ações

## 🔗 Integração com Outros Componentes

O GridComponent funciona perfeitamente com:
- Formulários reativos
- Dialogs do Material
- Services HTTP
- Estado global (NgRx, Akita)
- Roteamento Angular

---

**Desenvolvido com Angular 17+ e Material Design** 🚀
