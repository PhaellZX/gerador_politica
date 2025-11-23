import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  FormHelperText,
  Divider,
} from '@chakra-ui/react';

interface IPolicyInput {
  site_name: string;
  site_url: string;
  company_name?: string;
  contact_email: string;
  dpo_name: string;
  dpo_email: string;
  collects_personal_data: boolean;
  collects_payment_data: boolean;
  uses_cookies: boolean;
  uses_analytics: boolean;
  shares_with_partners: boolean;
  sells_data: boolean;
  has_user_accounts: boolean;
}

interface StepProps {
  data: Partial<IPolicyInput>;
  updateData: (data: Partial<IPolicyInput>) => void;
  nextStep: () => void;
}

export const Step1: React.FC<StepProps> = ({ data, updateData, nextStep }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ [e.target.name]: e.target.value });
  };

  const isButtonDisabled =
    !data.site_name ||
    !data.site_url ||
    !data.contact_email ||
    !data.dpo_name ||
    !data.dpo_email;

  return (
    <VStack spacing={6} align="stretch">
      <Heading as="h2" size="lg" fontWeight="semibold" textAlign="center">
        Passo 1: Informações da Empresa e LGPD
      </Heading>

      {/* --- Seção de Informações do Site --- */}
      <FormControl isRequired>
        <FormLabel htmlFor="site_name">Nome do Site</FormLabel>
        <Input
          id="site_name"
          name="site_name"
          value={data.site_name}
          onChange={handleChange}
          placeholder="Ex: Minha Loja Online"
          size="lg"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="site_url">URL do Site</FormLabel>
        <Input
          type="url"
          id="site_url"
          name="site_url"
          value={data.site_url}
          onChange={handleChange}
          placeholder="https://seusite.com"
          size="lg"
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="company_name">Nome da Empresa (Opcional)</FormLabel>
        <Input
          id="company_name"
          name="company_name"
          value={data.company_name}
          onChange={handleChange}
          placeholder="Ex: Minha Empresa LTDA"
          size="lg"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="contact_email">E-mail de Contato (Geral)</FormLabel>
        <Input
          type="email"
          id="contact_email"
          name="contact_email"
          value={data.contact_email}
          onChange={handleChange}
          placeholder="Ex: contato@seusite.com"
          size="lg"
        />
      </FormControl>

      <Divider my={4} />

      <Heading as="h3" size="md" fontWeight="semibold" color="blue.600" textAlign="center">
        Informações da LGPD (Encarregado de Dados)
      </Heading>
      
      <FormControl isRequired>
        <FormLabel htmlFor="dpo_name">Nome do Encarregado (DPO)</FormLabel>
        <Input
          id="dpo_name"
          name="dpo_name"
          value={data.dpo_name}
          onChange={handleChange}
          placeholder="Nome do responsável pelos dados"
          size="lg"
        />
        <FormHelperText textAlign="center">
          Pela LGPD, esta é a pessoa responsável por responder sobre os dados
          dos usuários.
        </FormHelperText>
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="dpo_email">E-mail do Encarregado (DPO)</FormLabel>
        <Input
          type="email"
          id="dpo_email"
          name="dpo_email"
          value={data.dpo_email}
          onChange={handleChange}
          placeholder="Ex: lgpd@seusite.com (ou seu email principal)"
          size="lg"
        />
        <FormHelperText textAlign="center">
          Este e-mail será público na política para os usuários entrarem em
          contato.
        </FormHelperText>
      </FormControl>

      <Button
        colorScheme="blue"
        size="lg"
        onClick={nextStep}
        isDisabled={isButtonDisabled}
      >
        Próximo
      </Button>
    </VStack>
  );
};