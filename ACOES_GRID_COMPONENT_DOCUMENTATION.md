# AcoesGridComponent - Documentação Completa

## 📋 Visão Geral

O `AcoesGridComponent` é um componente especializado para exibir botões de ação em grids/tabelas, desenvolvido com Angular 17+ e Material Design. Oferece um conjunto pré-definido de ações comuns (visualizar, editar, cortar, anexar, operações, excluir) com design consistente e responsivo.

## 🚀 Características Principais

- ✅ **Angular 17+ com Signals** - Inputs/outputs modernos
- ✅ **6 Ações Pré-definidas** - Botões otimizados para uso comum
- ✅ **Material Design** - Botões e ícones consistentes
- ✅ **Cores Semânticas** - Cada ação tem cor específica
- ✅ **Tooltips Integrados** - Descrições úteis para cada ação
- ✅ **Responsivo** - Se adapta a diferentes tamanhos de tela
- ✅ **TypeScript Genérico** - Type-safe para qualquer tipo de item
- ✅ **Customizável** - Mostrar/ocultar ações individualmente

## 🎨 Sistema de Cores das Ações

| Ação | Cor | Ícone | Tooltip |
|------|-----|-------|---------|
| **Visualizar** | 🟢 Teal (`#009688`) | `visibility` | "Visualizar Detalhes" |
| **Editar** | 🔵 Azul (`#1976d2`) | `edit` | "Editar" |
| **Cortar** | 🟣 Roxo (`#9c27b0`) | `content_cut` | "Cortar" |
| **Anexo** | 🟠 Laranja (`#ff9800`) | `attach_file` | "Gerenciar Anexos" |
| **Operações** | ⚫ Cinza (`#424242`) | `settings` | "Operações" |
| **Excluir** | 🔴 Vermelho (`#d32f2f`) | `delete` | "Excluir" |

## 🔧 Interface e Propriedades

### Inputs (Propriedades de Entrada)

#### **Item de Dados**
| Propriedade | Tipo | Obrigatório | Descrição |
|-------------|------|-------------|-----------|
| `item` | `T` | ✅ Sim | Item de dados da linha atual |

#### **Configurações de Visibilidade**
| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `mostrarEditar` | `boolean` | `true` | Mostra botão de editar |
| `mostrarExcluir` | `boolean` | `true` | Mostra botão de excluir |
| `mostrarCortar` | `boolean` | `false` | Mostra botão de cortar |
| `mostrarVisualizar` | `boolean` | `false` | Mostra botão de visualizar |
| `mostrarAnexo` | `boolean` | `false` | Mostra botão de anexos |
| `mostrarOperacoes` | `boolean` | `false` | Mostra botão de operações |

### Outputs (Eventos de Saída)

Todos os outputs emitem o item completo quando a ação é clicada:

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `editar` | `T` | Disparado ao clicar em editar |
| `excluir` | `T` | Disparado ao clicar em excluir |
| `cortar` | `T` | Disparado ao clicar em cortar |
| `visualizar` | `T` | Disparado ao clicar em visualizar |
| `anexo` | `T` | Disparado ao clicar em anexos |
| `operacoes` | `T` | Disparado ao clicar em operações |

## 💻 Exemplos de Uso

### Exemplo Básico (Editar + Excluir)

```typescript
// component.ts
import { Component } from '@angular/core';
import { AcoesGridComponent } from './shared/components/acoes-grid/acoes-grid.component';

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

@Component({
  selector: 'app-exemplo-basico',
  standalone: true,
  imports: [AcoesGridComponent],
  template: `
    <!-- Dentro de uma tabela -->
    <td>
      <app-acoes-grid
        [item]="usuario"
        [mostrarEditar]="true"
        [mostrarExcluir]="true"
        (editar)="aoEditar($event)"
        (excluir)="aoExcluir($event)"
      ></app-acoes-grid>
    </td>
  `
})
export class ExemploBasicoComponent {
  usuario: Usuario = {
    id: 1,
    nome: 'João Silva',
    email: 'joao@email.com'
  };

  aoEditar(usuario: Usuario) {
    console.log('Editando usuário:', usuario);
    // Abrir dialog de edição, navegar para rota, etc.
  }

  aoExcluir(usuario: Usuario) {
    console.log('Excluindo usuário:', usuario);
    // Confirmar exclusão, chamada para API, etc.
  }
}
```

### Exemplo Avançado (Todas as Ações)

```typescript
// component.ts
@Component({
  template: `
    <table>
      <tr *ngFor="let produto of produtos">
        <td>{{ produto.nome }}</td>
        <td>{{ produto.preco | currency }}</td>
        <td>
          <app-acoes-grid
            [item]="produto"
            [mostrarVisualizar]="true"
            [mostrarEditar]="true"
            [mostrarCortar]="true"
            [mostrarAnexo]="true"
            [mostrarOperacoes]="true"
            [mostrarExcluir]="true"
            (visualizar)="aoVisualizar($event)"
            (editar)="aoEditar($event)"
            (cortar)="aoCortar($event)"
            (anexo)="aoGerenciarAnexos($event)"
            (operacoes)="aoAbrirOperacoes($event)"
            (excluir)="aoExcluir($event)"
          ></app-acoes-grid>
        </td>
      </tr>
    </table>
  `
})
export class ExemploAvancadoComponent {
  produtos = [
    { id: 1, nome: 'Notebook', preco: 2500.00 },
    { id: 2, nome: 'Mouse', preco: 45.90 }
  ];

  aoVisualizar(produto: any) {
    // Abrir modal de detalhes
    console.log('👁️ Visualizando:', produto);
  }

  aoEditar(produto: any) {
    // Navegar para edição
    console.log('✏️ Editando:', produto);
  }

  aoCortar(produto: any) {
    // Copiar para clipboard
    console.log('✂️ Cortando:', produto);
  }

  aoGerenciarAnexos(produto: any) {
    // Abrir gerenciador de arquivos
    console.log('📎 Anexos:', produto);
  }

  aoAbrirOperacoes(produto: any) {
    // Abrir menu de operações
    console.log('⚙️ Operações:', produto);
  }

  aoExcluir(produto: any) {
    // Confirmar e excluir
    console.log('🗑️ Excluindo:', produto);
  }
}
```

### Exemplo com Permissões Condicionais

```typescript
// component.ts
@Component({
  template: `
    <app-acoes-grid
      [item]="documento"
      [mostrarVisualizar]="true"
      [mostrarEditar]="podeEditar(documento)"
      [mostrarExcluir]="podeExcluir(documento)"
      [mostrarAnexo]="temPermissaoAnexos"
      (visualizar)="aoVisualizar($event)"
      (editar)="aoEditar($event)"
      (excluir)="aoExcluir($event)"
      (anexo)="aoGerenciarAnexos($event)"
    ></app-acoes-grid>
  `
})
export class ExemploPermissoesComponent {
  documento = { id: 1, nome: 'Contrato.pdf', proprietario: 'user123' };
  usuarioAtual = 'user123';
  temPermissaoAnexos = true;

  podeEditar(documento: any): boolean {
    return documento.proprietario === this.usuarioAtual;
  }

  podeExcluir(documento: any): boolean {
    return documento.proprietario === this.usuarioAtual;
  }

  // Handlers...
}
```

### Exemplo no GridComponent

```typescript
// Uso dentro do GridComponent principal
@Component({
  template: `
    <app-grid
      [dados]="pessoas()"
      [colunas]="colunas"
      [nomesColunas]="nomesColunas"
      [mostrarAcoes]="true"
      [mostrarEditar]="true"
      [mostrarExcluir]="true"
      [mostrarVisualizar]="true"
      [mostrarAnexo]="false"
      [mostrarOperacoes]="false"
      [mostrarCortar]="false"
      (editar)="aoEditar($event)"
      (excluir)="aoExcluir($event)"
      (visualizar)="aoVisualizar($event)"
    ></app-grid>
  `
})
export class ExemploIntegradoComponent {
  // O GridComponent automaticamente passa as configurações
  // para o AcoesGridComponent interno
}
```

## 🎨 Customização de Estilos

### Estrutura CSS

```scss
.acoes-container {
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
```

### Customização de Cores

```scss
// Personalizar cores específicas
:host ::ng-deep {
  .btn-editar .mat-icon {
    color: #custom-blue;
  }

  .btn-excluir .mat-icon {
    color: #custom-red;
  }

  .btn-visualizar .mat-icon {
    color: #custom-green;
  }
}
```

### Customização de Tamanhos

```scss
// Botões maiores
:host ::ng-deep .acoes-container {
  button.mat-mdc-icon-button {
    width: 40px;
    height: 40px;

    .mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }
  }
}
```

### Customização de Layout

```scss
// Layout vertical
:host ::ng-deep .acoes-container {
  flex-direction: column;
  gap: 8px;
}

// Layout com espaçamento maior
:host ::ng-deep .acoes-container {
  gap: 8px;
  padding: 4px;
}
```

## 📱 Responsividade

### Breakpoints Automáticos

O componente se adapta automaticamente em diferentes tamanhos:

- **Desktop** (>768px): Botões de 32px, gap de 4px
- **Tablet** (≤768px): Botões de 28px, gap de 2px
- **Mobile** (≤480px): Botões de 24px, layout compacto

### Comportamento Responsivo

```scss
@media (max-width: 480px) {
  .acoes-container {
    gap: 2px;

    button {
      width: 28px;
      height: 28px;
    }
  }
}
```

## 🎯 Casos de Uso Comuns

### 1. Sistema de Documentos
```typescript
// Ações: Visualizar, Editar, Anexos, Excluir
[mostrarVisualizar]="true"
[mostrarEditar]="true"
[mostrarAnexo]="true"
[mostrarExcluir]="true"
```

### 2. Sistema de Usuários
```typescript
// Ações: Editar, Operações (resetar senha), Excluir
[mostrarEditar]="true"
[mostrarOperacoes]="true"
[mostrarExcluir]="true"
```

### 3. Sistema de Produtos
```typescript
// Ações: Visualizar, Editar, Cortar (duplicar), Excluir
[mostrarVisualizar]="true"
[mostrarEditar]="true"
[mostrarCortar]="true"
[mostrarExcluir]="true"
```

### 4. Sistema de Tarefas
```typescript
// Ações: Visualizar, Editar, Anexos, Operações (marcar como concluída)
[mostrarVisualizar]="true"
[mostrarEditar]="true"
[mostrarAnexo]="true"
[mostrarOperacoes]="true"
```

## ⚠️ Considerações Importantes

### Performance
- Componente usa `OnPush` por padrão (herda do GridComponent)
- Signals garantem updates eficientes
- Sem vazamentos de memória

### Acessibilidade
- Todos os botões têm tooltips descritivos
- Ícones Material Design são screen-reader friendly
- Cores com contraste adequado

### UX/UI
- Hover states visuais para feedback
- Cores semânticas para cada ação
- Layout flexível e responsivo

## 🐛 Solução de Problemas

### Problema: Botões não aparecem
```typescript
// ✅ Certifique-se de passar o item
[item]="meuItem"

// ✅ Ative as ações desejadas
[mostrarEditar]="true"
[mostrarExcluir]="true"
```

### Problema: Eventos não disparam
```typescript
// ✅ Implemente os handlers
(editar)="aoEditar($event)"
(excluir)="aoExcluir($event)"

// ✅ Verifique se o método existe
aoEditar(item: any) {
  console.log('Item:', item);
}
```

### Problema: Cores não aplicam
```typescript
// ✅ Use ::ng-deep para override
:host ::ng-deep .btn-editar .mat-icon {
  color: #custom-color;
}
```

## 📦 Dependências

### Angular Material
```typescript
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
```

### Ícones Material
O componente usa os seguintes ícones Material:
- `visibility` - Visualizar
- `edit` - Editar
- `content_cut` - Cortar
- `attach_file` - Anexos
- `settings` - Operações
- `delete` - Excluir

## 🔗 Integração

### Com GridComponent
```typescript
// Integração automática - configure apenas no GridComponent
<app-grid
  [mostrarAcoes]="true"
  [mostrarEditar]="true"
  [mostrarExcluir]="true"
  (editar)="aoEditar($event)"
  (excluir)="aoExcluir($event)"
></app-grid>
```

### Standalone
```typescript
// Uso independente em qualquer template
<app-acoes-grid
  [item]="meuItem"
  [mostrarEditar]="true"
  (editar)="aoEditar($event)"
></app-acoes-grid>
```

## 📚 Arquivos do Componente

- `acoes-grid.component.ts` - Lógica e signals
- `acoes-grid.component.html` - Template com @if para cada ação
- `acoes-grid.component.scss` - Estilos com cores semânticas

## 🚀 Evolução e Extensibilidade

### Adicionando Novas Ações
```typescript
// Para adicionar uma nova ação:
// 1. Adicionar input boolean
novaAcao = input<boolean>(false);

// 2. Adicionar output
novaAcao = output<T>();

// 3. Adicionar método
aoNovaAcao() {
  this.novaAcao.emit(this.item());
}

// 4. Adicionar no template
@if (novaAcao()) {
  <button mat-icon-button (click)="aoNovaAcao()">
    <mat-icon>novo_icone</mat-icon>
  </button>
}
```

---

**Desenvolvido com Angular 17+ e Material Design** 🎨✨
