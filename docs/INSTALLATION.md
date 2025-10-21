# Sistema Base - Nest e Next

Abaixo estão as instruções para instalar e configurar o projeto para desenvolvimento.

## Clone do repositório

### 1. Baixar o projeto:

```bash
git clone <url-do-repositorio>
```

### 2. Acesse a pasta do projeto:

```bash
cd backend-nestjs
```

### 3. Abrir no VS Code:

```bash
code .
```

### 4. Abrir terminal do VS Code para iniciar as configurações:

- **Menu:** Terminal >> Novo Terminal
- **Atalho:** `Ctrl + Shift + '`

## Configurações do projeto

### 1. Copiar o arquivo **.env.example** para **.env**:

```bash
cp .env.example .env
```

### 2. Iniciar os containers:

```bash
make start
```

### 3. Acessar: http://localhost:4000/api

## Comandos base

- Instalar as dependências e build:

  ```bash
  make exec-back
  npm install
  npm run build
  ```

- Formatar códigos:

  ```bash
  make exec-back
  npm run format
  ```

- Verificar se códigos estão formatados:

  ```bash
  make exec-back
  npm run format:check
  ```

- Executar migrações:

  ```bash
  make exec-back
  npm run migration:run
  ```

- Executar seeds:

  ```bash
  make exec-back
  npm run seed:run
  ```

- Verificar status das migrações:
  ```bash
  make exec-back
  npm run typeorm migration:show
  ```

---

## Desenvolvido por

[**Renan Domingues**](https://www.linkedin.com/in/renan-domingues-4808b2172/)  
👨‍💻 Desenvolvedor Full Stack

[![GitHub](https://img.shields.io/badge/-Renan%20Domingues-181717?style=flat-square&logo=github&logoColor=white&link=https://github.com/dominguesrenan)](https://github.com/dominguesrenan)
[![LinkedIn](https://img.shields.io/badge/-Renan%20Domingues-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/renan-domingues-4808b2172/)](https://www.linkedin.com/in/renan-domingues-4808b2172/)
