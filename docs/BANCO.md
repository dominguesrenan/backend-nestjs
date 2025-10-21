## Banco de dados PostgreSQL

O projeto inclui o banco de dados **PostgreSQL** containerizado com as seguintes configurações:

- **Container:** `postgres_db`
- **Porta externa:** `5432`
- **Banco de dados:** `sistemabase`
- **Usuário:** `root`
- **Senha:** `root`

### Acessar o banco de dados

1. Acessar o container PostgreSQL:

```bash
make exec-bd
```

2. Conectar ao banco de dados:

```bash
psql -U root -d sistemabase
```

3. Verificar se o banco de dados está funcionando:

```bash
docker-compose exec postgres psql -U root -d sistemabase -c "SELECT * FROM users;"
```

## Migrações e Seeds

1. Gerar nova migração:

```bash
make exec-back
npm run migration:generate
```

2. Executar migrações:

```bash
npm run migration:run
```

3. Executar seeds (dados iniciais):

```bash
npm run seed:run
```

4. Gerar nova migração automaticamente:

```bash
npm run migration:generate -- src/migrations/NovaMigracao
```

5. Criar migração vazia:

```bash
npm run migration:create src/migrations/NovaMigracao
```

6. Aplicação funcionando:
   - API disponível em: `http://localhost:4000/api`
   - Autenticação JWT funcional
   - Banco PostgreSQL com dados reais
   - CRUD completo de usuários

### Comandos de migração disponíveis

```bash
# Ver comandos disponíveis do TypeORM
npm run typeorm --help

# Executar migrações
npm run migration:run

# Executar seeds
npm run seed:run

# Reverter última migração
npm run migration:revert

# Mostrar status das migrações
npm run typeorm migration:show
```

### Resetar banco de dados

```bash
npm run migration:revert
npm run migration:run
npm run seed:run
```

### Recriar os seeds

```bash
# Reverter seeds (se necessário)
npm run migration:revert -- -d src/seeds

# Executar seeds novamente
npm run seed:run
```

### Inserir dados de teste

Para inserir dados de teste no banco:

```sql
-- Inserir usuário administrador
INSERT INTO users (name, email, password, role) VALUES (
  'Administrador',
  'admin@example.com',
  '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi', -- senha: password
  'admin'
);

-- Inserir usuário comum
INSERT INTO users (name, email, password, role) VALUES (
  'Usuário Teste',
  'user@example.com',
  '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi', -- senha: password
  'user'
);
```

### Comandos principais do PostgreSQL (modo psql):

```bash
# Ver todas as tabelas no banco atual
\dt

# Ver esquemas disponíveis
\dn

# Ver todas as tabelas, incluindo de outros schemas
\dt *.*

# Ver a estrutura (colunas) de uma tabela
\d nome_da_tabela
# Exemplo
\d users

# Listar bancos de dados
\l

# Conectar-se a outro banco
\c nome_do_banco

# Listar todos os usuários
SELECT id, name, email, role, "createdAt", "updatedAt" FROM users;

# Excluir tabelas
DROP TABLE nome_da_tabela;
# Exemplo
DROP TABLE users;

# Excluir tabela e limpar dados
TRUNCATE nome_da_tabela;
# Exemplo
TRUNCATE migrations;
TRUNCATE typeorm_metadata;
TRUNCATE segmentos;
TRUNCATE role_permissions;
TRUNCATE roles;
TRUNCATE permissions;
TRUNCATE users;

# Excluir banco de dados
DROP DATABASE nome_do_banco;
# Exemplo
DROP DATABASE sistemabase;

# Sair do psql
\q
```

### Credenciais de Teste:

- **Administrador:** `admin@example.com` / `password`
- **Usuário comum:** `user@example.com` / `password`

### Funcionalidades Testadas:

- **Health Check:** `GET /api/health`
- **Login:** `POST /api/auth/login`
- **Listar usuários:** `GET /api/users` (protegido)
- **Dados persistidos** no PostgreSQL

### Status Final:

**Projeto com:**

- Banco de dados PostgreSQL containerizado
- Sistema de migrações TypeORM
- Seeds para dados iniciais
- Autenticação JWT completa
- CRUD de usuários integrado ao banco
- Documentação atualizada

---

## Desenvolvido por

[**Renan Domingues**](https://www.linkedin.com/in/renan-domingues-4808b2172/)  
👨‍💻 Desenvolvedor Full Stack

[![GitHub](https://img.shields.io/badge/-Renan%20Domingues-181717?style=flat-square&logo=github&logoColor=white&link=https://github.com/dominguesrenan)](https://github.com/dominguesrenan)
[![LinkedIn](https://img.shields.io/badge/-Renan%20Domingues-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/renan-domingues-4808b2172/)](https://www.linkedin.com/in/renan-domingues-4808b2172/)
