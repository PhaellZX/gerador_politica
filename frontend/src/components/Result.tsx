// src/components/Result.tsx

// 1. Importações do Chakra (COM 'Text' e 'IconButton' REMOVIDOS)
import {
  Button,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Link,
  useToast, // 'Text' foi removido daqui
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Code,
  HStack, // 'IconButton' foi removido daqui
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';

// --- AQUI ESTÁ A CORREÇÃO PRINCIPAL ---
// Colando AMBAS as interfaces que este arquivo precisa

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

interface IPolicyOutput {
  policy: string;
  terms: string;
}
// ----------------------------------------

interface ResultProps {
  results: IPolicyOutput | null;
  reset: () => void;
  data: Partial<IPolicyInput>; // Agora 'IPolicyInput' é conhecido!
}

export const Result: React.FC<ResultProps> = ({ results, reset, data }) => {
  const toast = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Texto copiado!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  if (!results) {
    // ... (código de erro)
    return (
      <div>
        <h2>Erro</h2>
        <p>Nenhum resultado para exibir.</p>
        <button className="prev" onClick={reset}>Começar Novamente</button>
      </div>
    );
  }

  // --- (O restante do seu código JSX continua aqui, sem alterações) ---
  return (
    <VStack spacing={6} align="stretch">
      {/* --- Alerta de Afiliado Principal (Hostinger) --- */}
      <Alert
        status="success" // Corrigido para verde
        variant="solid"
        borderRadius="md"
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        p={6}
      >
        {/* ... (código do banner Hostinger) ... */}
        <HStack spacing={4} mb={{ base: 4, md: 0 }}>
          <AlertIcon boxSize="40px" />
          <Box>
            <AlertTitle fontSize="xl" fontWeight="bold">
              Parabéns pela sua Política! E agora?
            </AlertTitle>
            <AlertDescription>
              Garanta que seu site esteja em uma hospedagem rápida e segura.
            </AlertDescription>
          </Box>
        </HStack>
        <Button
          as={Link}
          href="#LINK-AFILIADO-HOSTINGER"
          isExternal
          colorScheme="green" // Combinando com o "success"
          variant="outline"
          bg="white"
          color="gray.800"
          _hover={{ bg: 'gray.100' }}
          size="lg"
          flexShrink={0}
        >
          Contrate Hostinger com 55% OFF
        </Button>
      </Alert>

      {/* --- ALERTA CONDICIONAL PARA E-COMMERCE (Nuvemshop) --- */}
      {results && data.collects_payment_data && (
        <Alert
          status="info"
          variant="subtle"
          borderRadius="md"
          mt={6}
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          p={6}
        >
          <HStack spacing={4} mb={{ base: 4, md: 0 }}>
            <AlertIcon boxSize="40px" />
            <Box>
              <AlertTitle fontSize="xl" fontWeight="bold">
                Você vende produtos online?
              </AlertTitle>
              <AlertDescription>
                Receba pagamentos de forma fácil e profissional. Crie sua loja
                virtual na Nuvemshop.
              </AlertDescription>
            </Box>
          </HStack>
          <Button
            as={Link}
            href="#LINK-AFILIADO-NUVEMSHOP"
            isExternal
            colorScheme="blue"
            variant="solid"
            size="lg"
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
          >
            Comece na Nuvemshop
          </Button>
        </Alert>
      )}
      {/* --- FIM DO ALERTA --- */}

      {/* Abas para Política e Termos */}
      <Tabs isFitted variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab _selected={{ color: 'blue.600', bg: 'blue.50' }}>
            <Heading size="md">Sua Política de Privacidade</Heading>
          </Tab>
          <Tab _selected={{ color: 'blue.600', bg: 'blue.50' }}>
            <Heading size="md">Seus Termos de Uso</Heading>
          </Tab>
        </TabList>

        <TabPanels bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="0 0 md md">
          <TabPanel>
            <HStack justify="flex-end" mb={4}>
              <Button
                leftIcon={<CopyIcon />}
                onClick={() => copyToClipboard(results!.policy)}
              >
                Copiar Política
              </Button>
            </HStack>
            <Code
              display="block"
              whiteSpace="pre-wrap"
              p={5}
              borderRadius="md"
              bg="gray.50"
              color="gray.800"
            >
              {results!.policy}
            </Code>
          </TabPanel>
          <TabPanel>
            <HStack justify="flex-end" mb={4}>
              <Button
                leftIcon={<CopyIcon />}
                onClick={() => copyToClipboard(results!.terms)}
              >
                Copiar Termos
              </Button>
            </HStack>
            <Code
              display="block"
              whiteSpace="pre-wrap"
              p={5}
              borderRadius="md"
              bg="gray.50"
              color="gray.800"
            >
              {results!.terms}
            </Code>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Button onClick={reset} size="lg" variant="outline">
        Gerar Novo
      </Button>
    </VStack>
  );
};