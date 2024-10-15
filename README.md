# TechChallenge2

Documentação do Sistema - Projeto Blog App

Índice
1 Visão Geral do Projeto
2 Arquitetura do Sistema
3 Instalação e Configuração
4 Uso da Aplicação
5 Desafios Enfrentados
6 Problemas Possíveis e Soluções
7 Conclusão

1. Visão Geral do Projeto
Este projeto é um Blog App desenvolvido utilizando Node.js para o backend e MongoDB para o banco de dados. O sistema permite que usuários façam postagens e interajam com o conteúdo por meio de uma API RESTful. Todo o projeto está containerizado utilizando Docker e gerenciado via Docker Compose, garantindo facilidade de deploy e escalabilidade.

2. Arquitetura do Sistema
A arquitetura do Blog App é baseada no padrão MVC (Model-View-Controller) para separar as responsabilidades. Abaixo está a estrutura básica do projeto:

Backend: Node.js com Express.js para rotas e Mongoose para conexão com MongoDB.
Banco de Dados: MongoDB.
Containerização: Docker com Docker Compose.
Ferramentas de Teste: Jest para testes unitários.

3. Instalação e Configuração
Pré-requisitos
Node.js: versão 18 ou superior.
Docker: versão 20.10 ou superior.
Docker Compose: versão 1.29 ou superior.
Passos de Instalação
Clone o repositório:
cd blog-app

Crie os containers Docker:

docker-compose up --build
A aplicação estará disponível em http://localhost:3000.

Variáveis de Ambiente
O projeto utiliza variáveis de ambiente configuradas diretamente no docker-compose.yml. A variável mais relevante é:

MONGO_URI: Define a URI de conexão ao MongoDB. No Docker, ela está definida como mongodb://mongo:27017/blog.
4. Uso da Aplicação
Após a instalação, você pode acessar a aplicação através da porta 3000. A API expõe rotas para CRUD de postagens, por exemplo:

GET /api/posts: Lista todas as postagens.
POST /api/posts: Cria uma nova postagem.
PUT /api/posts/:id: Atualiza uma postagem.
DELETE /api/posts/:id: Exclui uma postagem.
5. Desafios Enfrentados
Durante o desenvolvimento do projeto, enfrentei diversos desafios, tanto técnicos quanto operacionais. Abaixo estão alguns dos principais desafios:

5.1. Conexão entre containers no Docker
Problema: Inicialmente, o serviço Node.js não conseguia se conectar ao MongoDB, resultando em um erro de ECONNREFUSED.

Solução: Percebemos que, dentro do Docker, o localhost do Node.js não se refere ao MongoDB, pois os containers têm seus próprios namespaces de rede. A solução foi utilizar o nome do serviço MongoDB definido no docker-compose.yml (mongo) em vez de localhost.

5.2. Warnings de Conexão com o MongoDB
Problema: Recebi  warnings relacionados às opções useNewUrlParser e useUnifiedTopology no Mongoose.

Solução: Após análise, verificamos que essas opções estão depreciadas nas versões mais recentes do driver MongoDB. Decidimos removê-las para evitar confusão futura.

5.3. Integração com GitHub Actions
Problema: Implementar um pipeline de CI/CD com GitHub Actions teve alguns obstáculos. A configuração inicial gerava falhas de conexão com o servidor, pois as chaves SSH não estavam corretamente configuradas.

Solução: Após revisar a documentação oficial, configuramos corretamente as variáveis de ambiente SSH_PRIVATE_KEY e DEPLOYMENT_SERVER, garantindo o fluxo de deploy.

5.4. Conflitos de Versão do Docker Compose
Problema: Ao rodar docker-compose up, recebemos avisos de que a version definida no docker-compose.yml estava obsoleta.

Solução: Atualizamos o arquivo para usar uma versão mais recente e compatível com as versões mais recentes do Docker Compose.

6. Problemas Possíveis e Soluções
6.1. Erro de Conexão ECONNREFUSED 127.0.0.1:27017
Causa: O serviço Node.js está tentando se conectar ao MongoDB utilizando localhost, mas no Docker isso não funciona como esperado.

Solução: Atualize o MONGO_URI para mongodb://mongo:27017/blog no docker-compose.yml e no código.

6.2. Falha na Instalação de Dependências via Docker
Causa: Erros relacionados ao npm install podem ocorrer devido à ausência do arquivo package-lock.json ou a problemas com versões de pacotes.

Solução: Certifique-se de que o package-lock.json esteja no diretório raiz e execute o npm install manualmente dentro do container, se necessário.

6.3. Warnings do Mongoose
Causa: Opções depreciadas como useNewUrlParser e useUnifiedTopology podem gerar warnings durante a execução do sistema.

Solução: Remova essas opções do código, pois elas não são mais necessárias nas versões mais recentes do driver MongoDB.

6.4. Falha no Deploy com GitHub Actions
Causa: Falhas de autenticação durante o deploy via SSH.

Solução: Verifique se as chaves SSH estão corretamente configuradas e que as variáveis de ambiente SSH_PRIVATE_KEY, DEPLOYMENT_SERVER, e DEPLOYMENT_USER estão corretamente definidas no GitHub Actions.

6.5. Docker Containers Não Iniciam Corretamente
Causa: Conflitos de portas ou erros na configuração da rede do Docker podem causar falhas ao iniciar containers.

Solução: Verifique se as portas definidas nos serviços não estão em uso e reinicie os containers com o comando:

docker-compose down && docker-compose up --build

7. Conclusão
Este projeto permitiu à mim experimentar diversas tecnologias e enfrentar desafios reais de desenvolvimento, como a containerização, integração contínua e problemas relacionados à rede no Docker. A aplicação foi bem-sucedida no objetivo de fornecer uma API RESTful funcional para gerenciamento de posts de blog.

Esta documentação tem como objetivo servir como uma base para desenvolvedores que desejem entender e contribuir para o projeto, além de ajudar a identificar e resolver problemas comuns durante o processo de desenvolvimento e deploy.

Equipe de Desenvolvimento

Gustavo Araújo teixeira
