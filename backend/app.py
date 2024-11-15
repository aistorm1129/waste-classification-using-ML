from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from classify_router import router as classify_router
from feedback_router import router as feedback_router

# Inicializa a aplicação FastAPI
app = FastAPI()

# Configura o middleware CORS para permitir que a API seja acessada por qualquer origem.
# O '*' no allow_origins permite acesso de qualquer domínio. Isso é útil durante o desenvolvimento
# quando o front-end e o back-end estão em diferentes servidores, mas deve ser ajustado para produção.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite qualquer origem (domínio)
    allow_credentials=True,  # Permite envio de cookies e autenticações
    allow_methods=["*"],  # Permite todos os métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos (ex: Authorization, Content-Type, etc.)
)

# Inclui as rotas de classificação (classify) na aplicação principal
app.include_router(classify_router)

# Inclui as rotas de feedback na aplicação principal
app.include_router(feedback_router)

# Executa a aplicação utilizando Uvicorn se este arquivo for executado diretamente
# O host "0.0.0.0" permite que a aplicação seja acessada externamente
# A porta 8000 é onde o app será servido
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
