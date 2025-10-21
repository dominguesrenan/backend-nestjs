#!/bin/bash

# Teste do fluxo de autenticação e update
echo "=== TESTE DO FLUXO DE AUTENTICAÇÃO E UPDATE ==="
echo ""

# Registrar usuário administrador
REGISTER_ADMIN=$(curl --request POST \
  --url http://localhost:4000/api/auth/register \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "user@example.com",
	"password": "password",
	"name": "User Example"
}' 2>/dev/null)

echo "Resposta do registro de administrador:"
echo "$REGISTER_ADMIN"
echo ""

# 1. Login para obter o token
echo "1. Fazendo login..."
LOGIN_RESPONSE=$(curl --request POST \
  --url http://localhost:4000/api/auth/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "user@example.com",
	"password": "password"
}' 2>/dev/null)

echo "Resposta do login:"
echo "$LOGIN_RESPONSE"
echo ""

# 2. Extrair o token da resposta
TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo "❌ ERRO: Não foi possível obter o token de acesso"
    exit 1
fi

echo "✅ Token obtido: ${TOKEN:0:50}..."
echo ""

# 3. Testar o update com o token
echo "2. Testando update do usuário..."
UPDATE_RESPONSE=$(curl --request PUT \
  --url http://localhost:4000/api/users/5 \
  --header "Authorization: Bearer $TOKEN" \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "Novo Nome",
	"email": "novo@email.com",
	"role": "admin"
}' 2>/dev/null)

echo "Resposta do update:"
echo "$UPDATE_RESPONSE"
echo ""

# 4. Verificar se foi sucesso
if echo "$UPDATE_RESPONSE" | grep -q '"success":true'; then
    echo "✅ UPDATE REALIZADO COM SUCESSO!"
else
    echo "❌ ERRO NO UPDATE"
    echo ""
    echo "Logs recentes:"
    docker-compose logs backend --tail 20
fi
