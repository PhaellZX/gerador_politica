import { useState } from 'react';
import { Step1 } from './components/Step1';
import { Step2 } from './components/Step2';
import { Result } from './components/Result';

// Importações do Chakra UI
import { Container, Box, Heading, Text, VStack } from '@chakra-ui/react';

export interface IPolicyInput {
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
export interface IPolicyOutput {
  policy: string;
  terms: string;
}

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<IPolicyInput>({
    site_name: '',
    site_url: 'https://',
    company_name: '',
    contact_email: '',
    
    dpo_name: '',
    dpo_email: '',

    collects_personal_data: true,
    collects_payment_data: false,
    uses_cookies: true,
    uses_analytics: false,
    shares_with_partners: false,
    sells_data: false,
    has_user_accounts: false,
  });

  const [results, setResults] = useState<IPolicyOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateData = (data: Partial<IPolicyInput>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  
  const reset = () => {
    setStep(1);
    setResults(null);
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://gerador-politica-api.onrender.com/generate/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const errData = await response.json();
          const firstError = errData.detail[0].msg;
          throw new Error(`Dados inválidos: ${firstError}`);
        }
        throw new Error(`Erro na API: ${response.statusText}`);
      }
      const data: IPolicyOutput = await response.json();
      setResults(data);
      nextStep();
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 data={formData} updateData={updateData} nextStep={nextStep} />;
      case 2:
        return (
          <Step2
            data={formData}
            updateData={updateData}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
          />
        );
      case 3:
        return <Result results={results} reset={reset} data={formData} />;
      default:
        return <div>Passo inválido</div>;
    }
  };

  return (
    <Container maxW="container.lg" centerContent py={{ base: 8, md: 12 }}>
      <Box
        bg="white"
        w="100%"
        maxW={{ base: '100%', md: '800px' }}
        p={{ base: 6, md: 10 }}
        borderRadius="xl"
        boxShadow="lg"
      >
        <VStack spacing={2} mb={8}>
          <Heading as="h1" size="xl" textAlign="center">
            Gerador de Política de Privacidade
          </Heading>
          <Text fontSize="lg" color="gray.600" textAlign="center" mt={0}>
            Baseado no modelo da LGPD (gov.br)
          </Text>
        </VStack>

        {renderStep()}
      </Box>
    </Container>
  );
}

export default App;