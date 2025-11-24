from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # Importante!

from models import PolicyInput
from templates import generate_policy, generate_terms

app = FastAPI(
    title="Gerador de Política de Privacidade API",
    description="Uma API simples para gerar textos de Política e Termos."
)

origins = [
    "http://localhost:5173", 
    "http://localhost:3000", 
    "https://gerador-politica.vercel.app" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
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