# Variáveis
SERVICE_NAME := backend-nestjs

# Comandos
help:
	@echo "COMANDOS $(SERVICE_NAME)"
	@echo "> make start > Iniciar os containers"
	@echo "> make rebuild > Reconstruir e iniciar os containers"
	@echo "> make logs > Logs do container backend"
	@echo "> make logs-f > Logs em tempo real do container backend"
	@echo "> make down > Remover volumes do container"
	@echo "> make exec-back > Acessar o conteiner backend"
	@echo "> make exec-bd > Acessar o container PostgreSQL"
	@echo "> make backup-bd > Backup do banco de dados"	
	@echo "> make restore-bd > Restaurar backup do banco de dados"

# Execute o docker-compose
start:
	docker-compose up --build -d

# Rebuild
rebuild:
	docker-compose down -v
	docker-compose build --no-cache
	docker-compose up -d

# Logs
logs:
	docker-compose logs backend

# Logs em tempo real
logs-f:
	docker-compose logs -f backend

# Remover volumes do container
down:
	docker-compose down -v

# Acessar o conteiner backend
exec-back:
	docker-compose exec backend bash

# Acessar o container PostgreSQL
exec-bd:
	docker-compose exec postgres bash

# Backup do banco de dados
backup-bd:
	docker-compose exec postgres pg_dump -U nestjs_user -d nestjs_db > backup.sql

# Restaurar backup do banco de dados
restore-bd:
	docker-compose exec postgres psql -U nestjs_user -d nestjs_db < backup.sql