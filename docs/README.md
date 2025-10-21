# Nest.js
Este é um projeto backend desenvolvido com **NestJS** (Node.js/TypeScript) com uma arquitetura para autenticação e gerenciamento de usuários. O projeto está estruturado para ser executado em containers Docker com **PostgreSQL** como banco de dados.

## Arquitetura e Estrutura

### Backend (NestJS 10.x)

- **Framework:** NestJS com TypeScript
- **Banco de dados:** PostgreSQL 15 Alpine (containerizado)
- **Autenticação:** JWT com Passport.js
- **ORM:** TypeORM com migrações automáticas
- **Containerização:** Docker com docker-compose

### Recursos Implementados:

- **JWT Authentication** com estratégia Passport
- **Registro e login** de usuários
- **Sistema RBAC** (Role-Based Access Control)
- **Permissões granulares** por recurso/ação
- **Guards personalizados** para proteção de rotas
- **Refresh tokens** (configurado mas não implementado)

### Roles e Permissões:

- **Admin:** Acesso total ao sistema
- **User:** Permissões básicas (login, perfil próprio, listar segmentos)

## Modelo de Dados

### Entidades Principais:

**Users:**

- id, email, password, name
- Relacionamento com Role
- Timestamps (createdAt, updatedAt)

**Roles:**

- id, name, description, active
- Relacionamento Many-to-Many com Permissions
- Relacionamento One-to-Many com Users

**Permissions:**

- id, name, resource, action, active
- Relacionamento Many-to-Many com Roles

**Segmentos:**

- id, nome, descricao, ativo
- Timestamps automáticos

## Infraestrutura

### Docker Compose Services:

- **backend:** Aplicação NestJS (porta 4000)
- **postgres:** Banco PostgreSQL 15 (porta 5432)
- **nginx:** Proxy reverso (porta 80)

### Configuração de Desenvolvimento:

- Hot reload com volumes Docker
- Variáveis de ambiente via .env
- Scripts npm para migrações e seeds

## Documentação e Recursos

### Documentação Disponível:

- **README.md:** Visão geral e instruções básicas
- **STRUCTURE.md:** Estrutura do projeto
- **TECHNOLOGIES.md:** Tecnologias utilizadas
- **INSTALLATION.md:** Instruções de instalação

### Scripts Disponíveis:

- `npm run start:dev` - Desenvolvimento com hot reload
- `npm run migration:run` - Executar migrações
- `npm run seed:run` - Dados iniciais banco
- `npm run build` - Build para produção (dist/)

## Configurações Principais

### Aplicação:

- Porta configurável (padrão: 4000)
- Prefixo API: `/api`
- CORS habilitado
- Ambiente de desenvolvimento/produção

### Banco de Dados:

- PostgreSQL com TypeORM
- Migrações automáticas
- Seeds para dados iniciais
- Sincronização automática em desenvolvimento

### JWT:

- Segredo configurável
- Expiração configurável
- Refresh tokens preparados

## Funcionalidades Implementadas

### APIs Disponíveis:

- `GET /api/health` - Status da aplicação
- `GET /api/info` - Informações do sistema
- Sistema de autenticação
- CRUD de usuários (protegido)
- CRUD de segmentos (protegido)
- Sistema de permissões e roles

### Credenciais de Teste:

- **Admin:** `admin@example.com` / `password`
- **User:** `user@example.com` / `password`

## Próximos Passos Sugeridos

1. **Implementar refresh tokens** para maior segurança
2. **Adicionar rate limiting** para proteção contra ataques
3. **Implementar confirmação de email** no registro
4. **Adicionar recuperação de senha**
5. **Configurar testes** (Jest já configurado)
6. **Implementar logging avançado**
7. **Adicionar paginação** nas listagens
8. **Implementar cache Redis** para performance

---

## Desenvolvido por

[**Renan Domingues**](https://www.linkedin.com/in/renan-domingues-4808b2172/)  
👨‍💻 Desenvolvedor Full Stack

[![GitHub](https://img.shields.io/badge/-Renan%20Domingues-181717?style=flat-square&logo=github&logoColor=white&link=https://github.com/dominguesrenan)](https://github.com/dominguesrenan)
[![LinkedIn](https://img.shields.io/badge/-Renan%20Domingues-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/renan-domingues-4808b2172/)](https://www.linkedin.com/in/renan-domingues-4808b2172/)
