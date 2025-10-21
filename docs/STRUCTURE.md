# Estrutura do Projeto

## Backend (NestJS)

```
/backend-nestjs/
│   src/
│   ├── config/         # Configurações (app, database, mail e etc)
│   ├── core/           # Módulos de negócio
│   │   ├── app/        # Módulo principal da aplicação
│   │   ├── auth/       # Autenticação e autorização
│   │   ├── database/   # Scripts e configurações DB
│   │   ├── permissions/# Sistema de permissões RBAC
│   │   ├── segmentos/  # Módulo de segmentos
│   │   └── users/      # Gerenciamento de usuários
│   ├── database/       # Migrações e seeds
│   │   ├── migrations/ # Migrações do banco de dados
│   │   └── seeds/      # Dados iniciais
│   ├── shared/         # Recursos compartilhados
│   │   ├── constants/  # Constantes globais
│   │   ├── decorators/ # Decoradores personalizados
│   │   ├── filters/    # Filtros personalizados
│   │   ├── guards/     # Guards personalizados
│   │   ├── interceptors/# Interceptors personalizados
│   │   ├── pipes/      # Pipes personalizados
│   │   └── utils/      # Utilitários
├── docs/                   # Documentação completa
├── nginx/                  # Configuração proxy reverso
├── package.json            # Configuração do projeto
├── .env                    # Variáveis de ambiente
├── README.md               # Documentação do projeto
├── Makefile                # Makefile para comandos
└── docker-compose.yml      # Orquestração de containers
```

## Descrição das Pastas

- `src/`: Código fonte principal
  - `src/config/`: Configurações do projeto
    - `src/config/app.config.ts`: Configurações do projeto
    - `src/config/database.config.ts`: Configurações do banco de dados
    - `src/config/env.validation.ts`: Validação de variáveis de ambiente
    - `src/config/mail.config.ts`: Configurações de email
  - `src/core/`: Módulos do sistema
    - `src/core/app/`: Módulo principal da aplicação
    - `src/core/auth/`: Autenticação e autorização
    - `src/core/database/`: Scripts e configurações DB
    - `src/core/permissions/`: Sistema de permissões RBAC
    - `src/core/segmentos/`: Módulo de segmentos
    - `src/core/users/`: Gerenciamento de usuários
  - `src/database/`: Migrações e seeds
    - `src/database/migrations/`: Migrações da tabela
    - `src/database/seeds/`: Dados iniciais
    - `src/database/database.module.ts`: Configuração do banco de dados
  - `src/shared/`: Recursos compartilhados
    - `src/shared/constants/`: Constantes globais
    - `src/shared/decorators/`: Decoradores personalizados
    - `src/shared/filters/`: Filtros personalizados
    - `src/shared/guards/`: Guards personalizados
    - `src/shared/interceptors/`: Interceptors personalizados
    - `src/shared/pipes/`: Pipes personalizados
    - `src/shared/utils/`: Utilitários
- `docs/`: Documentação
- `nginx/`: Configuração proxy reverso
- `package.json`: Configuração do projeto
- `.env`: Variáveis de ambiente
- `README.md`: Documentação do projeto
- `Makefile`: Makefile para comandos
- `docker-compose.yml`: Orquestração de containers

## Arquivos de Configuração e Outros

- `.env`: Variáveis de ambiente
- `Makefile`: Makefile para comandos
- `docker-compose.yml`: Orquestração de containers
- `README.md`: Documentação do projeto

---

## Desenvolvido por

[**Renan Domingues**](https://www.linkedin.com/in/renan-domingues-4808b2172/)  
👨‍💻 Desenvolvedor Full Stack

[![GitHub](https://img.shields.io/badge/-Renan%20Domingues-181717?style=flat-square&logo=github&logoColor=white&link=https://github.com/dominguesrenan)](https://github.com/dominguesrenan)
[![LinkedIn](https://img.shields.io/badge/-Renan%20Domingues-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/renan-domingues-4808b2172/)](https://www.linkedin.com/in/renan-domingues-4808b2172/)
