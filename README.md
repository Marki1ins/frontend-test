# Frontend - React + Vite + TypeScript + Docker

Este é o projeto frontend, desenvolvido com **React**, **Vite** e **TypeScript**, e empacotado com **Docker** para garantir um ambiente consistente. O backend utiliza **json-server** para simular uma API RESTful.

## Tecnologias Utilizadas

- **React** (com **TypeScript**)
- **Vite** (bundler de frontend rápido)
- **Docker** (para criar containers isolados)
- **json-server** (para criar uma API RESTful simulada)
- **Docker Compose** (para orquestrar os containers)

## Funcionalidades

- Formulário para busca de endereços por **CEP** utilizando a API do [ViaCEP](https://viacep.com.br/ws/01001000/json/).
- CRUD (Create, Read, Update, Delete) para a entidade **Notícia** utilizando **json-server**.
- Uso de **Docker** para facilitar a configuração do ambiente e o deploy.

---

## Pré-requisitos

- **Docker**: Certifique-se de que o Docker está instalado e funcionando corretamente. Você pode baixar o Docker Desktop para Windows [aqui](https://www.docker.com/products/docker-desktop).

- **Docker Compose**: Necessário para orquestrar múltiplos containers. Caso não tenha o Docker Compose instalado, ele geralmente vem com o Docker Desktop. Caso contrário, siga [essas instruções](https://docs.docker.com/compose/install/) para instalação.

---

## Rodando o Projeto Localmente

### Passo 1: Clonar o repositório

Clone este repositório para sua máquina local:

```bash
git clone https://github.com/Marki1ins/frontend-test.git
cd frontend-test
```

### Passo 2: Configuração de variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias. Um exemplo do conteúdo do arquivo:

```env
VITE_API_URL=http://localhost:5000
VITE_BRASIL_API_URL=https://viacep.com.br
```

A variável `VITE_API_URL` será usada para configurar a URL da API do backend no frontend.

### Passo 3: Subir os containers Docker

Execute o comando abaixo para construir e rodar os containers Docker:

```bash
docker-compose up --build
```

Isso vai iniciar dois containers:
- Um para o frontend (React + Vite) rodando na porta `4173`.
- Outro para o backend (json-server) rodando na porta `5000`.

Acesse o frontend no navegador em `http://localhost:4173` e a API do backend estará disponível em `http://localhost:5000`.
Para realizar o login basta adicionar no nome "admin" e a senha "123".

---

## Scripts de Desenvolvimento

Se você preferir rodar o projeto localmente sem Docker, pode usar os seguintes scripts:

### Rodando o frontend e o backend localmente

Para rodar o frontend e o backend localmente, o seu [NodeJS](https://nodejs.org/pt/download) precisa está na versão `22.18.0`. Então, execute:

```bash
npm install
npm run dev
```

A API estará disponível em `http://localhost:5000`.
O Vite será iniciado na porta `4173`, e você poderá acessar o frontend via `http://localhost:4173`.

---

## Testes

### Rodando os testes

Para executar os testes, utilize o seguinte comando:

```bash
npm run test
```

Este comando irá executar os testes automatizados configurados no projeto, garantindo que o comportamento esperado do sistema seja validado.

---

## Estrutura de Pastas

```plaintext
├── docker/
│   ├── frontend/         # Dockerfile do frontend
│   │   └── Dockerfile
│   ├── backend/          # Dockerfile do backend
│   │   └── Dockerfile
├── public/               # Arquivos públicos do React
├── server/
│   └── db.json           # Banco de dados do json-server
├── src/                  # Código-fonte do frontend
│   ├── components/       # Componentes reutilizáveis
│   │   └── folder/       # Cada pasta tem index.tsx e index.css
|   ├── hooks/            # Hooks
|   |   └── useAuth.ts    # Arquivo simula a autenticação
│   ├── layouts/          # Layouts reutilizáveis
│   │   └── folder/       # Cada pasta tem index.tsx e index.css
│   ├── modules/          # Módulos específicos por página
│   │   ├── pages/        # Páginas da aplicação
│   │   │   └── list/     # Cada pasta tem index.tsx, index.css e subcomponentes
│   ├── routes/           # Configuração de rotas
│   ├── services/         # Serviços de integração com API
│   ├── tests/            # Testes automatizados
├── .dockerignore         # Ignorar arquivos/pastas no contexto do Docker
├── docker-compose.yml    # Configuração de serviços Docker
├── .env                  # Variáveis de ambiente
└── package.json          # Dependências e scripts
```

---

## Estrutura Modular

Adotamos uma estrutura de pastas organizada, onde cada funcionalidade ou parte da interface é isolada dentro de sua própria pasta. Dentro de cada pasta, utilizamos os arquivos `index.tsx` e `index.css` para concentrar a implementação de código e estilo relacionados. Essa abordagem proporciona:

1. **Clareza e Organização**: Facilita a localização de arquivos específicos relacionados a um componente ou módulo.
2. **Reutilização**: Componentes e estilos podem ser reutilizados de forma consistente em toda a aplicação.
3. **Escalabilidade**: Simplifica a manutenção e expansão do projeto à medida que novas funcionalidades são adicionadas.
4. **Isolamento de Estilos**: Garante que os estilos de um componente não interfiram em outros, evitando conflitos.

Por exemplo, na pasta `src/modules/pages/list/`, você encontrará um componente principal (`index.tsx`) e seus estilos correspondentes (`index.css`), além de uma subpasta para subcomponentes relacionados. Essa abordagem modular reflete boas práticas de desenvolvimento e organização de código.

---

## Performance e Code Splitting:

A aplicação utiliza Lazy Loading em conjunto com o TanStack Router para otimizar o carregamento do código JavaScript.

Foi utilizada a funcionalidade createLazyFileRoute do TanStack Router juntamente com React.lazy() e Suspense para que o módulo responsável pelo CRUD de Notícias (/news) não fosse incluído no bundle inicial da aplicação.

### Como isso reduz o bundle inicial

Antes do Lazy Loading:

1. Todo o código da tela de Notícias era empacotado no arquivo principal do JavaScript durante o build. Isso aumentava o tamanho do bundle inicial e o tempo de download, parse e execução do código no navegador.

Após a implementação:

1. O TanStack Router identifica que a rota é lazy e o bundler (Vite/Webpack) automaticamente gera um chunk separado para essa rota. Esse chunk só é baixado quando o usuário realmente navega até /news.

### Ganho prático de performance

Essa estratégia traz os seguintes benefícios:

1. Redução do tamanho do bundle principal

2. Melhor tempo de carregamento inicial da aplicação

3. Menor consumo de memória no primeiro render

4. Carregamento sob demanda apenas do código necessário

## Como Funciona

### Docker Compose

Usamos o `docker-compose.yml` para orquestrar dois containers:
- O **frontend** (React com Vite).
- O **backend** (json-server simulando uma API RESTful).

### Backend (json-server)

O **json-server** é uma ferramenta que cria uma API RESTful simples a partir de um arquivo JSON (`db.json`). Ele é configurado para rodar na porta `5000`.

### Frontend (React + Vite)

O **Vite** é usado para desenvolver e servir o frontend de maneira rápida e eficiente. As requisições do frontend são feitas para o backend através da URL configurada na variável de ambiente `VITE_API_URL`.

---

## Considerações Finais

Este projeto utiliza **Docker** para garantir um ambiente de desenvolvimento consistente e facilitar a orquestração dos containers de frontend e backend. A utilização de **json-server** permite simular uma API RESTful simples e rápida, ideal para o desenvolvimento e testes do frontend.