# Social Timeline

App web fullstack onde é possivel criar, curtir e comentar postagens

## Funcionalidades

- Criar novo usuario
- Fazer login
- Criar, editar e excluir um post
- Comentar e curtir um poste existente


## Variáveis de ambiente (Backend)

Para rodar essa aplicação é necessário adicionar a seguinte variáveis de ambiente no arquivo `.env` na pasta `backend`

- `DATABASE_URL` - String de conexão de banco de dados `Postgres`.

## Variáveis de ambiente (Frontend)

Caso deseje utilizar uma porta diferente para rodar a aplicação `backend` é necessário alterar a seguite variavel de ambiente no arquivo `.env` na pasta `frontend`:

- `VITE_GRAPHQL_API_URL`: http://localhost:<PORT\>/graphql

## Instruções para execução

### Instalação de dependencias

No diretório raiz, execute o seguinte comando para instalar as dependencias das aplicações `frontend` e `backend`

```bash
  npm install
```

### Build

No diretório raiz, execute o seguite comando para iniciar o processo de build.

> Esta etapa precisa ser executada apenas umas vez. Nas próximas execuções basta ir para o próximo script

```bash
  npm run build
```

### Execuntando a aplicação

No diretório raiz, execute o seguinte comando para executar as aplicações `frontend` e `backend`

```bash
  npm start
```

As aplicações executam por padrão nas seguintes portas:

- Frontend: `4173`
- Backend: `3000`

## Tecnologias utilizadas

### Backend

- [TypeScript](https://www.typescriptlang.org)
- [Nestjs](https://nestjs.com/) - Um framework para criar aplicativos do lado do servidor eficientes, confiáveis e escaláveis.
- [Prisma](https://www.prisma.io/) - Next-generation ORM para Node.js & TypeScript
- [Graphql](https://graphql.org/) - Linguagem de consulta para APIs em tempo de execução
- [Apollo Graphql](https://www.apollographql.com/) - Servidor Graphql

### Frontend

- [React](https://pt-br.reactjs.org/) - Biblioteca JavaScript para criar interfaces de usuário
- [TaiwindCSS](https://tailwindcss.com/) - Framework CSS de estilização com classes
- [React Query](https://react-query.tanstack.com/) - Biblioteca react de busca de dados, caching, sincronização e atualização de dados.
- [Graphql codegenerator](https://www.graphql-code-generator.com/) - Ferramenta de geração de types e operações a partir de esquemas Graqphql
