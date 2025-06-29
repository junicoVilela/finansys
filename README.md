# Finansys - Sistema de Controle Financeiro

Sistema de controle financeiro pessoal desenvolvido em Angular 17 com arquitetura modular e componentizada.

## 📋 Sobre o Projeto

O Finansys é uma aplicação web para gerenciamento de finanças pessoais que permite:
- Cadastro e gerenciamento de categorias
- Registro de lançamentos (receitas e despesas)
- Geração de relatórios com gráficos
- Controle de pagamentos
- Análise de balanço financeiro

## 🏗️ Arquitetura do Sistema

### Estrutura de Pastas

```
src/app/
├── core/                    # Módulo principal da aplicação
│   ├── components/          # Componentes globais (navbar, etc.)
│   ├── guards/              # Guards de autenticação e autorização
│   ├── interceptors/        # Interceptors HTTP
│   └── services/            # Serviços globais
├── shared/                  # Recursos compartilhados
│   ├── components/          # Componentes reutilizáveis
│   │   ├── base-resource-form/     # Formulário base para CRUD
│   │   ├── base-resource-list/     # Lista base para CRUD
│   │   ├── bread-crumb/            # Navegação breadcrumb
│   │   ├── form-field-error/       # Exibição de erros de formulário
│   │   ├── page-header/            # Cabeçalho de páginas
│   │   └── server-error-messages/  # Mensagens de erro do servidor
│   ├── models/              # Modelos base
│   ├── services/            # Serviços base
│   ├── utils/               # Utilitários
│   └── constants/           # Constantes da aplicação
├── pages/                   # Páginas da aplicação
│   ├── categories/          # Módulo de categorias
│   │   ├── category-form/   # Formulário de categoria
│   │   ├── category-list/   # Lista de categorias
│   │   └── shared/          # Serviços e modelos de categoria
│   ├── entries/             # Módulo de lançamentos
│   │   ├── entry-form/      # Formulário de lançamento
│   │   ├── entry-list/      # Lista de lançamentos
│   │   └── shared/          # Serviços e modelos de lançamento
│   └── reports/             # Módulo de relatórios
│       └── reports/         # Componente de relatórios
├── app-routing.ts           # Configuração de rotas
├── app.component.*          # Componente raiz
└── in-memory-database.ts    # Base de dados em memória
```

### Padrões Arquiteturais Implementados

#### 1. **Arquitetura em Camadas**
- **Apresentação**: Componentes Angular com templates e estilos
- **Lógica de Negócio**: Services e Models
- **Dados**: Angular In-Memory Web API

#### 2. **Padrão Repository**
- `BaseResourceService`: Classe abstrata com operações CRUD básicas
- `CategoryService` e `EntryService`: Implementações específicas

#### 3. **Componentes Base Reutilizáveis**
- `BaseResourceListComponent`: Lista genérica com funcionalidades de CRUD
- `BaseResourceFormComponent`: Formulário genérico para criação/edição
- Componentes especializados herdam e estendem a funcionalidade base

#### 4. **Injeção de Dependências**
- Uso do sistema de DI do Angular
- Services singleton para compartilhamento de estado
- Injector pattern para flexibilidade na injeção

#### 5. **Standalone Components**
- Componentes independentes sem necessidade de NgModules
- Imports diretos nos componentes
- Melhor tree-shaking e performance

### Funcionalidades Técnicas

#### **Gerenciamento de Estado**
- Estado local nos componentes
- Serviços para compartilhamento de dados
- Notificações com Toastr

#### **Validação de Formulários**
- Reactive Forms com validações customizadas
- Exibição de erros em tempo real
- Componente dedicado para mensagens de erro

#### **Tratamento de Erros**
- Interceptor HTTP para captura global de erros
- Componente para exibição de erros do servidor
- Sistema de notificações para feedback ao usuário

#### **Navegação e UX**
- Breadcrumb para navegação contextual
- Page headers padronizados
- Loading states durante operações assíncronas

#### **Relatórios e Visualização**
- Integração com PrimeNG Charts
- Gráficos de receitas e despesas por categoria
- Cálculos de balanço em tempo real
- Formatação de moeda brasileira

## 🚀 Tecnologias Utilizadas

- **Angular 17**: Framework principal
- **TypeScript**: Linguagem de programação
- **Bootstrap**: Framework CSS para styling
- **PrimeNG**: Biblioteca de componentes UI
- **Chart.js**: Biblioteca para gráficos
- **Angular In-Memory Web API**: Simulação de backend
- **ngx-toastr**: Sistema de notificações
- **currency-formatter**: Formatação de valores monetários

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Navegue até o diretório
cd finansys

# Instale as dependências
npm install
```

### Execução
```bash
# Servidor de desenvolvimento
ng serve

# Acesse http://localhost:4200
```

### Build
```bash
# Build para produção
ng build

# Os arquivos serão gerados em dist/
```

## 🧪 Testes

```bash
# Testes unitários
ng test

# Testes e2e
ng e2e
```

## 📊 Funcionalidades

### Categorias
- ✅ Listagem de categorias
- ✅ Criação de novas categorias
- ✅ Edição de categorias existentes
- ✅ Exclusão de categorias
- ✅ Validação de formulários

### Lançamentos
- ✅ Listagem de lançamentos (receitas e despesas)
- ✅ Criação de novos lançamentos
- ✅ Edição de lançamentos existentes
- ✅ Exclusão de lançamentos
- ✅ Associação com categorias
- ✅ Controle de status de pagamento
- ✅ Formatação de valores monetários

### Relatórios
- ✅ Relatórios por mês/ano
- ✅ Gráficos de receitas por categoria
- ✅ Gráficos de despesas por categoria
- ✅ Cálculo de balanço (receitas - despesas)
- ✅ Totalizadores formatados em moeda

### Delete Modal Reutilizável

O sistema agora possui um modal de confirmação de exclusão reutilizável integrado ao `BaseResourceListComponent`. Isso elimina a duplicação de código e garante consistência em toda a aplicação.

#### Como usar:

1. **Configuração no Componente Filho:**
```typescript
protected config: ResourceListConfig = {
  // ... outras configurações
  deleteModalConfig: {
    title: 'Excluir Item',
    message: 'Tem certeza que deseja excluir o item "{itemName}"?',
    itemType: 'item',
    deleteButtonText: 'Excluir',
    cancelButtonText: 'Cancelar',
    warningMessage: 'Esta ação não pode ser desfeita.',
    icon: 'bi-exclamation-triangle'
  }
};
```

2. **Implementar Método Abstrato:**
```typescript
protected getResourceDisplayName(resource: T): string {
  return resource.name || 'Item sem nome';
}
```

3. **Template (automático):**
```html
<app-confirm-delete-modal
  modalId="deleteModal"
  [data]="modalData"
  [isDeleting]="isDeleting"
  [itemType]="deleteModalConfig.itemType"
  [deleteButtonText]="deleteModalConfig.deleteButtonText"
  [cancelButtonText]="deleteModalConfig.cancelButtonText"
  (confirm)="confirmDelete()"
  (cancel)="cancelDelete()"
></app-confirm-delete-modal>
```

4. **Botão de Delete:**
```html
<button 
  class="btn btn-outline-danger"
  (click)="openDeleteModal(resource)"
  title="Excluir item">
  <i class="bi bi-trash"></i>
</button>
```

#### Benefícios:
- ✅ **Reutilização**: Todos os componentes herdam automaticamente
- ✅ **Consistência**: Comportamento padronizado
- ✅ **Manutenibilidade**: Mudanças centralizadas
- ✅ **Flexibilidade**: Configuração via `ResourceListConfig`
- ✅ **Menos Código**: Elimina duplicação entre componentes

#### Componentes Atualizados:
- `CategoryListComponent`
- `EntryListComponent`

## 🧹 Limpeza de Código

### **Funções Removidas (Não Utilizadas):**

#### **BaseResourceListComponent:**
- ❌ `deleteResource()` - substituído pela lógica no `confirmDelete`
- ❌ `hasFilteredResources()` - não usado em templates
- ❌ `getTotalResources()` - não usado em templates  
- ❌ `getFilteredResourcesCount()` - não usado em templates

#### **EntryListComponent:**
- ❌ `getPaidEntries()` - não usado em templates
- ❌ `getPendingEntries()` - não usado em templates

#### **IconService:**
- ❌ `getIconCategories()` - não usado
- ❌ `getIconsByCategory()` - não usado
- ❌ `isValidIcon()` - não usado
- ❌ `getSuggestedIcons()` - não usado

#### **Serviços Removidos:**
- ❌ `ConfirmDeleteService` - substituído pela lógica no BaseResourceListComponent
- ❌ `ValidationService` - não usado em nenhum lugar
- ❌ `UserService` - não usado em nenhum lugar

### **Benefícios da Limpeza:**
- ✅ **Menos Código**: ~200 linhas removidas
- ✅ **Manutenibilidade**: Menos código para manter
- ✅ **Performance**: Menos código para carregar
- ✅ **Clareza**: Código mais focado e limpo

## 🏗️ **Arquitetura de Componentes Base**

### **Estrutura Modular com Composição de Serviços**

O sistema utiliza uma arquitetura de **composição** onde cada funcionalidade é implementada através de serviços independentes, permitindo máxima flexibilidade, reutilização e testabilidade.

#### **Serviços Principais:**
- **`PaginationService`** - Funcionalidade de paginação
- **`SearchService`** - Funcionalidade de busca e filtros
- **`StatisticsService`** - Funcionalidade de estatísticas
- **`DeleteModalService`** - Funcionalidade de modal de exclusão

#### **Implementação no Componente Base:**
```typescript
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {
  
  constructor(
    protected resourceService: BaseResourceService<T>,
    protected injector: Injector,
    protected toastrService: ToastrService,
    protected paginationService: PaginationService,
    protected searchService: SearchService,
    protected statisticsService: StatisticsService,
    protected deleteModalService: DeleteModalService
  ) {}
  
  // Apenas métodos básicos de CRUD e coordenação
  loadResources(): void { /* ... */ }
  filterResources(): void { /* ... */ }
  onPageChange(page: number): void { /* ... */ }
  openDeleteModal(resource: T): void { /* ... */ }
}
```

#### **Implementação nos Componentes Filhos:**
```typescript
export class CategoryListComponent extends BaseResourceListComponent<Category> {
  
  constructor(
    private categoryService: CategoryService,
    protected override injector: Injector,
    private iconService: IconService,
    protected override toastrService: ToastrService,
    protected override paginationService: PaginationService,
    protected override searchService: SearchService,
    protected override statisticsService: StatisticsService,
    protected override deleteModalService: DeleteModalService
  ) {
    super(categoryService, injector, toastrService, paginationService, searchService, statisticsService, deleteModalService);
  }

  // ========================================
  // IMPLEMENTAÇÃO DE MÉTODOS ABSTRATOS
  // ========================================
  protected getResourceIcon(category: Category): string { /* ... */ }
  protected formatResourceDate(date: any): string { /* ... */ }
  protected getResourceDisplayName(category: Category): string { /* ... */ }

  // ========================================
  // SOBRESCRITA DE SERVIÇOS
  // ========================================
  override get paginationOptions(): any { /* configuração específica */ }
  override get searchPlaceholder(): string { /* configuração específica */ }
  override matchesSearch(category: Category, searchTerm: string): boolean { /* lógica específica */ }
  override get statisticsCards(): StatisticsCard[] { /* valores dinâmicos */ }

  // ========================================
  // MÉTODOS ESPECÍFICOS DE CATEGORIA
  // ========================================
  getActiveCategories(): number { /* lógica específica */ }
  getRecentCategories(): number { /* lógica específica */ }
}
```

#### **Vantagens da Abordagem com Composição:**
- ✅ **Responsabilidade Única**: Cada serviço tem uma função específica
- ✅ **Reutilização Máxima**: Serviços podem ser usados independentemente
- ✅ **Testabilidade**: Cada serviço pode ser testado isoladamente
- ✅ **Flexibilidade**: Fácil trocar implementações de serviços
- ✅ **Manutenibilidade**: Mudanças isoladas por funcionalidade
- ✅ **Escalabilidade**: Fácil adicionar novos serviços
- ✅ **Desacoplamento**: Componentes não dependem de interfaces grandes
- ✅ **Injeção de Dependência**: Serviços são injetados via DI
- ✅ **Valores Dinâmicos**: Estatísticas calculadas em tempo real

## 🏗️ Arquitetura de Configuração

### **Abordagem Implementada: Interfaces Separadas por Funcionalidade**

Implementamos uma **abordagem com interfaces completamente separadas**, onde cada funcionalidade é independente:

#### **Interfaces de Funcionalidade:**
```typescript
// Cada funcionalidade tem sua própria interface
export interface IPagination {
  getPaginationConfig(): PaginationConfig;
  onPageChange(page: number): void;
  onItemsPerPageChange(itemsPerPage: number): void;
}

export interface ISearch {
  getSearchConfig(): SearchConfig;
  filterResources(): void;
  matchesSearch(resource: any, searchTerm: string): boolean;
}

export interface IViewMode {
  getViewModeConfig(): ViewModeConfig;
  setViewMode(mode: 'grid' | 'list'): void;
}

export interface IDeleteModal {
  getDeleteModalConfig(): DeleteModalConfig;
  openDeleteModal(resource: any): void;
  confirmDelete(): void;
  cancelDelete(): void;
}

// ... outras interfaces
```

#### **Implementação no Componente Base:**
```typescript
export abstract class BaseResourceListComponent<T extends BaseResourceModel> 
  implements OnInit, IPagination, ISearch, IViewMode, IEmptyState, ILoading, IStatistics, IDeleteModal {
  
  // Cada interface é implementada separadamente
  getPaginationConfig(): PaginationConfig { /* ... */ }
  getSearchConfig(): SearchConfig { /* ... */ }
  getViewModeConfig(): ViewModeConfig { /* ... */ }
  // ... outras implementações
}
```

#### **Vantagens da Abordagem com Interfaces Separadas:**
- ✅ **Independência Total**: Cada funcionalidade é completamente independente
- ✅ **Reutilização**: Interfaces podem ser implementadas separadamente
- ✅ **Testabilidade**: Cada funcionalidade pode ser testada isoladamente
- ✅ **Flexibilidade**: Componentes podem implementar apenas as interfaces que precisam
- ✅ **Manutenibilidade**: Mudanças em uma funcionalidade não afetam outras
- ✅ **Escalabilidade**: Fácil adicionar novas funcionalidades sem afetar existentes

#### **Exemplo de Uso Avançado:**
```typescript
// Componente que implementa apenas algumas funcionalidades
class SimpleListComponent<T> implements IPagination, ISearch {
  getPaginationConfig(): PaginationConfig { /* ... */ }
  getSearchConfig(): SearchConfig { /* ... */ }
  // Não implementa outras interfaces
}

// Componente completo
class FullListComponent<T> implements 
  IPagination, ISearch, IViewMode, IEmptyState, ILoading, IStatistics, IDeleteModal {
  // Implementa todas as funcionalidades
}
```

### **Comparação das Abordagens:**

| Aspecto | Abordagem Anterior | Abordagem Atual |
|---------|-------------------|-----------------|
| **Configuração** | Interface unificada grande | Interfaces separadas independentes |
| **Manutenibilidade** | Difícil de manter | Fácil de manter |
| **Reutilização** | Limitada | Máxima |
| **Testabilidade** | Complexa | Simples |
| **Escalabilidade** | Limitada | Excelente |
| **Organização** | Tudo junto | Separado por responsabilidade |

### **Benefícios da Nova Abordagem:**
- ✅ **Independência Total**: Cada funcionalidade é completamente independente
- ✅ **Reutilização**: Interfaces podem ser implementadas separadamente
- ✅ **Testabilidade**: Cada funcionalidade pode ser testada isoladamente
- ✅ **Flexibilidade**: Componentes podem implementar apenas as interfaces que precisam
- ✅ **Manutenibilidade**: Mudanças em uma funcionalidade não afetam outras
- ✅ **Escalabilidade**: Fácil adicionar novas funcionalidades sem afetar existentes
- ✅ **Organização**: Métodos organizados por responsabilidade nos componentes filhos
- ✅ **Sem Configuração Unificada**: Cada interface gerencia sua própria configuração
- ✅ **Valores Dinâmicos**: Estatísticas e dados são calculados em tempo real

## Estrutura do Projeto

## 🔧 Configuração

### Ambiente de Desenvolvimento
O projeto utiliza Angular In-Memory Web API para simular um backend. Os dados são definidos em `src/app/in-memory-database.ts`.

### Proxy (Desabilitado)
O arquivo `proxy.conf.json` está configurado mas desabilitado para permitir o funcionamento da API em memória.

### Otimizações de Bibliotecas

#### ✅ **Bibliotecas Otimizadas**
- **Standalone Components**: Reduz o bundle size eliminando NgModules desnecessários
- **Tree Shaking**: Importação seletiva de módulos do PrimeNG
- **Lazy Loading**: Componentes carregados sob demanda

#### 🚀 **Melhorias Implementadas**
- Remoção do Angular Material (conflito com Bootstrap + PrimeNG)
- Atualização do Chart.js para versão 4.x
- Remoção de bibliotecas não utilizadas (moment, angular-imask)
- Otimização de imports para reduzir bundle size

#### 📦 **Bundle Size**
- **Inicial**: ~2MB (otimizado)
- **Lazy Chunks**: Carregamento sob demanda
- **Vendor Chunk**: Separado para melhor cache

#### 🎨 **Design System**
- **Bootstrap 5**: Layout e grid system
- **PrimeNG**: Componentes específicos (charts, calendar)
- **Consistência Visual**: Tema unificado sem conflitos

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, entre em contato através do [GitHub Issues](link-para-issues).

---

Desenvolvido com ❤️ usando Angular
