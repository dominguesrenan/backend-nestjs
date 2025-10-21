## Visão Geral

1. **Separação de responsabilidades:**
   - Controllers lidam apenas com requisições/respostas
   - Services contêm a lógica de negócio
   - Modules organizam funcionalidades relacionadas

2. **Estrutura modular:**
   - Módulo principal [app.module.ts](core/app/app.module.ts) importa outros módulos
   - Módulo de usuários como exemplo de organização específica

3. **Preparação para crescimento:**
   - Pastas para DTOs, interfaces e utilitários comuns
   - Estrutura fácil de expandir com novos módulos

4. **Exemplo funcional:**
   - Controller de usuários com operações CRUD básicas
   - Service correspondente com lógica de negócio

### Recursos:

1. **Autenticação JWT**
2. **Registro e login de usuários**
3. **Proteção de rotas com guards**
4. **Decorators personalizados**
5. **Validação com class-validator**
6. **Interceptors globais**
7. **Tratamento de erros personalizado**

## Endpoints Disponíveis:

### Usuários (CRUD):

- `GET /api/users` - Listar usuários (protegido)
- `GET /api/users/:id` - Buscar usuário (protegido)
- `POST /api/users` - Criar usuário
- `PUT /api/users/:id` - Atualizar usuário (protegido)
- `DELETE /api/users/:id` - Deletar usuário (protegido)

## Exemplos de requisições

### Usuários

- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login (retorna JWT)
- `GET /api/auth/profile` - Perfil do usuário (protegido)

#### Listar usuários:

```bash
# Listar usuários
curl -X GET http://localhost:4000/api/users \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

#### Buscar usuário:

```bash
# Buscar usuário
curl -X GET http://localhost:4000/api/users/:id \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

#### Registrar usuário:

```bash
# Registrar usuário administrador (porta 4000, não 80)
curl --request POST \
  --url http://localhost:4000/api/auth/register \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "renan@teste.com",
	"password": "password",
	"name": "Renan Teste"
}'

# Registrar usuário comum (porta 4000, não 80)
curl --request POST \
  --url http://localhost:4000/api/auth/register \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer SEU_TOKEN_JWT' \
  --data '{"email":"usuario@teste.com","password":"123456","name":"Usuário Teste"}'
```

#### Fazer login:

```bash
# Fazer login administrador
curl --request POST \
  --url http://localhost:4000/api/auth/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "renan@teste.com",
	"password": "password"
}'

# Fazer login usuário comum
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@teste.com","password":"123456"}'
```

#### Acessar endpoint protegido:

```bash
# Acessar endpoints protegidos
curl -X GET http://localhost:4000/api/users \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

### Usuário teste

#### Registrar usuário comum:

```bash
curl --request POST \
  --url http://localhost:4000/api/auth/register \
  --header 'Authorization: Bearer SEU_TOKEN_JWT' \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "usuario@teste.com",
	"password": "123456",
	"name": "Usuário Teste"
}'
```

#### Consultar usuário:

```bash
# Consultar usuário
curl -X GET http://localhost:4000/api/users/5 \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

#### Fazer login:

```bash
# Fazer login administrador
curl --request POST \
  --url http://localhost:4000/api/auth/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "usuario@teste.com",
	"password": "123456"
}'
```

#### Atualizar usuário:

```bash
# Atualizar usuário
curl -X PUT http://localhost:4000/api/users/5 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -d '{"name":"Novo Nome","email":"novo@email.com","role":"admin"}'
```

#### Deletar usuário:

```bash
# Deletar usuário
curl -X DELETE http://localhost:4000/api/users/5 \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

#### Teste do fluxo de autenticação e update

```bash
chmod +x teste_fluxo.sh
./teste_fluxo.sh
```

### Segmentos

- `GET /api/segmentos` - Listar segmentos (protegido)
- `GET /api/segmentos/:id` - Buscar segmento (protegido)
- `POST /api/segmentos` - Criar segmento
- `PUT /api/segmentos/:id` - Atualizar segmento (protegido)
- `DELETE /api/segmentos/:id` - Deletar segmento (protegido)

#### Registrar segmento:

```bash
# Registrar segmento
curl -X POST http://localhost:4000/api/segmentos -H "Content-Type: application/json" -d '{"nome": "Teste", "descricao": "Sistema de Teste"}'
```

#### Buscar segmento:

```bash
# Buscar segmento
curl -X GET http://localhost:4000/api/segmentos \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

#### Deletar segmento:

```bash
# Deletar segmento
curl -X DELETE http://localhost:4000/api/segmentos/:id \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

## Recursos de Segurança:

- **Senhas criptografadas** com bcrypt
- **JWT tokens** com expiração configurável
- **Validação de entrada** com class-validator
- **Proteção de rotas** com guards JWT
- **Tratamento de erros** personalizado
- **Logging de requisições** para auditoria

---

## Desenvolvido por

[**Renan Domingues**](https://www.linkedin.com/in/renan-domingues-4808b2172/)  
👨‍💻 Desenvolvedor Full Stack

[![GitHub](https://img.shields.io/badge/-Renan%20Domingues-181717?style=flat-square&logo=github&logoColor=white&link=https://github.com/dominguesrenan)](https://github.com/dominguesrenan)
[![LinkedIn](https://img.shields.io/badge/-Renan%20Domingues-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/renan-domingues-4808b2172/)](https://www.linkedin.com/in/renan-domingues-4808b2172/)
