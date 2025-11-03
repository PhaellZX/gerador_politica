from pydantic import BaseModel, HttpUrl, EmailStr
from typing import Optional

class PolicyInput(BaseModel):
    """
    Modelo de dados ATUALIZADO para ser compatível com a LGPD
    e o modelo do gov.br
    """
    
    # --- Passo 1: Informações do Site ---
    site_name: str
    site_url: HttpUrl
    company_name: Optional[str] = None # Ex: "Minha Empresa LTDA"
    contact_email: EmailStr # Email geral de contato

    # --- Passo 2: Informações da LGPD (Novos Campos) ---
    dpo_name: str           # Nome do Encarregado (DPO)
    dpo_email: EmailStr     # Email do Encarregado (para reclamações da LGPD)
    
    # --- Passo 3: Configurações de Coleta (Campos Antigos + Novos) ---
    collects_personal_data: bool = True # Se coleta dados pessoais (nome, email, doc, etc.)
    collects_payment_data: bool = False # Se coleta dados de pagamento (cartão)
    
    uses_cookies: bool = True
    uses_analytics: bool = False
    
    # Novo campo para detalhar o compartilhamento
    shares_with_partners: bool = False # Se compartilha com parceiros (Google, Facebook, etc.)
    
    # Campo antigo renomeado para clareza
    sells_data: bool = False # Se VENDE dados

    # Campo antigo
    has_user_accounts: bool = False