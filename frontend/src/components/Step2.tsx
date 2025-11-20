import {
  Button,
  Checkbox,
  VStack,
  Heading,
  HStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Link,
  useToast,
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
  prevStep: () => void;
  handleSubmit: () => void;
  isLoading: boolean;
  error: string | null;
}

export const Step2: React.FC<StepProps> = ({
  data,
  updateData,
  prevStep,
  handleSubmit,
  isLoading,
  error,
}) => {
  const toast = useToast();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ [e.target.name]: e.target.checked });
  };

  if (error) {
    toast({
      title: 'Erro ao gerar política.',
      description: error,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <VStack spacing={6} align="stretch">
      <Heading as="h2" size="lg" fontWeight="semibold">
        Passo 2: Configurações de Coleta de Dados
      </Heading>

      <VStack spacing={4} align="stretch" p={5} borderWidth="1px" borderRadius="md">
        <Checkbox
          name="collects_personal_data"
          isChecked={data.collects_personal_data}
          onChange={handleCheckboxChange}
          size="lg"
        >
          Coleta dados pessoais (ex: nome, e-mail, telefone)?
        </Checkbox>
        
        <Checkbox
          name="collects_payment_data"
          isChecked={data.collects_payment_data}
          onChange={handleCheckboxChange}
          size="lg"
        >
          Coleta dados de pagamento (ex: cartão de crédito)?
        </Checkbox>
        
        <Checkbox
          name="uses_cookies"
          isChecked={data.uses_cookies}
          onChange={handleCheckboxChange}
          size="lg"
        >
          Seu site usa cookies?
        </Checkbox>

        <Checkbox
          name="uses_analytics"
          isChecked={data.uses_analytics}
          onChange={handleCheckboxChange}
          size="lg"
        >
          Usa ferramentas de Analytics (ex: Google Analytics)?
        </Checkbox>
        
        <Checkbox
          name="shares_with_partners"
          isChecked={data.shares_with_partners}
          onChange={handleCheckboxChange}
          size="lg"
        >
          Compartilha dados com parceiros (ex: Google, Facebook)?
        </Checkbox>

        <Checkbox
          name="has_user_accounts"
          isChecked={data.has_user_accounts}
          onChange={handleCheckboxChange}
          size="lg"
        >
          Seu site permite que usuários criem contas (login/senha)?
        </Checkbox>
        
        <Checkbox
          name="sells_data"
          isChecked={data.sells_data}
          onChange={handleCheckboxChange}
          size="lg"
          colorScheme="red"
        >
          Você VENDE dados pessoais para terceiros?
        </Checkbox>
      </VStack>

      {data.uses_analytics && (
        <Alert 
          status="warning" 
          variant="left-accent" 
          borderRadius="md"
          mt={2}
        >
          <AlertIcon />
          <Box>
            <AlertTitle fontSize="sm" mb={1}>
              O Google Analytics 4 pode ser bem complicado...
            </AlertTitle>
            <AlertDescription fontSize="sm">
              Muitos sites perdem dados por configuração errada.
              <Link 
                href="https://go.hotmart.com/E103039216D?dp=1" 
                color="orange.600" 
                fontWeight="bold"  
                textDecoration="underline"
                isExternal 
                ml={1}
              >
                Clique aqui e aprenda o passo a passo para configurar do jeito certo.
              </Link>
            </AlertDescription>
          </Box>
        </Alert>
      )}

      <HStack justify="space-between" mt={4}>
        <Button size="lg" variant="ghost" onClick={prevStep}>
          Anterior
        </Button>
        <Button
          colorScheme="green"
          size="lg"
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          Gerar Política
        </Button>
      </HStack>
    </VStack>
  );
};