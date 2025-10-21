## Comandos do container

```bash
# Gerenciar containers do docker-compose
make start   # Iniciar os containers
make rebuild # Reconstruir e iniciar os containers
make logs    # Verificar Logs
make logs-f  # Verificar Logs em tempo real

# Acessar o conteiner
make exec-back       # Acessar o conteiner
npm install          # Instalar as dependências
npm run build        # Build
npm run format       # Formatar códigos com Prettier
npm run format:check # Verificar se códigos estão formatados

# Migrações e Seeds
npm run migration:run          # Executar migrações pendentes
npm run seed:run               # Executar seeds (dados iniciais)
npm run migration:revert       # Reverter última migração
npm run typeorm migration:show # Ver status das migrações

# Banco de dados PostgreSQL
make exec-bd                     # Acessar o container PostgreSQL
psql -U nestjs_user -d nestjs_db # Conectar ao banco de dados
make backup-bd                   # Backup do banco de dados
make restore-bd                  # Restaurar backup

# Verificar logs do PostgreSQL
docker-compose logs postgres
```

## Docker

Em caso de erros com algum conteiner ou conflito:

### Remover todos os conteiners:

```bash
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)
docker volume rm $(docker volume ls -q)
docker network prune -f
clear
```

### Parar os processos das portas:

```bash
# Porta 80 - Nginx
sudo lsof -ti :80 | xargs sudo kill

# Porta 3306 - MySQL
sudo lsof -ti :3306 | xargs sudo kill
```

---

## Desenvolvido por

[**Renan Domingues**](https://www.linkedin.com/in/renan-domingues-4808b2172/)  
👨‍💻 Desenvolvedor Full Stack

[![GitHub](https://img.shields.io/badge/-Renan%20Domingues-181717?style=flat-square&logo=github&logoColor=white&link=https://github.com/dominguesrenan)](https://github.com/dominguesrenan)
[![LinkedIn](https://img.shields.io/badge/-Renan%20Domingues-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/renan-domingues-4808b2172/)](https://www.linkedin.com/in/renan-domingues-4808b2172/)
