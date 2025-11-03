# /backend/templates.py

from models import PolicyInput
from datetime import date

# Função auxiliar para gerar a data de hoje
def get_today_date():
    return date.today().strftime("%d de %B de %Y")

# --- FUNÇÃO PRINCIPAL DA POLÍTICA (REESCRITA) ---

def generate_policy(data: PolicyInput) -> str:
    """
    Gera o texto da Política de Privacidade e Proteção de Dados
    baseado na estrutura da LGPD e no modelo gov.br.
    """
    
    today = get_today_date()
    company_display = data.company_name if data.company_name else data.site_name
    
    # Começamos a construir o documento
    policy = f"# Política de Privacidade e Proteção de Dados\n\n"
    policy += f"**Controlador dos Dados:** {company_display}\n"
    policy += f"**Site:** {data.site_url}\n"
    policy += f"**Última atualização:** {today}\n\n"
    
    policy += "## 1. Introdução\n\n"
    policy += (
        f"Bem-vindo(a) ao {data.site_name}. Nós levamos a sério a sua privacidade e a proteção dos seus dados pessoais. "
        f"Esta Política de Privacidade e Proteção de Dados ('Política') descreve como nós, {company_display}, "
        f"coletamos, usamos, armazenamos e compartilhamos seus dados pessoais, em conformidade com a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados - LGPD).\n\n"
    )

    policy += "## 2. O Encarregado de Dados (DPO)\n\n"
    policy += (
        f"O Encarregado pela Proteção de Dados Pessoais (DPO) é o responsável por supervisionar todas as questões relacionadas a esta Política. "
        f"Se você tiver dúvidas, solicitações ou reclamações sobre suas informações pessoais, entre em contato com nosso DPO:\n\n"
        f"* **Nome do Encarregado:** {data.dpo_name}\n"
        f"* **E-mail do Encarregado:** {data.dpo_email}\n\n"
    )

    policy += "## 3. Dados que Coletamos e Finalidade\n\n"
    policy += "Coletamos seus dados pessoais para fornecer e melhorar nossos serviços. Os tipos de dados que podemos coletar incluem:\n\n"

    if data.has_user_accounts:
        policy += "* **Dados de Conta:** Quando você cria uma conta, podemos coletar seu nome, e-mail e senha.\n"
    
    if data.collects_personal_data:
        policy += "* **Dados de Contato:** Informações que você fornece ao preencher formulários, como nome, e-mail e telefone.\n"

    if data.collects_payment_data:
        policy += "* **Dados de Pagamento:** Informações necessárias para processar pagamentos, como dados do cartão de crédito (processados por um parceiro seguro) e endereço de faturamento.\n"
    
    if data.uses_cookies or data.uses_analytics:
        policy += "* **Dados de Navegação (Cookies):** Informações sobre como você usa nosso site, seu endereço IP, tipo de navegador e páginas visitadas. Usamos isso para melhorar sua experiência.\n\n"
    
    policy += "## 4. Compartilhamento de Dados Pessoais\n\n"
    policy += "Nós não vendemos seus dados pessoais a terceiros.\n\n"

    if data.shares_with_partners:
        policy += (
            "Podemos compartilhar seus dados com prestadores de serviços e parceiros que nos ajudam a operar nosso negócio (ex: processadores de pagamento, "
            "ferramentas de análise de dados como Google Analytics, serviços de hospedagem).\n\n"
        )
    else:
        policy += "Não compartilhamos seus dados com parceiros de publicidade ou análise, exceto quando estritamente necessário para o funcionamento do site.\n\n"
        
    policy += "Poderemos também compartilhar dados se formos obrigados por lei ou para proteger nossos direitos legais.\n\n"

    policy += "## 5. Seus Direitos como Titular dos Dados (LGPD)\n\n"
    policy += "De acordo com a LGPD, você tem o direito de:\n"
    policy += "* **Confirmar** a existência de tratamento de seus dados;\n"
    policy += "* **Acessar** seus dados;\n"
    policy += "* **Corrigir** dados incompletos, inexatos ou desatualizados;\n"
    policy += "* **Solicitar a anonimização, bloqueio ou eliminação** de dados desnecessários;\n"
    policy += "* **Solicitar a portabilidade** dos seus dados a outro fornecedor;\n"
    policy += "* **Solicitar a eliminação** dos dados tratados com seu consentimento;\n"
    policy += "* **Obter informação** sobre as entidades com as quais compartilhamos seus dados;\n"
    policy += "* **Revogar o consentimento.**\n\n"
    policy += f"Para exercer seus direitos, entre em contato com nosso Encarregado de Dados (DPO) através do e-mail: {data.dpo_email}.\n\n"

    policy += "## 6. Alterações nesta Política\n\n"
    policy += f"Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente será sempre publicada em nosso site, com a data da última atualização.\n\n"
    policy += f"**{company_display}**\n"
    
    return policy

# --- FUNÇÃO DE TERMOS DE USO (Pode manter a simples) ---

def generate_terms(data: PolicyInput) -> str:
    """Gera o texto dos Termos de Uso."""
    
    terms = f"# Termos de Uso do site {data.site_name}\n\n"
    
    if data.has_user_accounts:
        terms += "## 1. Contas de Usuário\n"
        terms += "- Ao criar uma conta, você é responsável por manter a confidencialidade da sua senha.\n"
    
    terms += "## 2. Propriedade Intelectual\n"
    terms += "- Todo o conteúdo deste site é de nossa propriedade.\n\n"
    
    terms += "## 3. Limitação de Responsabilidade\n"
    terms += "- O uso deste site é por sua conta e risco. O conteúdo é fornecido 'como está'.\n"

    return terms