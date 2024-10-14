# TechChallenge2

# Blogging Application

## Descrição
Este projeto é uma aplicação de blogging dinâmico, construída com Node.js e Express.js. A aplicação permite que professores publiquem e gerenciem postagens para os alunos de forma centralizada.

## Tecnologias Utilizadas
- Node.js
- Express.js
- MongoDB (ou PostgreSQL)
- Docker
- GitHub Actions

## Endpoints

### GET /posts
Retorna todos os posts disponíveis.

### GET /posts/:id
Retorna um post específico pelo ID.

### POST /posts
Cria uma nova postagem. O corpo da requisição deve conter:

{
  "title": "Título do Post",
  "content": "Conteúdo do Post",
  "author": "Nome do Autor"
}

### PUT /posts/
Atualiza um post existente pelo ID. O corpo da requisição deve conter:

{
  "title": "Título Atualizado",
  "content": "Conteúdo Atualizado",
  "author": "Nome do Autor"
}

DELETE /posts/
Exclui um post pelo ID.

GET /posts/search?query=palavra-chave
Busca posts por uma palavra-chave no título ou conteúdo.

Como Rodar o Projeto
Clone o repositório
Instale as dependências:

npm install
Inicie o servidor:

npm start
Testes
Execute os testes unitários:

npm test
Docker
Para rodar a aplicação com Docker:

Construa a imagem:
docker build -t nome-da-imagem .
Rode o container:

docker run -p 3000:3000 nome-da-imagem
