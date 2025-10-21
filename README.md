# Nest.js
Este é um projeto **backend API** desenvolvido com **NestJS** (Node.js/TypeScript) com uma arquitetura para autenticação e gerenciamento de usuários. O projeto está estruturado para ser executado em containers Docker com **PostgreSQL** como banco de dados.

## Instrução do projeto na pasta docs

Dentro da pasta **[docs](docs)** contém arquivos e subpastas para instruções do projeto. Por exemplo:

- [README.md](docs/README.md): Sobre o projeto.
- [STRUCTURE.md](docs/STRUCTURE.md): Estrutura do projeto.
- [TECHNOLOGIES.md](docs/TECHNOLOGIES.md): Tecnologias utilizadas.
- [INSTALLATION.md](docs/INSTALLATION.md): específicas para instalação e configuração do ambiente de desenvolvimento
- [COMMANDS.md](docs/COMMANDS.md): Comandos do container.

## Instalação

1. Clone o repositório.
2. Copie **`.env.example`** para **`.env`** e configure suas variáveis de ambiente.
3. Inice os contâineres do **`.env`** para iniciar o ambiente.
4. Execute **`make start`** para iniciar os contâineres.
5. Acessar o container backend **`make exec-back`**.
6. Execute **`npm install`** para instalar as dependências.
7. Execute **`npm run build`** para compilar o projeto.
8. Execute **`npm run migration:run`** para executar as migrações.
9. Execute **`npm run seed:run`** para executar os seeds.
10. Execute **`npm run typeorm migration:show`** para verificar status das migrações.

Leia **[INSTALLATION.md](docs/INSTALLATION.md)** para mais informações sobre como instalar este projeto.

## API e PostgreSQL

Abaixo estão os comandos para iniciar e interagir com o banco de dados PostgreSQL e também os comandos para iniciar e interagir com a API.

- **Endpoints disponíveis**: Leia **[API.md](docs/API.md)** para mais informações sobre os endpoints disponíveis.
- **Comandos do PostgreSQL**: Leia **[BANCO.md](docs/BANCO.md)** para mais informações.
- **Requisições via curl**: Leia **[CURL.md](docs/CURL.md)** para mais informações.

---

## Desenvolvido por

[**Renan Domingues**](https://www.linkedin.com/in/renan-domingues-4808b2172/)  
👨‍💻 Desenvolvedor Full Stack

[![GitHub](https://img.shields.io/badge/-Renan%20Domingues-181717?style=flat-square&logo=github&logoColor=white&link=https://github.com/dominguesrenan)](https://github.com/dominguesrenan)
[![LinkedIn](https://img.shields.io/badge/-Renan%20Domingues-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/renan-domingues-4808b2172/)](https://www.linkedin.com/in/renan-domingues-4808b2172/)
