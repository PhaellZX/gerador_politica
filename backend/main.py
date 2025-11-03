from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # Importante!

from models import PolicyInput
from templates import generate_policy, generate_terms

app = FastAPI(
    title="Gerador de Política de Privacidade API",
    description="Uma API simples para gerar textos de Política e Termos."
)

origins = [
    "http://localhost:5173", # Endereço do seu app React (Vite)
    "http://localhost:3000", # Endereço comum de app React (CRA)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Permite todos os métodos (GET, POST, etc)
    allow_headers=["*"], # Permite todos os cabeçalhos
)

# --- Endpoints ---

@app.get("/")
async def root():
    return {"message": "API do Gerador de Política no ar!"}


@app.post("/generate/")
async def handle_generate_policy(data: PolicyInput):
    """
    Recebe os dados do formulário, gera os textos
    e os devolve em um JSON.
    """
    
    policy_text = generate_policy(data)
    terms_text = generate_terms(data)
    
    return {
        "policy": policy_text,
        "terms": terms_text
    }